import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "projects" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
};
