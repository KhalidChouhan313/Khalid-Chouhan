import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Message from "@/models/Message";
import { sendEmail } from "@/lib/Email/sendEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET / PATCH / DELETE are admin-only (enforced in proxy.ts)
export const GET = async () => {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, email, message } = await req.json();
    if (
      typeof name !== "string" || !name.trim() || name.length > 100 ||
      typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200 ||
      typeof message !== "string" || !message.trim() || message.length > 1000
    ) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid name, email and message" },
        { status: 400 },
      );
    }

    await connectDB();
    await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() });

    try {
      await sendEmail({ name, email, message });
    } catch (mailError) {
      console.error("Contact email failed (message saved):", mailError);
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 });
    }
    await connectDB();
    const updated = await Message.findByIdAndUpdate(id, { $set: { read: true } }, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 });
    }
    await connectDB();
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
};
