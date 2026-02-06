"use client";

import { useRef } from "react";
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

    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="py-32 bg-premium-dark relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Image Side */}
                <div className="relative h-[600px] w-full rounded-lg overflow-hidden md:order-1 order-2">
                    <div ref={imageRef} className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                        {/* Placeholder for About Image */}
                        <span className="text-white/20 text-4xl font-serif">Image Placeholder</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    {/* Border frame */}
                    <div className="absolute inset-4 border border-white/10 pointer-events-none" />
                </div>

                {/* Text Side */}
                <div ref={textRef} className="md:order-2 order-1">
                    <span className="block text-premium-gold text-sm tracking-[0.2em] mb-4 uppercase">
                        Our Story
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                        {t.about.title}
                    </h2>
                    <p className="text-xl text-zinc-400 font-light leading-relaxed mb-8 text-balance">
                        {t.about.desc}
                    </p>
                    <p className="text-zinc-500 font-light leading-relaxed mb-10">
                        We believe that the barbershop is more than just a place to get a haircut; it's a sanctuary for the modern gentleman. A place where tradition meets innovation, and where every service is a ritual.
                    </p>
                    <button className="px-8 py-3 border-b border-premium-gold text-premium-gold hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm pb-1">
                        Read Full Story
                    </button>
                </div>
            </div>
        </section>
    );
}
