import type { Metadata } from "next";
import { Geist, Gelasio, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/global/Navbar";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import from React Query
import QueryClientWrapper from "@/lib/queryClient/QueryClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const gelasio = Gelasio({
  variable: "--font-gelasio",
  subsets: ['latin']
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Green On Energy",
  description: "Solar Inverter Estimator",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gelasio.variable} ${geistSans.variable} ${inter.variable} antialiased`}
      >
        {/* <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
        </QueryClientProvider> */}
        <QueryClientWrapper>
          {children}
        </QueryClientWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
