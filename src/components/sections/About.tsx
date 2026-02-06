"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/components/layout/TranslationProvider";

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const t = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const tickerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Parallax effect for image
        gsap.fromTo(imageRef.current,
            { y: 50 },
            {
                y: -50,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1.5,
                }
            }
        );

        // Fade up reveal for text
        gsap.fromTo(textRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
        
        // Infinite ticker animation
        if (tickerRef.current) {
             const totalWidth = tickerRef.current.scrollWidth;
             // We have 4 sets of items. We want to move by 1 set's width to loop? 
             // Or move by half (2 sets). If we move by half, we reset to 0.
             // Since we have 4 sets, moving by 50% (2 sets) is safe.
             
             gsap.to(tickerRef.current, {
                 x: -totalWidth / 2,
                 duration: 40,
                 ease: "none",
                 repeat: -1,
                 overwrite: true, // Ensure no conflicts
             });
        }

    }, { scope: containerRef });

    // Fallback if ticker_items is not in json yet
    const tickerItems = (t.about as any).ticker_items || [
        "GÜVENİLİRLİK", "KALİTE", "MEMNUNİYET", "PROFESYONEL EKİP", "TECRÜBE"
    ];

    // 4x duplication to ensure seamless loop on wide screens
    const infiniteTickerItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]; 

    return (
        <section id="about" ref={containerRef} className="py-32 bg-premium-dark relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Image Side */}
                <div className="relative w-full rounded-lg overflow-hidden md:order-1 order-2">
                     <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
                        <div ref={imageRef} className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                            {/* Placeholder for About Image */}
                            <span className="text-white/20 text-4xl font-serif">Image Placeholder</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        {/* Border frame */}
                        <div className="absolute inset-4 border border-white/10 pointer-events-none" />
                    </div>
                </div>

                {/* Text Side */}
                <div ref={textRef} className="md:order-2 order-1">
                    <span className="block text-premium-gold text-sm tracking-[0.2em] mb-4 uppercase">
                        {t.about.story_title || "Mirasımız"}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                        {t.about.title}
                    </h2>
                    <p className="text-xl text-zinc-400 font-light leading-relaxed mb-8 text-balance">
                        {t.about.desc}
                    </p>
                    <p className="text-zinc-500 font-light leading-relaxed mb-10">
                        {t.about.long_desc || "Berber dükkanının sadece saç kesilen bir yer değil, modern beyefendiler için bir sığınak olduğuna inanıyoruz. Geleneğin inovasyonla buluştuğu ve her hizmetin bir ritüele dönüştüğü yer."}
                    </p>
                    <button className="px-8 py-3 border-b border-premium-gold text-premium-gold hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm pb-1">
                        {t.about.read_more || "Devamını Oku"}
                    </button>
                </div>
            </div>

            {/* Full Width Infinite Ticker */}
            <div className="w-full relative py-10 mt-20 border-t border-b border-white/10 bg-premium-dark overflow-hidden">
                <div ref={tickerRef} className="flex whitespace-nowrap w-max">
                    {infiniteTickerItems.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-4 px-8 md:px-12">
                            <span className="text-premium-gold text-xs">•</span>
                            <span className="text-white/50 font-serif text-xl md:text-2xl tracking-[0.2em] uppercase italic whitespace-nowrap">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
