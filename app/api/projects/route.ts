import { connectDB } from "@/config/db";
import { SchemaProject } from "@/models/Projects";
import { NextRequest, NextResponse } from "next/server";
import { ensureSlugs, uniqueSlug } from "@/lib/content";

export const GET = async () => {
  try {
    await ensureSlugs(SchemaProject);
    const projects = await SchemaProject.find().sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("projects API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, images, links, technologies } = body;
    if (
      typeof title !== "string" || !title ||
      typeof description !== "string" || !description ||
      !Array.isArray(images) || images.length === 0 ||
      !Array.isArray(technologies) ||
      (links?.live !== undefined && typeof links.live !== "string") ||
      (links?.github !== undefined && typeof links.github !== "string")
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    const projects = await SchemaProject.create({
      title,
      slug: await uniqueSlug(SchemaProject, title),
      description,
      images,
      technologies,
      links: {
        live: links?.live ?? "",
        github: links.github ?? "",
      },
    });
    return NextResponse.json(
      { success: true, data: projects },
      { status: 201 }
    );
  } catch (error) {
    console.error("projects API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
