"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Zod schema for form validation
const ProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().nonempty("Description is required"),
  // price: z
  //   .string()
  //   .nonempty("Price is required")
  //   .transform((val) => Number(val)),
  price: z.number(),
  category: z.enum(["Inverter", "Solar Panel"]),
  capacity: z.string().optional(),
  wattage: z.string().optional(),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(3, "At most 3 images allowed"),
  companyInfo: z.object({
    companyName: z.string().nonempty("Company name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().nonempty("Phone number is required"),
    website: z.string().optional(),
  }),
});

type ProductFormType = z.infer<typeof ProductSchema>;

interface EditProductProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    capacity: string;
    wattage: string;
    imageUrls: string[];
    companyInfo: {
      companyName: string;
      email: string;
      phone: string;
      website?: string;
    };
  };
  onClose: () => void;
}

export default function AdminEditProduct({
  product,
  onClose,
}: EditProductProps) {
  const [category, setCategory] = useState<"Inverter" | "Solar Panel">(
    "Inverter"
  );

  const [previewImages, setPreviewImages] = useState<string[]>(
    product.imageUrls
  );
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category as "Inverter" | "Solar Panel",
      capacity: product.capacity,
      wattage: product.wattage,
      images: product.imageUrls,
    },
  });

  useEffect(() => {
    setValue("category", category);
  }, [category, setValue]);

  // Handle image selection and preview
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const base64Images: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          base64Images.push(reader.result as string);
          if (base64Images.length === files.length) {
            setValue("images", [...product.imageUrls, ...base64Images]);
            setPreviewImages([...product.imageUrls, ...base64Images]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Mutation to upload images to Cloudinary (or your backend)
  const uploadImagesMutation = useMutation({
    mutationFn: async (images: string[]) => {
      const { data } = await axios.post("/api/uploadimage", { images });
      return data.imageUrls;
    },
    onSuccess: (imageUrls) => {
      setValue("images", imageUrls);
      toast.success("Images uploaded successfully!");
    },
    onError: () => {
      toast.error("Failed to upload images.");
    },
  });

  const onSubmit = async (data: ProductFormType) => {
    try {
      const { data: uploadResponse } = await axios.post("/api/uploadimage", {
        images: data.images,
      });

      const imageUrls = uploadResponse.imageUrls;

      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        capacity: data.category === "Inverter" ? data.capacity : undefined,
        wattage: data.category === "Solar Panel" ? data.wattage : undefined,
        imageUrls,
      };

      await axios.patch(`/api/admin/product/${product._id}`, productData);

      toast.success("Product updated successfully!");

      onClose();

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTitle>Add your Product</DialogTitle>

      <DialogContent className="max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit your Product</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Label htmlFor="name">Product Name</Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Product Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mt-4">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              {...register("description")}
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="mt-4">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              {...register("price")}
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="mt-4">
            <Label htmlFor="category">Category</Label>
            <select {...register("category")}>
              <option value="Inverter">Inverter</option>
              <option value="Solar Panel">Solar Panel</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>

          {category === "Inverter" && (
            <div className="mt-4">
              <Label htmlFor="capacity">Inverter Capacity</Label>
              <Input
                type="text"
                {...register("capacity")}
                placeholder="Capacity (e.g. 5kVA)"
              />
            </div>
          )}

          {category === "Solar Panel" && (
            <div className="mt-4">
              <Label htmlFor="wattage">Panel Wattage</Label>
              <Input
                type="text"
                {...register("wattage")}
                placeholder="Wattage (e.g. 300W)"
              />
            </div>
          )}

          {/* Image Upload */}
          <div className="mt-4">
            <Label htmlFor="images">Images</Label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}
          </div>

          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="mt-4">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview Inverter or Solar"
                  className="inline-block mr-2"
                  width={100}
                  height={100}
                />
              ))}
            </div>
          )}

          <div className="mt-4">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              type="text"
              {...register("companyInfo.companyName")}
              placeholder="Company Name"
            />
            {errors.companyInfo?.companyName && (
              <p className="text-red-500">
                {errors.companyInfo.companyName.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="email">Company Email</Label>
            <Input
              type="email"
              {...register("companyInfo.email")}
              placeholder="Company Email"
            />
            {errors.companyInfo?.email && (
              <p className="text-red-500">{errors.companyInfo.email.message}</p>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="phone">Company Phone</Label>
            <Input
              type="text"
              {...register("companyInfo.phone")}
              placeholder="Company Phone"
            />
            {errors.companyInfo?.phone && (
              <p className="text-red-500">{errors.companyInfo.phone.message}</p>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="website">Company Website</Label>
            <Input
              type="text"
              {...register("companyInfo.website")}
              placeholder="Company Website (Optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Product
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
