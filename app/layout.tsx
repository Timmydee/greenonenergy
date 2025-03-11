import type { Metadata } from "next";
import { Geist, Gelasio, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import QueryClientWrapper from "@/lib/AppWrapper/AppWrapper";
import AppWrapper from "@/lib/AppWrapper/AppWrapper";

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
        <AppWrapper>
          {children}
        </AppWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
