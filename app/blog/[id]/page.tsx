'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
  imageUrl?: string;
}

export default function BlogPostDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/blog/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading post...</div>;
  if (!post) return <div className="p-6 text-center text-red-500">Blog post not found.</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Image with Title Overlay */}
      {post.imageUrl && (
        <div className="relative h-[250px] sm:h-[400px] w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg text-center max-w-2xl px-4">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-sm text-gray-500 mb-4">{post.metaDescription}</p>

        <div
          className="prose prose-sm sm:prose lg:prose-lg prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
