"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Analytics } from '@vercel/analytics/next';
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import Navbar from "@/global/Navbar";
import { Toaster } from "react-hot-toast";
import SupportUsButton from "@/components/SupportUsButton/page";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient()); // Initialize QueryClient on the client

  if (!queryClient) return null; // Make sure QueryClient is initialized before rendering

  return (
    <>
      <Toaster position="top-right" />
      <QueryClientProvider client={queryClient}>
        {/* <Navbar /> */}
        {children}
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </QueryClientProvider>
      <SupportUsButton />
    </>
  );
};

export default AppWrapper;
