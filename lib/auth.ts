export const ADMIN_COOKIE = "admin_session";

export const adminToken = async (): Promise<string | null> => {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;
  if (!password || !secret) return null;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${password}:${secret}`),
  );
  return Buffer.from(digest).toString("hex");
};

export const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

export const isAdmin = async (cookieValue: string | undefined) => {
  const token = await adminToken();
  return !!token && !!cookieValue && safeEqual(cookieValue, token);
};
