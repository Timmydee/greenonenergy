// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { JWT } from "next-auth/jwt";
// import { Session } from "next-auth";
// import { connectToDatabase } from "@/lib/dbConnect";
// import User from "@/models/User";

// // Extend the default Session type
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role: "admin" | "vendor" | "client";
//     };
//   }
// }

// // Extend the default JWT type
// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: "admin" | "vendor" | "client";
//   }
// }

// const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile }: { account: any; profile?: any }) {
//       if (account?.provider === "google" && profile?.email) {
//         await connectToDatabase();
//         let user = await User.findOne({ email: profile.email });

//         if (!user) {
//           user = new User({
//             name: profile.name,
//             email: profile.email,
//             isVerified: true,
//             role: "client",
//             provider: "google",
//           });
//           await user.save();
//         }
//         profile.role = user.role;
//       }
//       return true;
//     },
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (session?.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Redirect to the callbackUrl if it exists, otherwise redirect to /dashboard/client
//       return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard/client`;
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { connectToDatabase } from "@/lib/dbConnect";
import UserModel from "@/models/User";

// Extend the default Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "admin" | "vendor" | "client";
    };
  }
}

// Extend the default JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "vendor" | "client";
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: { account: any; profile?: any }) {
      if (account?.provider === "google" && profile?.email) {
        await connectToDatabase();
        let user = await UserModel.findOne({ email: profile.email });

        if (!user) {
          user = new UserModel({
            name: profile.name,
            email: profile.email,
            isVerified: true,
            role: "client",
            provider: "google",
          });
          await user.save();
        }

        // Add role to the profile object
        profile.role = user.role;
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the callbackUrl if it exists, otherwise redirect to /dashboard/client
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard/client`;
    },
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };