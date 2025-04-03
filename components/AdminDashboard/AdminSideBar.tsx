"use client";

import { Menu, X, Home, Package, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LogoutButton from "../Auth/LogoutButton";

const AdminSidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 p-4`}
    >
      <Button
        variant="ghost"
        className="mb-4 flex items-center text-white"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu size={20} /> : <X size={24} />}
      </Button>

      <nav className="flex flex-col gap-4">
        {/* <Link href="/dashboard/vendor" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
                    <Home size={20} /> {!isCollapsed && 'Dashboard'}
                </Link> */}
        <Link
          href="/dashboard/admin/products"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <Package size={20} /> {!isCollapsed && "Products"}
        </Link>
        {/* <Link
          href="/dashboard/admin/profile"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <User size={20} /> {!isCollapsed && "Profile"}
        </Link> */}
      </nav>

      <LogoutButton isCollapsed={isCollapsed} />
      {/* <Button
                variant="destructive"
                className="w-full flex items-center gap-2 mt-6"
                onClick={() => router.push("/logout")}
            >
                <LogOut className="w-5 h-5" /> {!isCollapsed && 'Logout'}
            </Button> */}
    </div>
  );
};

export default AdminSidebar;
