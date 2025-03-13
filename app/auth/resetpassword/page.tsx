"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import toast from "react-hot-toast";
import LogoHeader from "@/global/LogoHeader";

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: { password: string }) => {
      const response = await axios.post("/api/auth/resetpassword", {
        token,
        newPassword: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successful! Please log in.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return (
    <div className="mt-20">
      <div className="flex items-center justify-center mb-10">
        <LogoHeader />
      </div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <Input
            type="password"
            placeholder="Enter new password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Updating..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
