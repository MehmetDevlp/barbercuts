"use client";

import { motion } from "framer-motion";
import { Scissors, Sun, User } from "lucide-react";
import { useTranslation } from "@/components/layout/TranslationProvider";

const icons = {
    haircut: Scissors,
    shave: Sun,
    styling: User,
};

export function Services() {
    const t = useTranslation();

    // Explicitly define keys to avoid "title" property collision
    type ServiceKey = "haircut" | "shave" | "styling";

    const services: { key: ServiceKey; icon: any }[] = [
        { key: "haircut", icon: icons.haircut },
        { key: "shave", icon: icons.shave },
        { key: "styling", icon: icons.styling },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="services" className="py-24 bg-black relative">
            {/* Background noise/texture could go here */}

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-premium-gold mb-4">
                        {t.services.title}
                    </h2>
                    <div className="w-24 h-1 bg-white/20 mx-auto" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {services.map((service) => {
                        const Icon = service.icon;
                        const serviceData = t.services[service.key];

                        return (
                            <motion.div
                                key={service.key}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="bg-premium-gray border border-white/5 p-8 rounded-lg group hover:border-premium-gold/30 transition-colors"
                            >
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 group-hover:bg-premium-gold transition-colors duration-300">
                                    <Icon className="w-8 h-8 text-premium-gold group-hover:text-premium-dark transition-colors duration-300" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                                    {serviceData.title}
                                </h3>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    {serviceData.desc}
                                </p>
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-sm text-premium-gold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>View Details</span>
                                    <span>→</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
