"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/utils/i18n";
import { useTranslation } from "@/components/layout/TranslationProvider";
import { Instagram } from "lucide-react";

// TikTok icon as a custom component since it might not be in the current lucide version or we want a specific style
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export function Footer() {
    const { lang } = useParams() as { lang: Locale };
    const t = useTranslation();

    return (
        <footer className="bg-premium-dark border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href={`/${lang}`} className="inline-block mb-6">
                            <span className="text-3xl font-serif font-bold text-white tracking-tighter">
                                BARBER<span className="text-premium-gold">CUTS</span>
                            </span>
                        </Link>
                        <p className="text-zinc-400 max-w-sm font-light">
                            {t.about.desc}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-6">Menu</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={`/${lang}`} className="text-zinc-400 hover:text-premium-gold transition-colors">
                                    {t.nav.home}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}#services`} className="text-zinc-400 hover:text-premium-gold transition-colors">
                                    {t.nav.services}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}#about`} className="text-zinc-400 hover:text-premium-gold transition-colors">
                                    {t.nav.about}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}#locations`} className="text-zinc-400 hover:text-premium-gold transition-colors">
                                    {t.nav.contact || "İletişim"}
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-400 hover:text-premium-gold transition-colors cursor-not-allowed opacity-70">
                                    {t.nav.prices || "Fiyat Listesi"}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-6">
                            {t.nav.social || "SOSYAL MEDYA"}
                        </h4>
                        <span className="text-xs text-zinc-600 uppercase tracking-widest font-bold mb-4 block">
                            {t.nav.follow_hint || "Bizi takip edin"}
                        </span>
                        <ul className="space-y-4">
                            <li>
                                <a 
                                    href="https://www.instagram.com/barberrcutss" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-zinc-400 hover:text-premium-gold transition-colors group"
                                >
                                    <div className="p-2 bg-zinc-800 rounded-full group-hover:bg-premium-gold group-hover:text-black transition-colors">
                                        <Instagram className="w-4 h-4" />
                                    </div>
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://www.tiktok.com/@fatiih007" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-zinc-400 hover:text-premium-gold transition-colors group"
                                >
                                    <div className="p-2 bg-zinc-800 rounded-full group-hover:bg-premium-gold group-hover:text-black transition-colors">
                                        <TikTokIcon className="w-4 h-4" />
                                    </div>
                                    <span>TikTok</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p>&copy; {new Date().getFullYear()} BarberCuts. {t.footer?.rights || "All rights reserved."}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
                        <span className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                            {t.footer?.made_by || "Designed by"} <a href="https://www.instagram.com/meehmetocak" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-premium-gold font-medium">Mehmet Ocak</a>
                        </span>
                        <div className="hidden md:flex gap-6 border-l border-zinc-800 pl-6 ml-2">
                            <span className="cursor-pointer hover:text-zinc-400 transition-colors">{t.footer?.privacy || "Privacy Policy"}</span>
                            <span className="cursor-pointer hover:text-zinc-400 transition-colors">{t.footer?.terms || "Terms of Service"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
