import { connectDB } from "@/lib/api/db";
import { NextResponse } from "next/server";
import Message from "@/models/Message";
import { sendEmail } from "@/lib/Email/sendEmail";

export const GET = async () => {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);

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
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const savedMessage = await Message.create({
      name,
      email,
      message,
    });
    await sendEmail({
      name,
      email,
      message,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: savedMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
