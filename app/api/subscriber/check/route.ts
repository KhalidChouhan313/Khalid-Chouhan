import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Subscriber from "@/models/Subscribe";


export const GET = async (req: NextRequest) => {
    const email = req.cookies.get("subscribed_email")?.value;

    if (!email) {
        return NextResponse.json({ subscribed: false });
    }

    try {
        await connectDB();
        const existing = await Subscriber.findOne({ email });
        return NextResponse.json({ subscribed: !!existing });
    } catch (error) {
        console.error("Subscriber check Error:", error);
        return NextResponse.json({ subscribed: false }, { status: 500 });
    }
};
