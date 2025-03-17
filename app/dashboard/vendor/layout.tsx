'use client'

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

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-semibold text-center">Vendor Panel</h2>
        <nav>
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.name}>
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md cursor-pointer transition",
                  active === link.name ? "bg-gray-700" : "hover:bg-gray-800"
                )}
                onClick={() => setActive(link.name)}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </div>
            </Link>
          ))}
        </nav>
        <Button
          variant="destructive"
          className="w-full flex items-center gap-2 mt-6"
          onClick={() => router.push("/logout")}
        >
          <LogOut className="w-5 h-5" /> Logout
        </Button>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
    </div>
  );
}