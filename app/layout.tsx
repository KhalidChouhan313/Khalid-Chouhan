import ClientLayout from "@/components/layout/ClientLayout";
import Footer from "@/components/layout/footer/Footer";
import GoogleAnalyticsTracker from "@/components/layout/GoogleAnalyticsTracker";
import { introProfile } from "@/Utils/BaseUrl";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Khalid Chouhan | Full Stack Web Developer Portfolio",
  description:
    "Official portfolio of Khalid Chouhan, a Full Stack Web Developer. Explore projects, skills, experience, and contact information.",

  keywords: [
    "Khalid Chouhan",
    "Khalid Chouhan developer",
    "Khalid Chouhan portfolio",
    "Full Stack Developer Khalid Chouhan",
    "Khalid Chouhan web developer",
  ],

  authors: [{ name: "Khalid Chouhan" }],

  creator: "Khalid Chouhan",

  metadataBase: new URL("https://khalid-chouhan.vercel.app"),

  openGraph: {
    title: "Khalid Chouhan | Full Stack Developer",
    description:
      "Portfolio of Khalid Chouhan showcasing web development projects, skills and experience.",
    url: "https://khalid-chouhan.vercel.app",
    siteName: "Khalid Chouhan Portfolio",
    type: "website",
  },

  icons: {
    icon: introProfile,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Khalid Chouhan",
              url: "https://khalid-chouhan.vercel.app",
              jobTitle: "Full Stack Developer",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Pakistan",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} relative  antialiased`}
      >
        <Providers>
         <GoogleAnalyticsTracker />

          <ClientLayout>{children}</ClientLayout>
          <ToastContainer theme="dark" />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
