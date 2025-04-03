"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AdminProductCard from "./AdminProductCard";
import AdminAddProduct from "./AdminAddProduct";


const fetchProducts = async () => {
  const { data } = await axios.get("/api/admin/product");
  return data;
};

export default function AdminProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [showAddModal, setShowAddModal] = useState(false);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );

  if (error) return <p className="text-red-500">Failed to load products.</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowAddModal(true)}>+ Add Product</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product: any) => (
          <AdminProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && <AdminAddProduct onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
