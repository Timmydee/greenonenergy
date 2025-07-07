"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/VendorDashboard/SideBar";

// Removed unused sidebarLinks

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [active, setActive] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Removed unused router

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <div className="overflow-none fixed">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
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
