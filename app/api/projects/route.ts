import { connectDB } from "@/lib/api/db";
import { SchemaProject } from "@/models/Projects";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
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

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, images, links } = body;
    if (
      !title ||
      !description ||
      images.length === 0 ||
      !links.line ||
      !links.github
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    const projects = await SchemaProject.create({
      title,
      description,
      images,
      links: {
        live: links.live,
        github: links.github,
      },
    });
    return NextResponse.json(
      { success: true, data: projects },
      { status: 200 }
    );
  } catch (error) {
    console.error("projects API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
