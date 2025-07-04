"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Zod schema for form validation
const ProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().nonempty("Description is required"),
  price: z
    .string()
    .nonempty("Price is required")
    .transform((val) => Number(val)),
  category: z.enum(["Inverter", "Solar Panel"]),
  capacity: z.string().optional(),
  wattage: z.string().optional(),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(3, "At most 3 images allowed"),
});

type ProductFormType = z.infer<typeof ProductSchema>;

interface AddProductProps {
  onClose: () => void;
}

export default function AddProduct({ onClose }: AddProductProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [category, setCategory] = useState<"Inverter" | "Solar Panel">("Inverter");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => {
    setValue("category", category)
  },[category, setValue])

  // Handle image selection and preview
  const handleImageChange = useCallback( async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const base64Images: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          base64Images.push(reader.result as string);
          if (base64Images.length === files.length) {
            setValue("images", base64Images);
            setPreviewImages(base64Images);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [setValue]);

  const uploadImagesMutation = useMutation({
    mutationFn: async (images: string[]) => {
      const {data} = await axios.post("/api/uploadimage", { images });
      return data.imageUrls;
    },
    onError: () => {
      toast.error("Failed to upload images")
    }
  })

  const updateProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const response = await axios.post("/api/vendor/product/add", productData)
      return response.data
    },
    onSuccess: () => {
      toast.success("Product updated successfully")
      onClose()
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to update product")
    }
  })

  const onSubmit = async (data: ProductFormType) => {
    try {
    const imageUrls = await uploadImagesMutation.mutateAsync(data.images)

    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      capacity: data.category === "Inverter" ? data.capacity : undefined,
      wattage: data.category === "Solar Panel" ? data.wattage : undefined,
      imageUrls,
    }

    await updateProductMutation.mutateAsync(productData)
  } catch (error) {
      console.error("Failed to update", error)
  }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>Add</DialogTitle>
        <DialogDescription> Add your Product</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
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
            <select {...register("category")} onChange={(e) => setCategory(e.target.value as "Inverter" | "Solar Panel")}>
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
              <Input type="text" {...register("capacity")} placeholder="Capacity (e.g. 5kVA)" />
            </div>
          )}

          {category === "Solar Panel" && (
            <div className="mt-4">
              <Label htmlFor="wattage">Panel Wattage</Label>
              <Input type="text" {...register("wattage")} placeholder="Wattage (e.g. 300W)" />
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
                  alt="Preview"
                  className="inline-block mr-2"
                  width={100}
                  height={100}
                />
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updateProductMutation.isPending || uploadImagesMutation.isPending}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {updateProductMutation.isPending || uploadImagesMutation.isPending ? 'Adding Product' : 'Add Product'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
