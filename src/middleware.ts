import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "tr"];
const defaultLocale = "tr";

// Get the preferred locale, similar to the strategy found in Next.js docs
function getLocale(request: NextRequest) {
    const acceptLanguage = request.headers.get("accept-language");
    if (!acceptLanguage) return defaultLocale;

    // Simple check for now
    if (acceptLanguage.includes("en")) return "en";
    return "tr";
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|favicon.ico|api|.*\\..*).*)',
    ],
};
