"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const w = window as any;
        if (w.gtag) {
            w.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
                page_path: pathname,
            });
        }
    }, [pathname]);

    return null;
}