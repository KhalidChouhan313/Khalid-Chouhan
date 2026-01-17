"use client";

import { useBlogs } from "@/hooks/useBlog";
import { DeleteBlog, EditBlog, PostBlog } from "@/lib/api/blogs";
import { uploadImage } from "@/lib/api/project";
import { Blog, BlogFormValues, BlogsUploadProps } from "@/lib/types/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Plus, Save, Trash2, X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const BlogsUpload = ({
  editingBlog,
  setEditingBlog,
  setShowBlogForm,
  showBlogForm,
}: BlogsUploadProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormValues>();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useBlogs();
  const allBlogs = data?.data || [];
  const createBlogMutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      const imageFile = data.image[0];
      const uploadRes = await uploadImage(imageFile);

      const payload = {
        title: data.title,
        description: data.content,
        image: uploadRes.url,
      };

      return PostBlog(payload);
    },
    onSuccess: () => {
      toast.success("Blog created successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      reset();
      setShowBlogForm(false);
    },
  });
  const deleteBlogHandler = async (slug: string) => {
    await DeleteBlog(slug);
    toast.success("Blog deleted successfully");
    queryClient.invalidateQueries({ queryKey: ["blogs"] });
  };

  const editcreateBlogMutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      if (!editingBlog) return;
      let imageUrl = editingBlog?.image;
      if (data.image?.[0]) {
        const uploadRes = await uploadImage(data.image[0]);
        imageUrl = uploadRes.url;
      }
      return EditBlog(editingBlog?._id, {
        title: data.title,
        description: data.content,
        image: imageUrl,
      });
    },
    onSuccess: () => {
      toast.success("Blog updated successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setEditingBlog(null);
      reset();
      setShowBlogForm(false);
    },
  });

  const onSubmit: SubmitHandler<BlogFormValues> = async (data) => {
    if (editingBlog) {
      await editcreateBlogMutation.mutateAsync(data);
    } else {
      await createBlogMutation.mutateAsync(data);
    }
  };

  const startEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
    reset({ title: blog?.title, content: blog?.description });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
        <button
          onClick={() => {
            setShowBlogForm(true);
            setEditingBlog(null);
            reset();
          }}
          className="bg-teal text-black font-bold cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Blog Post
        </button>
      </div>

      {showBlogForm && (
        <div className=" p-6 rounded-lg space-y-4 flx">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">
              {editingBlog ? "Edit Blog Post" : "New Blog Post"}
            </h3>
            <button
              aria-label="Close form"
              title="Close"
              onClick={() => {
                setShowBlogForm(false);
                setEditingBlog(null);
                reset();
              }}
            >
              <X />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-xl mx-auto bg- p-8 rounded-2xl shadow-lg flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Blog Title
              </label>
              <input
                className="p-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("title", { required: "Title required hai" })}
                placeholder="Enter blog title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Blog Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image required hai" })}
                className="file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-teal-50 file:text-teal-700
                 hover:file:bg-teal-100"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                {...register("content", { required: "Content required hai" })}
                placeholder="Write your blog content..."
                rows={6}
                className="p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                createBlogMutation.isPending ||
                editcreateBlogMutation?.isPending
              }
              className={`flex items-center justify-center gap-2
    py-3 rounded-lg font-medium transition
    ${
      createBlogMutation.isPending
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-teal-600 hover:bg-teal-700 text-white"
    }
  `}
            >
              <Save size={18} />
              {editingBlog
                ? editcreateBlogMutation?.isPending
                  ? "Updating..."
                  : "Update Blog"
                : createBlogMutation.isPending
                  ? "Posting..."
                  : "Post Blog"}
            </button>
          </form>
        </div>
      )}
      <div className="grid gap-4">
        {allBlogs.map((blog) => (
          <div
            key={blog?._id}
            className="bg-white text-black font-bold p-4 rounded flex justify-between items-center"
          >
            <h3>{blog?.title}</h3>
            <div className="flex gap-2">
              <button
                aria-label="Edit blog"
                title="Edit blog"
                onClick={() => startEdit(blog)}
              >
                <Edit2 />
              </button>
              <button
                aria-label="Delete blog"
                title="Delete blog"
                onClick={() => deleteBlogHandler(blog._id)}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
