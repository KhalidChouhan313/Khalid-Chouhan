import nodemailer from "nodemailer";

export const sendEmail = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"From Portfolio " <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New  Message From Portfolio",
    html: `
  <div style="
    background-color:#f3f4f6;
    padding:40px 16px;
    font-family:Arial, Helvetica, sans-serif;
  ">
    <div style="
      max-width:600px;
      margin:0 auto;
      background-color:#ffffff;
      border-radius:8px;
      overflow:hidden;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);
    ">

      <div style="
        background-color:#4f46e5;
        color:#ffffff;
        text-align:center;
        padding:16px;
      ">
        <h2 style="
          margin:0;
          font-size:20px;
          font-weight:600;
        ">
          New  Message
        </h2>
      </div>

      <!-- Body -->
      <div style="
        padding:24px;
        color:#1f2937;
      ">
        <div style="margin-bottom:16px;">
          <p style="
            margin:0;
           font-size:16px;
            color:#6b7280;
            font-weight:800;
          ">
            Name
          </p>
          <p style="
            margin:4px 0 0;
            font-size:14px;
            font-weight:500;
          ">
            ${name}
          </p>
        </div>

        <div style="margin-bottom:16px;">
          <p style="
            margin:0;
            font-size:16px;
            color:#6b7280;
            font-weight:800;
          ">
            Email
          </p>
          <p style="
            margin:4px 0 0;
            font-size:14px;
            font-weight:500;
          ">
            ${email}
          </p>
        </div>

        <div>
          <p style="
            margin:0 0 6px;
           font-size:16px;
            color:#6b7280;
            font-weight:800;
          ">
            Message
          </p>
          <div style="
            background-color:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:6px;
            padding:12px;
            font-size:13px;
            line-height:1.6;
            white-space:pre-line;
          ">
            ${message}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background-color:#f9fafb;
        text-align:center;
        font-size:11px;
        color:#9ca3af;
        padding:12px;
      ">
        This message was sent from your website contact form
      </div>

    </div>
  </div>
`,
  });
};
