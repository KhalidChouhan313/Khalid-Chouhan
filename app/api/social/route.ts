import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import SocialLinksModel from "@/models/SocialLinks";
import { DEFAULT_SOCIAL_LINKS, SOCIAL_KEYS, SocialLinks } from "@/lib/social";

const toLinks = (doc: Partial<SocialLinks> | null): SocialLinks =>
  doc
    ? Object.fromEntries(SOCIAL_KEYS.map((k) => [k, doc[k] ?? ""])) as SocialLinks
    : DEFAULT_SOCIAL_LINKS;

export const GET = async () => {
  try {
    await connectDB();
    const doc = await SocialLinksModel.findOne().lean<Partial<SocialLinks>>();
    return NextResponse.json({ success: true, data: toLinks(doc) });
  } catch (error) {
    console.error("Social API Error:", error);
    return NextResponse.json({ success: false, data: DEFAULT_SOCIAL_LINKS }, { status: 500 });
  }
};

// admin-only (enforced in proxy.ts)
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const update = {} as SocialLinks;
    for (const key of SOCIAL_KEYS) {
      const value = typeof body?.[key] === "string" ? body[key].trim() : "";
      if (value && (!/^https:\/\/\S+$/i.test(value) || value.length > 300)) {
        return NextResponse.json(
          { success: false, message: `${key} must be a full https:// URL` },
          { status: 400 }
        );
      }
      update[key] = value;
    }

    await connectDB();
    const doc = await SocialLinksModel.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true }
    ).lean<Partial<SocialLinks>>();
    return NextResponse.json({ success: true, message: "Social links saved", data: toLinks(doc) });
  } catch (error) {
    console.error("Social API Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
};
