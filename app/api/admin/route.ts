import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isAdmin, safeEqual } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  return NextResponse.json({
    admin: await isAdmin(req.cookies.get(ADMIN_COOKIE)?.value),
  });
};

export const POST = async (req: NextRequest) => {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;
    const token = await adminToken();

    if (!expected || !token) {
      console.error("Admin login: ADMIN_PASSWORD / ADMIN_SECRET not configured");
      return NextResponse.json(
        { success: false, message: "Admin login is not configured" },
        { status: 500 },
      );
    }
    if (typeof password !== "string" || !safeEqual(password, expected)) {
      return NextResponse.json(
        { success: false, message: "Wrong password" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 },
    );
  }
};

export const DELETE = async () => {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
};
