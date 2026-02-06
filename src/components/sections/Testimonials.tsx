"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import { useTranslation } from "@/components/layout/TranslationProvider";

export function Testimonials() {
    const t = useTranslation();

    return (
        <section className="py-24 bg-premium-dark relative overflow-hidden text-white">
            <div className="container mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                            {t.testimonials?.title || "Müşteri Yorumları"}
                        </h2>
                        <div className="w-20 h-1 bg-premium-gold mx-auto mb-6" />
                        <p className="text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
                            {t.testimonials?.subtitle || "Misafirlerimizin deneyimleri bizim için en büyük referanstır. Google üzerindeki gerçek yorumlarımız."}
                        </p>
                    </motion.div>
                </div>

                {/* Elfsight Google Reviews Widget */}
                <div className="min-h-[400px]">
                    <div 
                        className="elfsight-app-b9d7a967-6473-4087-a15c-de2a7a1c6d8f" 
                        data-elfsight-app-lazy
                    ></div>
                </div>
            </div>

            {/* Load Elfsight Platform Script */}
            <Script 
                src="https://elfsightcdn.com/platform.js" 
                strategy="lazyOnload" 
            />
        </section>
    );
}
