import { connectDB } from "@/lib/api/db";
import { NextRequest, NextResponse } from "next/server";
import Subscriber from "@/models/Subscribe";


export const GET = async (req: NextRequest) => {
    await connectDB();

    const email = req.cookies.get("subscribed_email")?.value;

    if (!email) {
        return NextResponse.json({ subscribed: false });
    }

    const existing = await Subscriber.findOne({ email });

    return NextResponse.json({
        subscribed: !!existing,
    });
};
