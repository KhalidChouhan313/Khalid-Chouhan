import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/api/db";
import BlogSchema from "@/models/BlogSchema";
import { calculateReadTime } from "@/lib/utils/calculateReadTime";

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
      { status: 200 },
    );
  } catch (error) {
    console.error("Blog API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, image } = body;
    if (!title || !description || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }
    const readTime = calculateReadTime(description);

    const blog = await BlogSchema.create({
      title,
      description,
      image,
      readTime,
      views: 0,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blog,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Blog API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID required" },
        { status: 400 },
      );
    }

    const deletedBlog = await BlogSchema.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
};
export const PUT = async (req: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID required" },
        { status: 400 },
      );
    }
    if (body.description) {
      body.readTime = calculateReadTime(body.description);
    }
    const updatedBlog = await BlogSchema.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID required" },
        { status: 400 }
      );
    }

    const updatedBlog = await BlogSchema.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
};