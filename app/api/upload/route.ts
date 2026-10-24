import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";

const MAX_BYTES = 5 * 1024 * 1024;

// admin-only (enforced in proxy.ts)
export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 },
      );
    }
    if (!file.type.startsWith("image/") || file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, message: "Only images up to 5MB are allowed" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "Portfolio_images", resource_type: "image" },
          (error, result) => {
            if (error || !result) return reject(error ?? new Error("Empty upload result"));
            resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 },
    );
  }
};
