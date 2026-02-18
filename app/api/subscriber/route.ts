import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/api/db";
import nodemailer from "nodemailer";
import Subscriber from "@/models/Subscribe";

export const POST = async (req: NextRequest) => {
    try {
        await connectDB
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" },
                { status: 400 })
        }
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { success: false, message: "Already subscribed" },
                { status: 400 }
            );
        }
        await Subscriber.create({ email });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Subscribed Successfully 🎉",
            html: `
  <div style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <tr>
        <td style="background-color:#0d9488; padding:30px; text-align:center;">
          <h1 style="margin:0; color:#ffffff; font-size:24px;">Welcome 🎉</h1>
        </td>
      </tr>

      <tr>
        <td style="padding:30px; text-align:center;">
          <h2 style="margin:0 0 15px; color:#0f172a; font-size:20px;">
            Thank you for subscribing!
          </h2>
          <p style="margin:0 0 25px; color:#475569; font-size:15px; line-height:1.6;">
            You are now part of our community.  
            Stay tuned for the latest blog posts, updates and exclusive content.
          </p>

          <a href="${process.env.NEXT_PUBLIC_BASE_URL}"
            style="display:inline-block; padding:12px 25px; background-color:#0d9488; color:#ffffff; text-decoration:none; border-radius:6px; font-size:14px; font-weight:bold;">
            Visit Website
          </a>
        </td>
      </tr>

      <tr>
        <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#64748b;">
          © ${new Date().getFullYear()} MUHAMMAD KAHLID CHOUHAN . All rights reserved.
        </td>
      </tr>

    </table>
  </div>
  `,
        });

        return NextResponse.json({
            success: true,
            message: "Subscribed successfully",
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false, error: "somthing gone wrong while subscribing"
            },
            { status: 500 }
        )
    }
}