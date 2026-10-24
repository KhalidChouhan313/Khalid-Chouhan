import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdmin } from "@/lib/auth";
import { rateLimited } from "@/lib/rateLimit";

const MINUTE = 60_000;

// [method, path prefix, max requests, window] per client IP
const LIMITS: [string, string, number, number][] = [
  ["POST", "/api/admin", 5, 15 * MINUTE],
  ["POST", "/api/contact", 5, 60 * MINUTE],
  ["POST", "/api/subscriber", 3, 60 * MINUTE],
  ["POST", "/api/chat", 20, 10 * MINUTE],
  ["PATCH", "/api/blog", 30, 10 * MINUTE],
];

const needsAdmin = (method: string, path: string) => {
  if (path.startsWith("/api/upload")) return true;
  if (path.startsWith("/api/social") || path.startsWith("/api/settings")) return !["GET", "HEAD"].includes(method);
  if (path.startsWith("/api/contact")) return method !== "POST";
  if (path.startsWith("/api/blog") || path.startsWith("/api/projects")) {
    return !["GET", "HEAD", "PATCH"].includes(method);
  }
  return false;
};

export async function proxy(req: NextRequest) {
  const { method } = req;
  const path = req.nextUrl.pathname;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const limit = LIMITS.find(([m, p]) => m === method && path.startsWith(p));
  if (limit && rateLimited(`${method}:${limit[1]}:${ip}`, limit[2], limit[3])) {
    return NextResponse.json(
      { success: false, message: "Too many requests, please try again later." },
      { status: 429 },
    );
  }

  if (needsAdmin(method, path) && !(await isAdmin(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
