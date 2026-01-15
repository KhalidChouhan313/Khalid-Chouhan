import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/api/db";
import BlogSchema from "@/models/BlogSchema";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let query: any = {};

    if (search) {
      query = {
        title: { $regex: search, $options: "i" },
      };
    }

    const blogs = await BlogSchema.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "Blogs fetch successfully",
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Blog API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
};
