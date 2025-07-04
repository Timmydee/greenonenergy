"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Package, User, LogOut } from "lucide-react";
import Sidebar from "@/components/VendorDashboard/SideBar";
import AdminSidebar from "@/components/AdminDashboard/AdminSideBar";

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
  // const [active, setActive] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const router = useRouter();

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <div className="overflow-none fixed">
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-6 bg-gray-100 min-h-screen ${isCollapsed ? "ml-16" : "ml-64"}`}>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
    </div>
  );
}
