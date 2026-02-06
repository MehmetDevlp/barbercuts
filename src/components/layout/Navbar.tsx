"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, CheckCheck, Instagram, Facebook, Youtube } from "lucide-react"; // Added icons
import { cn } from "@/utils/cn";
import { useTranslation } from "@/components/layout/TranslationProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Locale } from "@/utils/i18n";

export function Navbar() {
    const { lang } = useParams() as { lang: Locale };
    const t = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Explicit branding links based on user request
    const navLinks = [
        { name: t.nav.home, href: `/${lang}` },
        { name: t.nav.locations, href: `/${lang}#locations` }, // Branches
        { name: t.nav.gallery, href: `/${lang}#gallery` },
        { name: t.nav.about, href: `/${lang}#about` },
        { name: t.nav.contact, href: `/${lang}#contact` },
    ];

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/5"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo - Left */}
                    <Link href={`/${lang}`} className="relative z-50 group">
                        <span className="text-3xl font-serif font-bold text-white tracking-tighter group-hover:text-premium-gold transition-colors">
                            BARBER<span className="text-premium-gold">CUTS</span>
                        </span>
                    </Link>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6">
                        {/* Language Switcher - Minimal */}
                        <div className="hidden md:block">
                            <LanguageSwitcher />
                        </div>

                        {/* Hamburger Button (Always Visible) */}
                        <button
                            className="flex items-center gap-3 group focus:outline-none"
                            onClick={() => setIsOpen(true)}
                        >
                            <span className="text-white text-sm font-bold tracking-widest hidden md:block group-hover:text-premium-gold transition-colors">
                                {t.nav.menu_title}
                            </span>
                            <div className="p-2 bg-white/10 rounded-full group-hover:bg-premium-gold group-hover:text-black transition-colors duration-300">
                                <Menu className="w-6 h-6 text-white group-hover:text-black" />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Fullscreen Overlay Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    >
                        {/* Drawer Container */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="absolute inset-y-0 right-0 w-full md:w-[600px] bg-zinc-900 border-l border-white/10 shadow-2xl flex flex-col"
                        >
                            {/* Header inside Drawer */}
                            <div className="p-6 flex items-center justify-between border-b border-white/5">
                                <span className="text-premium-gold tracking-widest text-sm uppercase">
                                    {t.nav.menu_title}
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col gap-12">

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-4xl md:text-5xl font-serif font-bold text-white hover:text-premium-gold hover:pl-4 transition-all duration-300 block"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <div className="w-full h-px bg-white/10" />

                                {/* Extra Information Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Call Center */}
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                                                {t.nav.call_center}
                                            </p>
                                            <p className="text-xl text-white font-bold group-hover:text-premium-gold transition-colors">
                                                0850 703 58 84
                                            </p>
                                        </div>
                                    </div>

                                    {/* Whatsapp */}
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckCheck className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                                                {t.nav.whatsapp}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-green-400 font-bold">
                                                    • {t.nav.online}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media & Follow Us */}
                                <div>
                                    <p className="text-center text-premium-gold text-sm tracking-[0.2em] mb-6 uppercase">
                                        {t.nav.follow_us}
                                    </p>
                                    <div className="flex justify-center gap-8">
                                        <a href="#" className="text-white hover:text-premium-gold transition-colors">
                                            <Instagram className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-white hover:text-premium-gold transition-colors">
                                            <Facebook className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-white hover:text-premium-gold transition-colors">
                                            <Youtube className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
