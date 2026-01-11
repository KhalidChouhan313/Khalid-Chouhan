import { connectDB } from "@/lib/api/db";
import { SchemaProject } from "@/models/Projects";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const project = await SchemaProject.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("projects API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
