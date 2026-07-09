"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function TestimonialsPage() {
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        router.replace(`/${locale}/PortfolioEmployee/homeemployee`);
    }, [locale, router]);

    return null;
}
