import { BlogTypes } from "@/lib/types/blogs";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
interface BlogCardProps {
  data: BlogTypes;
}

const BlogCard = ({ data }: BlogCardProps) => {
  return (
    <div className="w-full flex lg:flex-row flex-col items-start justify-start border-t border-b border-gray-700 py-6 gap-6">
      <div className="flex-shrink-0 w-auto h-[15vh] relative">
        <Image
          src={data.image}
          alt={data.title}
          width={200}
          height={200}
          className="object-cover "
        />
      </div>

      <div className="flex flex-col justify-between gap-3">
        <h2 className="text-teal font-mono text-xl font-semibold ">
          {data.title}
        </h2>
        <p className="text-gray-400  line-clamp-3 text-wrap ">
          {data.description}
        </p>
        <span
          className="text-teal cursor-pointer underline font-mono decoration-white
                 decoration-2 underline-offset-8 flex items-center  "
        >
          Read More <ChevronsRight />{" "}
        </span>
        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
          <span className="bg-gray-800 px-2 py-1 rounded-full">
            Web Developer{" "}
          </span>
          <span>views: {data.views}</span>
          <span>Date: {new Date(data.createdAt).toLocaleDateString()}</span>
          <span>Read: 1 Min</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
