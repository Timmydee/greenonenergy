"use client";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LogoHeader from "@/global/LogoHeader";
import GoogleLogin from "@/components/Auth/GoogleLogin";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { fetchSession } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await axios.post("/api/auth/login", data, {
        withCredentials: true,
      });
    },

    onSuccess: async (response) => {
      toast.success(response?.data?.message || "Login was successful");

      const user = await fetchSession();

      if (user?.role === "vendor") {
        router.push("/dashboard/vendor");
      } else if (user?.role === "admin") {
        router.push("/dashboard/admin");
      } else if (user?.role === "client") {
        router.push("/dashboard/client");
      } else {
        router.push("/auth");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login Failed");
    },
  });

  // if (loading) {
  //   return <p>Loading...</p>; // Prevent showing login if already authenticated
  // }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <LogoHeader />
      <Card className="w-[400px] shadow-lg mt-4">
        <CardHeader className="justify-self-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging In" : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4">
        <GoogleLogin />
      </div>
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <a className="text-blue-500" href="/auth/registervendor">
            Register as a vendor
          </a>
        </p>
        <p>
          Forgot your password?{" "}
          <a className="text-blue-500" href="/auth/forgotpassword">
            Reset Password
          </a>
        </p>
        {/* <p>Don't have an account? <a href='/auth/register'>Register as a user</a></p> */}
      </div>
    </div>
  );
};

export default LoginPage;
