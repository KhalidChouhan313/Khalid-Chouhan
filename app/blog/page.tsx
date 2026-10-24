"use client";

import BlogSkeleton from "@/components/common/Loading/BlogSkeleton";
import SectionHeading from "@/components/common/SectionHeading";
import BlogCard from "@/components/sections/Blog/BlogCard";
import { useBlogs } from "@/hooks/useBlog";
import { useCreateSubscriber } from "@/hooks/useSubscriber";
import { useCheckSubscriber } from "@/lib/api/subscribe";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Blog = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateSubscriber();
  const { data: isSubscriber } = useCheckSubscriber();
  const [email, setEmail] = useState("");
  const { data, isLoading, isError } = useBlogs();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isSubscribed = isSubscriber?.subscribed;
  const blogs = data?.data || [];
  const blogsToShow = isHome ? blogs.slice(0, 3) : blogs;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    mutate(
      { email: email.trim() },
      {
        onSuccess: () => {
          toast.success("Subscribed successfully");
          setEmail("");
          queryClient.invalidateQueries({ queryKey: ["checkSubscriber"] });
        },
        onError: (error: Error) => toast.error(error.message || "Failed to subscribe. Please try again."),
      },
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center gap-12">
      <SectionHeading
        heading="Blog"
        title="Notes on code, product and building in public"
        paragraph="Practical write-ups on web development, fintech engineering and the lessons I learn shipping real products."
      />

      {isLoading && <BlogSkeleton count={isHome ? 3 : 6} />}

      {isError && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400">
          Failed to load blogs
        </p>
      )}

      {!isLoading && !isError && blogsToShow.length === 0 && (
        <p className="text-sm text-[var(--color-text-muted)]">No posts yet — check back soon.</p>
      )}

      {blogsToShow.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogsToShow.map((blog) => (
            <BlogCard key={blog._id} data={blog} />
          ))}
        </motion.div>
      )}

      {isHome && blogs.length > 3 && (
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border-strong)] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          Read all articles
          <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="border-gradient glass relative w-full overflow-hidden rounded-3xl p-6 sm:p-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Get new posts in your inbox</h3>
            <p className="text-sm text-[var(--color-text-muted)]">No spam — just new articles when they&apos;re published.</p>
          </div>

          {isSubscribed ? (
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle2 size={18} /> You&apos;re subscribed — thanks!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <label htmlFor="subscribe-email" className="sr-only">Email address</label>
              <div className="relative flex-1 lg:w-80">
                <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]" />
                <input
                  id="subscribe-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-[var(--color-border)] bg-[#0f0c09]/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-[var(--color-text-faint)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-bold text-[#0f0c09] transition-all hover:bg-white disabled:opacity-60 cursor-pointer"
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                Subscribe
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
