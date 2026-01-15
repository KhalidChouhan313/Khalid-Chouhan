import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/api/db";
import BlogSchema from "@/models/BlogSchema";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    await connectDB();

    const blog = await BlogSchema.findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: blog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
