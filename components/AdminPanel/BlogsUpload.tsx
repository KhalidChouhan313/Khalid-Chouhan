"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, Eye, FileText, Loader2, Pencil, Plus, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useBlogs } from "@/hooks/useBlog";
import { DeleteBlog, EditBlog, PostBlog } from "@/lib/api/blogs";
import { uploadImage } from "@/lib/api/project";
import { BlogsUploadProps } from "@/lib/types/Admin";
import { Blog, BlogFormValues } from "@/lib/types/blogs";
import { cn } from "@/lib/utils/utils";
import {
  cardClass,
  ConfirmDeleteButton,
  EmptyState,
  ErrorState,
  Field,
  ghostButtonClass,
  iconButtonClass,
  ImageDropzone,
  inputClass,
  ListSkeleton,
  primaryButtonClass,
  SectionHeader,
  Thumb,
  useObjectUrls,
} from "./ui";

const CONTENT_MAX = 10000; // matches models/BlogSchema.ts maxlength
const CONTENT_PLACEHOLDER = `# My Blog Title

An intro paragraph...

## Features
- Fast
- Clean

**Bold text** and \`inline code\``;

type EditorMode = "write" | "preview";

interface BlogFormProps {
  blog: Blog | null;
  onDone: () => void;
}

const BlogForm = ({ blog, onDone }: BlogFormProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogFormValues>({
    defaultValues: { title: blog?.title ?? "", content: blog?.description ?? "" },
  });
  const content = useWatch({ control, name: "content" }) ?? "";
  const [mode, setMode] = useState<EditorMode>("write");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>();
  const [preview] = useObjectUrls(imageFile ? [imageFile] : []);
  const coverSrc = preview ?? blog?.image;

  const saveMutation = useMutation({
    mutationFn: async (values: BlogFormValues) => {
      const image = imageFile ? (await uploadImage(imageFile)).url : blog?.image;
      if (!image) throw new Error("Cover image is required");
      const payload = { title: values.title.trim(), description: values.content, image };
      return blog ? EditBlog(blog._id, payload) : PostBlog(payload);
    },
    onSuccess: () => {
      toast.success(blog ? "Blog updated" : "Blog published");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      if (blog) queryClient.invalidateQueries({ queryKey: ["blog", blog._id] });
      onDone();
    },
    onError: (error: Error) => toast.error(error.message || "Failed to save blog"),
  });

  const hasCover = () => {
    const ok = !!imageFile || !!blog?.image;
    if (!ok) setImageError("Cover image is required");
    return ok;
  };

  const onSubmit: SubmitHandler<BlogFormValues> = (values) => {
    if (hasCover()) saveMutation.mutate(values);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      // onInvalid also runs the cover check so every error shows at once
      onSubmit={handleSubmit(onSubmit, hasCover)}
      noValidate
      className={cn(cardClass, "flex flex-col gap-6 p-6 md:p-8")}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{blog ? "Edit post" : "New post"}</h3>
        <button type="button" onClick={onDone} aria-label="Close form" className={iconButtonClass}>
          <X className="h-4 w-4" />
        </button>
      </div>

      <Field label="Title" htmlFor="blog-title" error={errors.title?.message}>
        <input
          id="blog-title"
          placeholder="e.g. How I cut API load time by 25%"
          aria-invalid={!!errors.title}
          className={inputClass}
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 150, message: "Keep it under 150 characters" },
          })}
        />
      </Field>

      <Field
        label="Cover image"
        htmlFor="blog-image"
        error={imageError}
        hint={blog ? "Leave empty to keep the current cover." : undefined}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {coverSrc && (
            <Thumb
              src={coverSrc}
              alt="Cover preview"
              badge={imageFile ? "New" : "Current"}
              onRemove={imageFile ? () => setImageFile(null) : undefined}
            />
          )}
          <div className="flex-1">
            <ImageDropzone
              invalid={!!imageError}
              onFiles={([file]) => {
                if (!file) return;
                setImageError(undefined);
                setImageFile(file);
              }}
            />
          </div>
        </div>
      </Field>

      <Field
        label="Content (Markdown)"
        htmlFor="blog-content"
        error={errors.content?.message}
        hint={`${content.length.toLocaleString()} / ${CONTENT_MAX.toLocaleString()} characters`}
      >
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
          <div className="flex border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]/40" role="tablist">
            {(["write", "preview"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer",
                  mode === m
                    ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "text-[var(--color-text-muted)] hover:text-white",
                )}
              >
                {m}
              </button>
            ))}
          </div>
          {mode === "write" ? (
            <textarea
              id="blog-content"
              rows={14}
              placeholder={CONTENT_PLACEHOLDER}
              aria-invalid={!!errors.content}
              className="w-full resize-y bg-transparent px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-[var(--color-text-faint)]"
              {...register("content", {
                required: "Content is required",
                maxLength: { value: CONTENT_MAX, message: `Content must be under ${CONTENT_MAX} characters` },
              })}
            />
          ) : (
            <div className="prose prose-invert min-h-[320px] max-w-none px-5 py-4 prose-headings:text-white prose-a:text-[var(--color-accent)]">
              {content.trim() ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              ) : (
                <p className="text-[var(--color-text-faint)]">Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>
      </Field>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onDone} className={ghostButtonClass}>
          Cancel
        </button>
        <button type="submit" disabled={saveMutation.isPending} className={primaryButtonClass}>
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saveMutation.isPending ? "Saving..." : blog ? "Save changes" : "Publish post"}
        </button>
      </div>
    </motion.form>
  );
};

export const BlogsUpload = ({
  editingBlog,
  setEditingBlog,
  showBlogForm,
  setShowBlogForm,
}: BlogsUploadProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useBlogs();
  const blogs = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: DeleteBlog,
    onSuccess: () => {
      toast.success("Blog deleted");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: Error) => toast.error(error.message || "Failed to delete blog"),
  });

  const openForm = (blog: Blog | null) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
  };
  const closeForm = () => {
    setEditingBlog(null);
    setShowBlogForm(false);
  };

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        eyebrow="Writing"
        title="Blog Posts"
        action={
          !showBlogForm && (
            <button type="button" onClick={() => openForm(null)} className={primaryButtonClass}>
              <Plus className="h-4 w-4" /> New post
            </button>
          )
        }
      />

      {showBlogForm && <BlogForm key={editingBlog?._id ?? "new"} blog={editingBlog} onDone={closeForm} />}

      {isLoading ? (
        <ListSkeleton />
      ) : isError ? (
        <ErrorState message="Couldn't load blog posts." onRetry={() => refetch()} />
      ) : blogs.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-6 w-6" />}
          title="No posts yet"
          text="Write your first post and it will appear on the Blog page."
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className={cn(
                cardClass,
                "group flex flex-col gap-4 p-4 transition-colors hover:border-[var(--color-border-accent)] sm:flex-row sm:items-center",
                editingBlog?._id === blog._id && "border-[var(--color-accent)]",
              )}
            >
              <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-bg-surface sm:h-20 sm:w-32">
                <Image src={blog.image} alt={blog.title} fill unoptimized className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Link
                  href={`/blog/${blog.slug ?? blog._id}`}
                  target="_blank"
                  className="truncate text-lg font-bold text-white transition-colors hover:text-[var(--color-accent)]"
                >
                  {blog.title}
                </Link>
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-faint)]">
                  <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {blog.views} views</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--color-border-strong)]" />
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {blog.readTime} min read</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--color-border-strong)]" />
                  <time dateTime={blog.createdAt}>{new Date(blog.createdAt).toLocaleDateString()}</time>
                </div>
              </div>
              <div className="flex shrink-0 gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    openForm(blog);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  aria-label={`Edit ${blog.title}`}
                  title="Edit"
                  className={iconButtonClass}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <ConfirmDeleteButton
                  label={`Delete ${blog.title}`}
                  pending={deleteMutation.isPending && deleteMutation.variables === blog._id}
                  onConfirm={() => {
                    if (editingBlog?._id === blog._id) closeForm();
                    deleteMutation.mutate(blog._id);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
