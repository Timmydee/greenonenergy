// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const blogSchema = z.object({
//   title: z.string().min(3),
//   slug: z.string().min(3),
//   metaDescription: z.string().min(10),
//   content: z.string().min(10),
// });

// type BlogForm = z.infer<typeof blogSchema>;

// export default function CreateBlogPost() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<BlogForm>({
//     resolver: zodResolver(blogSchema),
//   });

//   const mutation = useMutation({
//     mutationFn: async (data: BlogForm) => {
//       const res = await axios.post('/api/admin/blog', data);
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success('Blog post created!');
//       reset();
//       router.push('/dashboard/admin/blog');
//     },
//     onError: () => {
//       toast.error('Failed to create blog post');
//     },
//   });

//   const onSubmit = (data: BlogForm) => {
//     mutation.mutate(data);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Title</label>
//           <Input {...register('title')} />
//           {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Slug (URL)</label>
//           <Input {...register('slug')} placeholder="e.g., how-to-install-solar-panels" />
//           {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Meta Description</label>
//           <Textarea {...register('metaDescription')} />
//           {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription.message}</p>}
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Content</label>
//           <Textarea rows={10} {...register('content')} />
//           {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
//         </div>

//         <Button type="submit" disabled={mutation.isPending}>
//           {mutation.isPending ? 'Creating...' : 'Create Post'}
//         </Button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';

const blogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  metaDescription: z.string().min(10),
  content: z.string().min(10),
  imageUrl: z.string().nonempty("Image is required"),
});

type BlogForm = z.infer<typeof blogSchema>;

export default function CreateBlogPost() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: BlogForm) => {
      const res = await axios.post('/api/admin/blog', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Blog post created!');
      reset();
      setPreviewImage(null);
      router.push('/dashboard/admin/blog');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create blog post');
    },
  });

  const onSubmit = (data: BlogForm) => {
    mutation.mutate(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue('imageUrl', base64);
      setPreviewImage(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <Input {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Slug (URL)</label>
          <Input {...register('slug')} placeholder="e.g., how-to-install-solar-panels" />
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
          <label className="block font-medium mb-1">Thumbnail Image</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}

          {previewImage && (
            <div className="mt-2">
              <Image src={previewImage} alt="Preview" width={400} height={300} className="rounded-md w-full max-w-sm" />
            </div>
          )}
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
}
