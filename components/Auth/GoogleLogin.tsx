"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/dashboard/client" })} className="flex gap-2 items-center">
      <FcGoogle className="text-lg" />
      Sign in with Google
    </Button>
  );
}
