"use client";
import SectionHeading from "@/components/common/SectionHeading";
import BlogCard from "@/components/sections/Blog/BlogCard";
import { Button } from "@/components/ui/button";
import { useBlogs } from "@/hooks/useBlog";
import { useCreateSubscriber } from "@/hooks/useSubscriber";
import { useCheckSubscriber } from "@/lib/api/subscribe";
import { Blog as BlogTypes } from "@/lib/types/blogs";
import { usePathname, useRouter } from "next/navigation";
const Blog = () => {
  const { mutate, isPending } = useCreateSubscriber();
  const { data: isSubscriber } = useCheckSubscriber();

  const { data, isLoading, isError } = useBlogs();
  const isSubscribed = isSubscriber?.subscribed;
  const blogs = data?.data || [];
  const router = useRouter();
  const pathname = usePathname();
  const handleSubscribe = () => {
    mutate(
      { email: "khalidchuhan7886@gmail.com" },
      {
        onSuccess: (data) => {
          alert("Subscribed successfully");
          console.log(data)
        },
        onError: (error) => {
          alert("Something went wrong");
        },
      }
    );
  };
  const blogsToShow = pathname === "/" ? blogs.slice(0, 1) : blogs;
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 py-20 bg-black">
      <SectionHeading
        isShow={false}
        heading="Blogs"
        paragraph="My thoughts on technology and business, welcome to subscribe"
      />
      {
        pathname === "/blog" && (
          <Button
            onClick={handleSubscribe}
            disabled={isPending || isSubscribed}
            className="md:w-auto w-full border border-teal bg-[#1e242b] px-6 py-3 
                 rounded font-bold text-teal shadow-md cursor-pointer
                 relative overflow-hidden
                 animate-pulse
                 hover:scale-105 hover:bg-teal hover:text-black
                 transition-all duration-300"
          >
            <span className="relative z-10">{isSubscribed ? "Subscribed" : "Subscribe My Blogs"}</span>

            <span className="absolute inset-0 rounded-md bg-teal opacity-10 blur-xl animate-ping"></span>
          </Button>
        )
      }

      <div className="md:w-[70%] w-[90] flex items-center justify-center flex-col">
        {blogsToShow?.map((data: BlogTypes, index: number) => {
          return <BlogCard key={index} data={data} />;
        })}
      </div>
      {
        pathname === "/" &&
        <div className="flex gap-4 mt-8">
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
