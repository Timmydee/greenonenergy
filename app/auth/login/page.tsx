'use client'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: async (data: LoginFormData) => {
            return await axios.post("/api/auth/login", data, { withCredentials: true });
        },
        
        onSuccess: () => {
            toast.success("Login was successful")
            router.push("/vendordashboard")
        },
        onError: (error) => {
            toast.error('Login Failed')
        }
    })
    return (
        <div className='flex min-h-screen justify-center items-center'>
            <Card className='w-[400px] shadow-lg'>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
                        <div className='mb-4'>
                            <Label htmlFor="email">Email</Label>
                            <Input id='email' type="email" {...register("email")} />
                            {errors.email && (
                                <p className='text-red-500'>{errors.email.message}</p>
                            )}
                        </div>

                        <div className='mb-4'>
                            <Label htmlFor='password'>Password</Label>
                            <Input id='password' type='password' {...register("password")} />
                            {errors.password && (
                                <p className='text-red-500'>{errors.password.message}</p>
                            )}
                        </div>

                        <Button type='submit' className='w-full' disabled={loginMutation.isPending}>
                            {loginMutation.isPending ? "Logging In" : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage