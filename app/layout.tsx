import ClientLayout from "@/components/layout/ClientLayout";
import Footer from "@/components/layout/footer/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-short-stack",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative  antialiased`}
      >
        <Providers>
          <ClientLayout>{children}</ClientLayout>
          <ToastContainer theme="dark" />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
