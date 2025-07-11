"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

const registerSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const mutation = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            return await axios.post("/api/vendor/register", data);
        },
        onSuccess: () => {
            toast.success("Registration successful! Await admin approval.");
            router.push("/auth/login");
        },
        onError: () => {
            toast.error("Registration failed. Try again.");
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                        <div className="mb-4">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" {...register("companyName")} />
                            {errors.companyName && (
                                <p className="text-red-500 text-sm">{errors.companyName.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}