"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/layout/TranslationProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const galleryImages = [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503951914875-befca74afaee?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634302086887-13b56dd9091f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
];

export function Gallery() {
    const t = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Triple the array to create an infinite loop illusion
    const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages];

    // Initialize scroll position to the middle set
    useEffect(() => {
        if (scrollRef.current) {
            const { scrollWidth } = scrollRef.current;
            const oneSetWidth = scrollWidth / 3;
            // Center the scroll view on the middle set
            scrollRef.current.scrollLeft = oneSetWidth;
        }
    }, []);

    // Handle Infinite Scroll Teleportation
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const oneSetWidth = scrollWidth / 3;

            // If we've scrolled past the first set (entirely into the third set), jump back to middle
            if (scrollLeft >= oneSetWidth * 2) {
                scrollRef.current.scrollLeft = scrollLeft - oneSetWidth;
            }
            // If we're at the very start (first set), jump forward to middle
            else if (scrollLeft <= 0) {
                scrollRef.current.scrollLeft = scrollLeft + oneSetWidth;
            }
        }
    };

    // Center scroll on mount
    const hasCentered = useRef(false);

    useEffect(() => {
        if (scrollRef.current && !hasCentered.current) {
            const oneSetWidth = scrollRef.current.scrollWidth / 3;
            scrollRef.current.scrollLeft = oneSetWidth; // Center to the second set
            hasCentered.current = true;
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300; // Adjusted for smaller cards
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    return (
        <section id="gallery" className="py-12 bg-white relative group/section">
            <div className="container mx-auto px-6 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* Compact Header */}
                    <h2 className="text-3xl md:text-4xl font-sans font-black text-black mb-1 uppercase tracking-tighter">
                        {t.gallery.title}
                    </h2>
                    <p className="text-zinc-500 font-medium text-sm">
                        {t.gallery.subtitle}
                    </p>
                </motion.div>
            </div>

            {/* Scrollable Container */}
            <div className="relative container mx-auto px-6">

                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors items-center justify-center text-black"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors items-center justify-center text-black"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Mobile Arrows */}
                <button onClick={() => scroll("left")} className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 border border-black/10 rounded-full shadow-sm text-black">
                    <ChevronLeft />
                </button>
                <button onClick={() => scroll("right")} className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 border border-black/10 rounded-full shadow-sm text-black">
                    <ChevronRight />
                </button>

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {infiniteImages.map((src, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 relative w-[220px] h-[320px] md:w-[260px] md:h-[380px] bg-zinc-100 rounded-sm overflow-hidden snap-center group select-none"
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={src}
                                alt={`Celebrity ${(index % galleryImages.length) + 1}`}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                sizes="(max-width: 768px) 220px, 260px"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-4">
                <button className="px-8 py-3 bg-black text-white font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300 rounded-full">
                    {t.gallery.view_all}
                </button>
            </div>
        </section>
    );
}
