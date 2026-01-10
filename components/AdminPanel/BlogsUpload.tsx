"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { Blog } from "@/lib/types/Admin";



export const BlogsUpload = ({
  editingBlog,
  blogs,
  saveBlogs,
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

  const onSubmit: SubmitHandler<BlogFormValues> = async (data) => {
    if (editingBlog) {
      const updated = blogs.map((b) =>
        b.id === editingBlog.id
          ? { ...b, ...data }
          : b
      );
      await saveBlogs(updated);
      setEditingBlog(null);
    } else {
      await saveBlogs([
        ...blogs,
        {
          ...data,
          id: Date.now(),
          date: new Date().toLocaleDateString("ur-PK"),
        },
      ]);
    }
    reset();
    setShowBlogForm(false);
  };

  const deleteBlog = async (id: number) => {
    const updated = blogs.filter((b) => b.id !== id);
    await saveBlogs(updated);
  };

  const startEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
    reset({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
    });
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Blog Post
        </button>
      </div>

      {showBlogForm && (
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">
              {editingBlog ? "Edit Blog Post" : "New Blog Post"}
            </h3>
            <button
              onClick={() => {
                setShowBlogForm(false);
                setEditingBlog(null);
                reset();
              }}
            >
              <X />
            </button>
          </div>

          <input
            {...register("title", { required: "Title required hai" })}
            placeholder="Blog Title"
          />
          {errors.title && <p>{errors.title.message}</p>}

          <textarea
            {...register("excerpt", { required: "Excerpt required hai" })}
            placeholder="Excerpt"
          />
          {errors.excerpt && <p>{errors.excerpt.message}</p>}

          <textarea
            {...register("content", { required: "Content required hai" })}
            placeholder="Content"
          />
          {errors.content && <p>{errors.content.message}</p>}

          <input {...register("category")} placeholder="Category" />

          <button onClick={handleSubmit(onSubmit)}>
            <Save /> {editingBlog ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded">
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>

            <button onClick={() => startEdit(blog)}>
              <Edit2 />
            </button>
            <button onClick={() => deleteBlog(blog.id)}>
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
