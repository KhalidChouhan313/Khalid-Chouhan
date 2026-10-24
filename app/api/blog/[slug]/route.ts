import { NextRequest, NextResponse } from "next/server";
import { findBlog } from "@/lib/content";

// accepts the slug or the legacy ObjectId
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;
        const blog = await findBlog(slug);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error("Blog API Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
