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
    mutate(
      { email: email },
      {
        onSuccess: () => {
          toast.success("Subscribed successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setShowEmailInput(false);
        },
        onError: (error) => {
          toast.error("Failed to subscribe. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });;
          console.log(error)

        },
      }
    );
  };
  const blogsToShow = pathname === "/" ? blogs.slice(0, 1) : blogs;
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5 py-20 bg-black">

        <BlogSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex items-center justify-center py-20 bg-black">
        <p className="text-white">Failed to load blogs</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 py-20 bg-black">
      <SectionHeading
        isShow={false}
        heading="Blogs"
        paragraph="My thoughts on technology and business, welcome to subscribe"
      />
      {
        pathname === "/blog" && !showEmailInput && (
          <Button
            onClick={() => setShowEmailInput(true)}
            disabled={isPending || isSubscribed}
            className="md:w-auto w-full border border-teal bg-[#1e242b] px-6 py-3 
                 rounded font-bold text-teal shadow-md cursor-pointer
                 relative overflow-hidden
                 animate-pulse
                 hover:scale-105 hover:bg-teal hover:text-black
                 transition-all duration-300"
          >
            {isSubscribed ? "Subscribed" : "Subscribe My Blogs"}
            <span className="absolute inset-0 rounded-md bg-teal opacity-10 blur-xl animate-ping"></span>
          </Button>
        )
      }
      {
        showEmailInput && !isSubscribed &&(
          <div className="flex gap-4 mt-4">
            <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-auto rounded focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <Button
              onClick={handleSubscribe}
              disabled={isPending || isSubscribed}
              className="md:w-auto w-full border border-teal  px-6 py-3 
                 rounded font-bold text-teal shadow-md cursor-pointer
                 relative overflow-hidden
                 hover:scale-105 hover:bg-teal hover:text-black
                 transition-all duration-300"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        )
      }
      <div className="md:w-[70%] w-[90%] flex items-center justify-center flex-col">
        {blogsToShow?.map((data: BlogTypes, index: number) => {
          return <BlogCard key={index} data={data} />;
        })}
      </div>
      {
        pathname === "/" &&
        <div className="flex gap-4 mt-8 flex-col md:flex-row md:w-auto w-[90%]">
          <Button
            onClick={() => router.push("/blog")}
            className="md:w-auto w-full border border-teal  px-6 py-3 
                rounded font-bold text-black shadow-md cursor-pointer
            bg-teal hover:text-black transition-all duration-300"
          >
            View More        </Button>
          <Button
            onClick={handleSubscribe}
            disabled={isPending || isSubscribed}
            className="md:w-auto w-full border border-teal bg-[#1e242b] px-6 py-3 
                rounded font-bold text-teal shadow-md cursor-pointer
                hover:bg-teal hover:text-black transition-all duration-300"
          >
            {
              isSubscribed ? "Subscribed" : "Subscribe"
            }
          </Button>

        </div>
      }
    </div>
  );
};

export default Blog;
