"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/components/layout/TranslationProvider";
import { ArrowDown } from "lucide-react";
import { PriceList } from "@/components/sections/PriceList";
import { useParams } from "next/navigation";

export function Hero() {
    const t = useTranslation();
    const { lang } = useParams();
    const [serviceIndex, setServiceIndex] = useState(0);
    const [isPriceListOpen, setIsPriceListOpen] = useState(false);

    const handleWhatsApp = () => {
        const message = lang === "tr" 
            ? "Merhaba, randevu almak istiyorum." 
            : "Hello, I would like to make an appointment.";
        window.open(`https://wa.me/905332833103?text=${encodeURIComponent(message)}`, "_blank");
    };

    // Dynamic services loop
    useEffect(() => {
        const interval = setInterval(() => {
            setServiceIndex((prev) => (prev + 1) % t.hero.dynamic_services.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, [t.hero.dynamic_services.length]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay darkening */}

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    {/* Fallback for older browsers */}
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Optional Logo or Icon at top */}
                    {/* <div className="w-24 h-24 bg-white/10 rounded-full mb-8 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <span className="text-3xl font-serif text-premium-gold">B</span>
                    </div> */}

                    <h1 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter mb-2 shadow-black drop-shadow-lg leading-none">
                        {t.hero.title}
                    </h1>

                    {/* Dynamic Text Animation */}
                    <div className="h-20 overflow-hidden mb-12 flex items-center justify-center relative w-full">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={serviceIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-2xl md:text-4xl text-white/90 font-light tracking-wide absolute"
                            >
                                {t.hero.dynamic_services[serviceIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Three Buttons Grid */}
                    <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-center justify-center">
                        <motion.button
                            onClick={() => setIsPriceListOpen(true)}
                            whileHover={{ scale: 1.05, borderColor: "#D4AF37", color: "#D4AF37" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full md:w-auto px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-[0.1em] transition-all duration-300 min-w-[220px]"
                        >
                            {t.hero.cta_locations}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, borderColor: "#D4AF37", color: "#D4AF37" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full md:w-auto px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-[0.1em] transition-all duration-300 min-w-[220px]"
                        >
                            {t.hero.cta_gallery}
                        </motion.button>

                        <motion.button
                            onClick={handleWhatsApp}
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full md:w-auto px-8 py-4 border border-premium-gold bg-premium-gold text-premium-dark font-bold uppercase tracking-[0.1em] transition-all duration-300 min-w-[220px]"
                        >
                            {t.hero.cta}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer hover:text-white transition-colors"
                onClick={() => {
                    const services = document.getElementById('services');
                    services?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <ArrowDown className="w-8 h-8" />
            </motion.div>

            <PriceList isOpen={isPriceListOpen} onClose={() => setIsPriceListOpen(false)} />
        </section>
    );
}
