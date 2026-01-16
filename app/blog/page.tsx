"use client";
import SectionHeading from "@/components/common/SectionHeading";
import BlogCard from "@/components/sections/Blog/BlogCard";
import { useBlogs } from "@/hooks/useBlog";
import { BlogTypes } from "@/lib/types/blogs";
const Blog = () => {
  const { data, isLoading, isError } = useBlogs();
  const blogs = data?.data || [];
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 py-20 bg-black">
      <SectionHeading
        isShow={false}
        heading="Blogs"
        paragraph="My thoughts on technology and business, welcome to subscribe"
      />
      <div className="w-[70%] flex items-center justify-center flex-col">
        {blogs?.slice(0, 1)?.map((data: BlogTypes, index: number)=> {
          return <BlogCard key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
