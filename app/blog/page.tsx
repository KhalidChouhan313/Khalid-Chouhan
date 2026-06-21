"use client";

import BlogSkeleton from "@/components/common/Loading/BlogSkeleton";
import SectionHeading from "@/components/common/SectionHeading";
import BlogCard from "@/components/sections/Blog/BlogCard";
import { Button } from "@/components/ui/button";
import { useBlogs } from "@/hooks/useBlog";
import { useCreateSubscriber } from "@/hooks/useSubscriber";
import { useCheckSubscriber } from "@/lib/api/subscribe";
import { Blog as BlogTypes } from "@/lib/types/blogs";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Blog = () => {
  const { mutate, isPending } = useCreateSubscriber();
  const { data: isSubscriber } = useCheckSubscriber();
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const { data, isLoading, isError } = useBlogs();
  const isSubscribed = isSubscriber?.subscribed;
  const blogs = data?.data || [];
  const router = useRouter();
  const pathname = usePathname();

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    mutate(
      { email: email },
      {
        onSuccess: () => {
          toast.success("Subscribed successfully", {
            position: "bottom-right",
            autoClose: 5000,
          });
          setShowEmailInput(false);
          setEmail("");
        },
        onError: (error) => {
          toast.error("Failed to subscribe. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
          });
          console.error(error);
        },
      }
    );
  };

  const blogsToShow = pathname === "/" ? blogs.slice(0, 1) : blogs;

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5 py-20 ">
        <BlogSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex items-center justify-center py-20 bg-bg-base">
        <p className="text-red-400 font-semibold">Failed to load blogs</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 py-20  transition-colors duration-300">
      <SectionHeading
        isShow={false}
        heading="Blogs"
        paragraph="My thoughts on technology and business, welcome to subscribe"
      />

      {pathname === "/blog" && !showEmailInput && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowEmailInput(true)}
          disabled={isPending || isSubscribed}
          className="md:w-auto w-[90%] border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#0f0c09] text-[var(--color-accent)] px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
        >
          {isSubscribed ? "Subscribed" : "Subscribe to My Blog"}
        </motion.button>
      )}

      {showEmailInput && !isSubscribed && (
        <div className="flex gap-4 mt-2 md:flex-row flex-col md:w-auto w-[90%]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full md:w-80 bg-bg-surface border border-[var(--color-border)] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--color-accent)] transition-all duration-300 font-sans"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
            disabled={isPending || isSubscribed}
            className="md:w-auto w-full bg-[var(--color-accent)] text-[#0f0c09] hover:bg-[var(--color-accent-dim)] px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </motion.button>
        </div>
      )}

      <div className="md:w-[70%] w-[90%] flex items-center justify-center flex-col mt-4">
        {blogsToShow?.map((data: BlogTypes, index: number) => {
          return <BlogCard key={index} data={data} />;
        })}
      </div>

      {pathname === "/" && (
        <div className="flex gap-4 mt-8 flex-col md:flex-row md:w-auto w-[90%]">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/blog")}
            className="md:w-auto w-full bg-[var(--color-accent)] text-[#0f0c09] hover:bg-[var(--color-accent-dim)] px-8 py-3.5 rounded-xl font-bold shadow-md cursor-pointer transition-colors duration-300"
          >
            View More
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/blog")}
            disabled={isPending || isSubscribed}
            className="md:w-auto w-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-white px-8 py-3.5 rounded-xl font-bold cursor-pointer transition-all duration-300"
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Blog;
