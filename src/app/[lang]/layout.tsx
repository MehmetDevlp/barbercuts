import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { getDictionary, Locale } from "@/utils/i18n";
import { TranslationProvider } from "@/components/layout/TranslationProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import IntroAnimation from "@/components/layout/IntroAnimation";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barber Cuts | Premium Grooming",
  description: "Experience the art of classic grooming.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <TranslationProvider dictionary={dictionary}>
          <IntroAnimation />
          <Navbar />
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
