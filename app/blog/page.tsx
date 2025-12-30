import SectionHeading from "@/components/common/SectionHeading";
import BlogCard from "@/components/sections/Blog/BlogCard";
import { blogData } from "./data";
const Blog = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 py-20 bg-[#000]">
      <SectionHeading
        isShow={false}
        heading="Blogs"
        paragraph="My thoughts on technology and business, welcome to subscribe"
      />
      <div className="w-[70%] flex items-center justify-center flex-col">
        {blogData.slice(0, 1).map((data, index) => {
          return <BlogCard key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
