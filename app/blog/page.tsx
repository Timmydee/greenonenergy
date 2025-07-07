'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  imageUrl?: string;
}

export default function ClientBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blog');
        setBlogs(res.data);
      } catch (error) {
        console.error('Failed to fetch blog posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading blog posts...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">🌿 Our Latest Blog Posts</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100 flex flex-col"
          >
            {blog.imageUrl && (
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={400}
                height={208}
                className="h-52 w-full object-cover transition-transform hover:scale-105 duration-300"
              />
            )}

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{blog.metaDescription}</p>
              </div>

              <div className="mt-4">
                <Link href={`/blog/${blog._id}`}>
                  <Button variant="ghost" className="text-blue-600 px-0 hover:underline">
                    Read More →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
