'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";

// Validation schema
const authSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().optional(),
});

type AuthFormType = z.infer<typeof authSchema>;

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({ resolver: zodResolver(authSchema) });

  const mutation = useMutation({
    mutationFn: async (data: AuthFormType) => {
      const endpoint = type === "register" ? "/api/vendor/register" : "/api/vendor/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to authenticate");
      return res.json();
    },
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      setErrorMessage(error.message || "Something went wrong");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] p-4 shadow-lg">
        <CardHeader>
          <CardTitle>{type === "login" ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
            {type === "register" && (
              <div className="mb-4">
                <label>Company Name</label>
                <Input placeholder="Company Name" {...register("companyName")} />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
              </div>
            )}
            <div className="mb-4">
              <label>Email</label>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label>Password</label>
              <Input type="password" placeholder="Password" {...register("password")} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Processing..." : type === "login" ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
