import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Roboto,
  Short_Stack,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Pagination from "@/components/layout/Pagination/pagination";
import { ToastContainer, toast } from "react-toastify";
import Footer from "@/components/layout/footer/Footer";

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
        <Header />
        <ToastContainer theme="dark" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
