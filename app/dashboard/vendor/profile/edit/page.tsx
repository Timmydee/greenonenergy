"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

// Zod Schema for validation
const profileSchema = z.object({
    companyName: z.string().min(3, "Company name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    whatsapp: z.string(),
    website: z.string().url("Invalid website URL").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Define the mutation function with error handling
const updateProfile = async (profileData: ProfileFormData): Promise<ProfileFormData> => {
    try {
        const { data } = await axios.patch<ProfileFormData>('/api/vendor/updateprofile', profileData);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to update profile");
        }
        throw new Error("An unexpected error occurred");
    }
};

const ProfileEditForm = () => {
    const router = useRouter();
    const [initialData, setInitialData] = useState<ProfileFormData | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    // Fetch vendor profile with error handling
    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await fetch("/api/vendor/me");
                if (!response.ok) {
                    throw new Error("Failed to fetch profile data");
                }
                const data = await response.json();
                setInitialData(data.vendor);
            } catch (error) {
                setFetchError(error instanceof Error ? error.message : "An error occurred while fetching data");
            }
        };
        fetchVendorData();
    }, []);

    // Use the correct mutation hook with proper generics and error handling
    const { mutate, isError, isSuccess, isPending: isMutating, error: mutationError } = useMutation<ProfileFormData, Error, ProfileFormData>({
        mutationFn: updateProfile,
        onSuccess: () => {
            router.push('/dashboard/vendor/profile');
        },
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    // Reset form when initialData is loaded
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmit = (data: ProfileFormData) => {
        mutate(data);
    };

    if (fetchError) {
        return <div className="text-red-500">Error: {fetchError}</div>;
    }

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Company Name */}
                <div className="mb-4">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                        id="companyName"
                        {...register("companyName")}
                        placeholder="Enter company name"
                        aria-invalid={errors.companyName ? "true" : "false"}
                    />
                    {errors.companyName && (
                        <p className="text-red-500" role="alert" aria-live="polite">
                            {errors.companyName.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter email"
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                        <p className="text-red-500" role="alert" aria-live="polite">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="Enter phone number"
                        aria-invalid={errors.phone ? "true" : "false"}
                    />
                    {errors.phone && (
                        <p className="text-red-500" role="alert" aria-live="polite">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                {/* WhatsApp */}
                <div className="mb-4">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                        id="whatsapp"
                        {...register("whatsapp")}
                        placeholder="Enter WhatsApp number"
                        aria-invalid={errors.whatsapp ? "true" : "false"}
                    />
                    {errors.whatsapp && (
                        <p className="text-red-500" role="alert" aria-live="polite">
                            {errors.whatsapp.message}
                        </p>
                    )}
                </div>

                {/* Website */}
                <div className="mb-4">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        {...register("website")}
                        placeholder="Enter website URL"
                        aria-invalid={errors.website ? "true" : "false"}
                    />
                    {errors.website && (
                        <p className="text-red-500" role="alert" aria-live="polite">
                            {errors.website.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={isMutating}>
                    {isMutating ? 'Updating...' : 'Update Profile'}
                </Button>
            </form>

            {/* Mutation Error */}
            {isError && (
                <p className="text-red-500" role="alert" aria-live="polite">
                    {mutationError?.message || "There was an error updating your profile."}
                </p>
            )}

            {/* Success Message */}
            {isSuccess && (
                <p className="text-green-500" role="alert" aria-live="polite">
                    Profile updated successfully!
                </p>
            )}
        </div>
    );
};

export default ProfileEditForm;