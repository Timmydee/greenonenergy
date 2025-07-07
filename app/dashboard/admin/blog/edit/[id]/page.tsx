// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import axios from 'axios';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { toast } from 'react-hot-toast';

// export default function EditBlogPost() {
//   const router = useRouter();
//   const params = useParams();
//   const { id } = params;

//   const [form, setForm] = useState({
//     title: '',
//     slug: '',
//     metaDescription: '',
//     content: '',
//     imageUrl: '',
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`/api/admin/blog/${id}`);
//         setForm(res.data);
//       } catch (error) {
//         toast.error('Failed to fetch post');
//       }
//     };

//     if (id) fetchPost();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.put(`/api/admin/blog/${id}`, form);
//       toast.success('Post updated successfully');
//       router.push('/dashboard/admin/blog');
//     } catch (error) {
//       toast.error('Failed to update post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Post title"
//         />
//         <Input
//           name="slug"
//           value={form.slug}
//           onChange={handleChange}
//           placeholder="Slug"
//         />
//         <Input
//           name="imageUrl"
//           value={form.imageUrl}
//           onChange={handleChange}
//           placeholder="Image URL"
//         />
//         <Textarea
//           name="metaDescription"
//           value={form.metaDescription}
//           onChange={handleChange}
//           placeholder="Meta description"
//         />
//         <Textarea
//           name="content"
//           value={form.content}
//           onChange={handleChange}
//           placeholder="Post content"
//           rows={6}
//         />
//         <div className="flex gap-4">
//           <Button type="submit" disabled={loading}>
//             {loading ? 'Updating...' : 'Update Post'}
//           </Button>
//           <Button type="button" variant="outline" onClick={() => router.back()}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }


'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

const blogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  metaDescription: z.string().min(10),
  content: z.string().min(10),
  imageUrl: z.string().optional(),
});

type BlogForm = z.infer<typeof blogSchema>;

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/admin/blog/${id}`);
        const data = res.data;

        setValue('title', data.title);
        setValue('slug', data.slug);
        setValue('metaDescription', data.metaDescription);
        setValue('content', data.content);
        setCurrentImage(data.imageUrl);
      } catch {
        toast.error('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue('imageUrl', base64);
      setCurrentImage(base64);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // You can adjust this to match your image upload endpoint
    const res = await axios.post('/api/uploadimage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data.url;
  };

  const onSubmit = async (data: BlogForm) => {
    try {
      let imageUrl = currentImage;

      if (newImageFile) {
        imageUrl = await uploadImage(newImageFile);
      }

      await axios.patch(`/api/admin/blog/${id}`, {
        ...data,
        imageUrl,
      });

      toast.success('Post updated');
      router.push('/dashboard/admin/blog');
    } catch {
      toast.error('Failed to update post');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <Input {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Slug (URL)</label>
          <Input {...register('slug')} />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Meta Description</label>
          <Textarea {...register('metaDescription')} />
          {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <Textarea rows={10} {...register('content')} />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Blog Image</label>

          {currentImage && (
            <div className="mb-2">
              <p className="text-sm mb-1">Current Image:</p>
              <Image src={currentImage} alt="Current" width={400} height={192} className="w-full max-h-48 object-cover rounded" />
            </div>
          )}

          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <Button type="submit">Update Post</Button>
      </form>
    </div>
  );
}
