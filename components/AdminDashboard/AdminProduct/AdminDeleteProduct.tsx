"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  productId: string;
  onClose: () => void;
}

export default function AdminDeleteProduct({ productId, onClose }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => axios.delete(`/api/admin/product/${productId}`),
    onSuccess: () => {
    //   queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Product deleted successfully!");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete product.");
    },
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>Are you sure you want to delete this product?</DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => mutation.mutate()} variant="destructive" disabled={mutation.isPending}>
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button onClick={onClose} variant="outline">Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
