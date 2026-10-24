import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import SiteSettingsModel from "@/models/SiteSettings";
import { DEFAULT_SITE_SETTINGS, SiteSettings } from "@/lib/settings";

const toSettings = (doc: Partial<SiteSettings> | null): SiteSettings => ({
  aboutImage: doc?.aboutImage ?? "",
});

export const GET = async () => {
  try {
    await connectDB();
    const doc = await SiteSettingsModel.findOne().lean<Partial<SiteSettings>>();
    return NextResponse.json({ success: true, data: toSettings(doc) });
  } catch (error) {
    console.error("Settings API Error:", error);
    return NextResponse.json({ success: false, data: DEFAULT_SITE_SETTINGS }, { status: 500 });
  }
};

// admin-only (enforced in proxy.ts)
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const aboutImage = typeof body?.aboutImage === "string" ? body.aboutImage.trim() : "";
    // only our own Cloudinary uploads (or empty = reset to the default image)
    if (aboutImage && !/^https:\/\/res\.cloudinary\.com\/\S+$/i.test(aboutImage)) {
      return NextResponse.json(
        { success: false, message: "Image must be uploaded through the admin panel" },
        { status: 400 }
      );
    }

    await connectDB();
    const doc = await SiteSettingsModel.findOneAndUpdate(
      {},
      { $set: { aboutImage } },
      { new: true, upsert: true }
    ).lean<Partial<SiteSettings>>();
    return NextResponse.json({ success: true, message: "Settings saved", data: toSettings(doc) });
  } catch (error) {
    console.error("Settings API Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
};
