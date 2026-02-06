"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 4500);
        return () => clearTimeout(timer);
    }, []);

    const word = "BARBERRCUTS";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
                >
                    {/* Derinlik katan soft ışık */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_60%)]" />

                    <motion.div 
                        // Expansion: Çok genişten ideale daralma
                        initial={{ letterSpacing: "2.5em", opacity: 0, filter: "blur(25px)" }}
                        animate={{ letterSpacing: "0.4em", opacity: 1, filter: "blur(0px)" }}
                        transition={{ 
                            duration: 3, 
                            ease: [0.22, 1, 0.36, 1] 
                        }}
                        // Fontu büyüttüm (text-5xl -> text-6xl) ve rengi kırdım
                        className="relative z-10 flex text-[#d1d1d1] text-5xl md:text-7xl font-serif font-medium tracking-[0.4em] uppercase"
                    >
                        {word.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: Math.random() * 1.2 + 0.3, // Daha organik, yavaş bir belirme
                                    duration: 1.5
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Final geçişi için karanlık katman */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5, duration: 0.8 }}
                        className="absolute inset-0 z-20 bg-black pointer-events-none"
                        style={{ mixBlendMode: 'multiply' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}