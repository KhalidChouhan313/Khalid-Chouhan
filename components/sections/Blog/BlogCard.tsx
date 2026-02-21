import { Blog as BlogTypes } from "@/lib/types/blogs";
import { Divider } from "@mui/material";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface BlogCardProps {
  data: BlogTypes;
}

const BlogCard = ({ data }: BlogCardProps) => {
  console.log(data)
  const router = useRouter()
  return (
    <div className="w-full flex lg:flex-row flex-col items-start justify-start border-t border-b border-gray-700 py-6 gap-6">
      <div className="w-full lg:w-64 h-48 relative shrink-0">
        <Image
          src={data?.image}
          alt={data?.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between gap-6 ">
        <h2 className="text-teal font-mono text-xl font-semibold ">
          {data?.title}
        </h2>
        <p className="text-gray-400  line-clamp-3 text-wrap ">
          {data?.description.slice(0, 180)}...
        </p>
        <Link
          href={`/blog/${data?._id}`}
          className="text-teal cursor-pointer underline font-mono decoration-white
                 decoration-2 underline-offset-8 flex items-center  "
        >
          Read More <ChevronsRight />{" "}
        </Link>
        <hr className="border-t border-gray-700 my-2 w-full" />

        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
          <span className="bg-gray-800 px-2 py-1 rounded-full">
            Web Developer{" "}
          </span>
          <span>views: {data?.views}</span>
          <span>Posted Date: {new Date(data?.createdAt).toLocaleDateString()}</span>
          {data?.readTime} min read
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
