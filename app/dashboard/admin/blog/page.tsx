'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

const fetchBlogPosts = async () => {
  const res = await axios.get("/api/admin/blog");
  return res.data;
};

const deleteBlogPost = async (id: string) => {
  const res = await axios.delete(`/api/admin/blog/${id}`);
  return res.data;
};

export default function AdminBlogDashboard() {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<{ id: string; title: string } | null>(null);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      setSelectedPost(null);
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedPost) {
      deleteMutation.mutate(selectedPost.id);
    }
  };

  if (isLoading) return <div>Loading blog posts...</div>;
  if (isError) return <div>Error fetching blog posts.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Link href="/dashboard/admin/blog/create">
          <Button>Add New Post</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post: { _id: string; title: string; slug: string; metaDescription: string; imageUrl?: string }) => (
          <Card key={post._id} className="overflow-hidden">
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.slug}</p>
              <p className="text-sm">{post.metaDescription}</p>
              <div className="flex gap-2 mt-4">
                <Link href={`/dashboard/admin/blog/edit/${post._id}`}>
                  <Button size="sm" variant="secondary">Edit</Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setSelectedPost({ id: post._id, title: post.title })}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Blog Post</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete <strong>{selectedPost?.title}</strong>? This action cannot be undone.</p>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setSelectedPost(null)}>Cancel</Button>
                      <Button
                        variant="destructive"
                        onClick={handleConfirmDelete}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? 'Deleting...' : 'Yes, delete'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
