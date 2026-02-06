"use client";

import { useTranslation } from "@/components/layout/TranslationProvider";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const socialImages = [
    "https://images.unsplash.com/photo-1599351431202-6e0005a7837f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503951914875-befca74afaee?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512690459411-b9245aed8ad5?q=80&w=800&auto=format&fit=crop"
];

export function CTA() {
    const t = useTranslation();

    return (
        <section className="py-24 bg-white text-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full mb-6">
                        <Instagram className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-widest uppercase">Instagram</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        {t.cta.title}
                    </h2>
                    <p className="text-zinc-500 font-medium text-lg">
                        {t.cta.subtitle || "@barbercuts_antalya"}
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {socialImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="aspect-square relative group overflow-hidden bg-zinc-100 rounded-sm cursor-pointer"
                        >
                            <Image 
                                src={src}
                                alt={`Instagram post ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <Instagram className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-8 h-8" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Button */}
                <div className="text-center">
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-black text-white font-bold text-lg uppercase tracking-widest hover:bg-zinc-800 hover:scale-105 transition-all duration-300 rounded-sm group"
                    >
                        <span>{t.cta.button}</span>
                        <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
