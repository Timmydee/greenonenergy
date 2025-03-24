"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Home, Package, User, LogOut } from "lucide-react";
import Sidebar from "@/components/VendorDashboard/SideBar";

const sidebarLinks = [
  { name: "Dashboard", icon: Home, path: "/dashboard/vendor" },
  { name: "Products", icon: Package, path: "/dashboard/vendor/products" },
  { name: "Profile", icon: User, path: "/dashboard/vendor/profile" },
];

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <div className="overflow-none fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
    </div>
  );
}
