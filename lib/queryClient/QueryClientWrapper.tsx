"use client"; // This marks the component as a Client Component

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from "@/global/Navbar";

const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient()); // Initialize QueryClient on the client

  if (!queryClient) return null; // Make sure QueryClient is initialized before rendering

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {children}
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
};

export default QueryClientWrapper;
