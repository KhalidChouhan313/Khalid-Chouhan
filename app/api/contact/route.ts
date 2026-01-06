import { connectDB } from "@/lib/api/db";
import { NextResponse } from "next/server";
import Message from "@/models/Message";

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const message = await Message.create(body);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const messages = await Message.find();
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
