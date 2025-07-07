"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw } from "lucide-react";

const fetchRecommendations = async (params: URLSearchParams) => {
  const response = await axios.get("/api/recommendations", {
    params: Object.fromEntries(params.entries()), // Convert URLSearchParams to object
  });
  return response.data.data;
};

function Recommendations() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    totalLoad: searchParams.get("totalLoad") || "",
    inverterSize: searchParams.get("inverterSize") || "",
    panelSize: searchParams.get("panelSize") || "",
    budget: searchParams.get("budget") || "",
  });

  // React Query: Fetch recommendations
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ["recommendations", filters],
    queryFn: () => fetchRecommendations(new URLSearchParams(filters)),
    enabled: !!filters.totalLoad, // Only run query if there's data
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle filtering
  const applyFilters = () => {
    refetch();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Recommended Products</h1>

      {/* Filters Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Input
          name="totalLoad"
          placeholder="Total Load (VA)"
          value={filters.totalLoad}
          onChange={handleChange}
        />
        <Input
          name="inverterSize"
          placeholder="Inverter Size (kW)"
          value={filters.inverterSize}
          onChange={handleChange}
        />
        <Input
          name="panelSize"
          placeholder="Panel Size (kW)"
          value={filters.panelSize}
          onChange={handleChange}
        />
        <Input
          name="budget"
          placeholder="Max Budget ($)"
          value={filters.budget}
          onChange={handleChange}
        />
      </div>

      <Button onClick={applyFilters} className="mb-6 flex items-center gap-2">
        <RefreshCw size={16} />
        Apply Filters
      </Button>

      {/* Loading State */}
      {isLoading && <Loader2 className="animate-spin mx-auto" size={32} />}

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products?.length > 0 ? (
          products.map((product: { _id: string; name: string; loadCapacity: number; inverterSize: number; panelSize: number; price: number }) => (
            <Card key={product._id} className="shadow-md">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Load Capacity: {product.loadCapacity} VA</p>
                <p className="text-sm">Inverter Size: {product.inverterSize} kW</p>
                <p className="text-sm">Panel Size: {product.panelSize} kW</p>
                <p className="text-sm">Price: ${product.price}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Recommendations />
    </Suspense>
  );
}