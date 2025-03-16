"use client";
import { Suspense, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";	

function VerifyEmailPageForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/auth/verifyemail?token=${token}`);
        toast.success("Email verified successfully!");
        setTimeout(() => router.push("/auth/login"), 2000);
      } catch (error) {
        toast.error("Invalid or expired token.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  return (
    <div className="max-w-md mx-auto p-4">
      {loading ? (
        <p>Verifying email...</p>
      ) : (
        <p className="text-green-600">Email verified! Redirecting to login...</p>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmailPageForm />
    </Suspense>
  )
}


// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useEffect } from "react";
// import { toast } from "sonner";

// export default function VerifyEmail() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");

//   const mutation = useMutation({
//     mutationFn: async () => {
//       await axios.post("/api/auth/verify-email", { token });
//     },
//     onSuccess: () => {
//       toast.success("Email verified successfully!");
//       setTimeout(() => {
//         router.push("/login");
//       }, 2000);
//     },
//     onError: () => {
//       toast.error("Invalid or expired token.");
//     },
//   });

//   useEffect(() => {
//     if (token) {
//       mutation.mutate();
//     }
//   }, [token]);

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-xl font-semibold mb-4">Verifying Email...</h2>
//     </div>
//   );
// }
