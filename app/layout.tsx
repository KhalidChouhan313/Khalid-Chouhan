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
  title: {
    default: "Khalid Chouhan | Full Stack Web Developer Portfolio",
    template: "%s | Khalid Chouhan",
  },
  description:
    "Official portfolio of Khalid Chouhan, a Full Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies. Explore projects, skills, and contact information.",

  keywords: [
    "Khalid Chouhan",
    "Khalid Chouhan developer",
    "Khalid Chouhan portfolio",
    "Full Stack Developer Khalid Chouhan",
    "Khalid Chouhan web developer",
    "Full Stack Developer Pakistan",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Backend Developer",
    "Frontend Developer",
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
    images: [
      {
        url: introProfile,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },


  twitter: {
    card: "summary_large_image",
    title: "Khalid Chouhan | Full Stack Developer",
    description: "Explore portfolio, projects, and skills.",
    images: [introProfile],
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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
              alternateName: "Khalid Chouhan",
              url: "https://khalid-chouhan.vercel.app",
              jobTitle: "Full Stack Developer",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Pakistan",
              },
              sameAs: [
                "https://github.com/KhalidChouhan313",
                "https://www.linkedin.com/in/muhammad-khalid-chouhan-68b24738b/",
                "https://x.com/Mkhalidcho8520M"

              ],
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "JavaScript",
                "Full Stack Development",
                "Web Development",
                "Frontend Development",
                "Backend Development",

              ],

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
