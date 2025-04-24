'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const fetchBlogPosts = async () => {
    const res = await axios.get("/api/blog");
    return res.data;
  };

export default function AdminBlogDashboard() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });

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
        {posts.map((post: any) => (
          <Card key={post._id}>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.slug}</p>
              <p className="text-sm">{post.metaDescription}</p>
              <div className="flex gap-2 mt-4">
                <Link href={`/dashboard/admin/blog/edit/${post._id}`}>
                  <Button size="sm" variant="secondary">Edit</Button>
                </Link>
                <Button size="sm" variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
