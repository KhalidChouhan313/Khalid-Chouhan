import ClientLayout from "@/components/layout/ClientLayout";
import Footer from "@/components/layout/footer/Footer";
import GoogleAnalyticsTracker from "@/components/layout/GoogleAnalyticsTracker";
import { introProfile } from "@/Utils/BaseUrl";
import { FULL_NAME, SITE_DESCRIPTION, SITE_URL, rootSchema } from "@/lib/seo";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Providers from "./providers";
import ScrollProgress from "@/components/common/ScrollProgress";
import AnimatedBackground from "@/components/animations/Animatedbackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Khalid Chouhan | Full Stack Developer",
    template: "%s | Khalid Chouhan",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Khalid Chouhan | Full Stack Developer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Khalid Chouhan Portfolio",
    locale: "en_US",
    images: [{ url: introProfile, width: 512, height: 512, alt: "Khalid Chouhan — Full Stack Developer" }],
    type: "profile",
    firstName: "Muhammad Khalid",
    lastName: "Chouhan",
  },
  twitter: {
    card: "summary",
    site: "@Mkhalidcho8520M",
    creator: "@Mkhalidcho8520M",
    title: "Khalid Chouhan | Full Stack Developer",
    description: SITE_DESCRIPTION,
    images: [introProfile],
  },
  icons: {
    icon: introProfile,
    apple: introProfile,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro-seen"))document.documentElement.dataset.introSeen="1";else sessionStorage.setItem("intro-seen","1")}catch(e){}`,
          }}
        />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} relative antialiased bg-bg-base text-[#f5f3f0]`}
      >
        <AnimatedBackground />
        <div id="scroll-progress" />
        <ScrollProgress />
        <Providers>
          <GoogleAnalyticsTracker />

          <ClientLayout>{children}</ClientLayout>
          <Footer />
          <ToastContainer theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
