"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/components/layout/TranslationProvider";
import { cn } from "@/utils/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslation();

    const handleLanguageChange = (locale: string) => {
        if (!pathname) return;
        const segments = pathname.split("/");
        // pathname starts with / so segments[0] is empty, segments[1] is locale
        segments[1] = locale;
        const newPath = segments.join("/");
        router.push(newPath);
    };

    const currentLocale = pathname?.split("/")[1] || "tr";

    return (
        <div className={cn("flex gap-2 text-sm font-medium", className)}>
            <button
                onClick={() => handleLanguageChange("tr")}
                className={cn(
                    "transition-opacity hover:opacity-100",
                    currentLocale === "tr" ? "opacity-100 text-premium-gold" : "opacity-50"
                )}
            >
                TR
            </button>
            <span className="opacity-30">|</span>
            <button
                onClick={() => handleLanguageChange("en")}
                className={cn(
                    "transition-opacity hover:opacity-100",
                    currentLocale === "en" ? "opacity-100 text-premium-gold" : "opacity-50"
                )}
            >
                EN
            </button>
        </div>
    );
}
