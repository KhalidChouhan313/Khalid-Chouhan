import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import BlogSchema from "@/models/BlogSchema";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();
        const { slug } = await context.params;
        if (!mongoose.Types.ObjectId.isValid(slug)) {
            return NextResponse.json(
                { error: "Invalid blog id" },
                { status: 400 }
            );
        }
        const blog = await BlogSchema.findById(slug);
        if (!blog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error("Blog API Error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}