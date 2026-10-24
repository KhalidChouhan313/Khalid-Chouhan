import { connectDB } from "@/config/db";
import { SchemaProject } from "@/models/Projects";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(slug)) {
      return NextResponse.json(
        { error: "Invalid project id" },
        { status: 400 }
      );
    }

    const project = await SchemaProject.findById(slug);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("projects API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((v) => typeof v === "string" && v.length > 0);

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(slug)) {
      return NextResponse.json(
        { success: false, message: "Invalid project id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { title, description, images, technologies, links } = body ?? {};
    const update: Record<string, unknown> = {};
    if (typeof title === "string" && title.trim()) update.title = title.trim();
    if (typeof description === "string" && description.trim()) update.description = description.trim();
    if (images !== undefined) {
      if (!isStringArray(images) || images.length === 0) {
        return NextResponse.json(
          { success: false, message: "At least one image is required" },
          { status: 400 }
        );
      }
      update.images = images;
    }
    if (technologies !== undefined) {
      if (!isStringArray(technologies)) {
        return NextResponse.json(
          { success: false, message: "Technologies must be a list of names" },
          { status: 400 }
        );
      }
      update.technologies = technologies;
    }
    if (typeof links?.live === "string" && links.live) update["links.live"] = links.live;
    if (typeof links?.github === "string" && links.github) update["links.github"] = links.github;

    await connectDB();
    const project = await SchemaProject.findByIdAndUpdate(
      slug,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    console.error("projects API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(slug)) {
      return NextResponse.json(
        { error: "Invalid project id" },
        { status: 400 }
      );
    }

    const project = await SchemaProject.findByIdAndDelete(slug);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("projects API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
