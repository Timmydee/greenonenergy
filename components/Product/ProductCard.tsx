"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

interface ProductProps {
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
}

export default function ProductCard({ product }: ProductProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fallback image URL
  const fallbackImage = "/fallback-image.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all">
        {/* Display the first image or a fallback image */}
        <Image
          src={product.imageUrls?.[0] || fallbackImage} // Use imageUrls instead of images
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <CardContent className="p-4">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <p className="text-primary font-semibold mt-2">${product.price}</p>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between">
            <Button onClick={() => setShowEditModal(true)} variant="outline" size="sm">
              Edit
            </Button>
            <Button onClick={() => setShowDeleteModal(true)} variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit & Delete Modals */}
      {showEditModal && <EditProduct product={product} onClose={() => setShowEditModal(false)} />}
      {showDeleteModal && <DeleteProduct productId={product._id} onClose={() => setShowDeleteModal(false)} />}
    </motion.div>
  );
}