"use client";

import { useTranslation } from "@/components/layout/TranslationProvider";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import Image from "next/image";

export function Locations() {
    const t = useTranslation();

    const mapLink = "https://maps.app.goo.gl/XX"; // Gerçek linki buraya koyabilirsiniz veya aşağıda dinamik oluşturulabilir
    const phoneLink = "tel:05332833103";

    return (
        <section id="locations" className="py-24 bg-zinc-50 relative overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-premium-gold tracking-widest text-sm uppercase font-bold">
                        {t.locations?.title || "ŞUBELERİMİZ"}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mt-4 mb-4">
                        {t.locations?.subtitle || "Bize Ulaşın"}
                    </h2>
                    <div className="w-20 h-1 bg-black mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
                    
                    {/* Left Side: Branch Info & Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 flex flex-col h-full z-10 relative"
                    >
                        {/* Branch Image */}
                        <div className="relative h-64 w-full mb-8 rounded-sm overflow-hidden group">
                            <Image 
                                src="https://images.unsplash.com/photo-1503951914875-befca74afaee?q=80&w=1200&auto=format&fit=crop" 
                                alt="Barbercuts Antalya Branch"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>

                        <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 text-black !text-black" style={{ color: 'black' }}>
                            <MapPin className="text-premium-gold w-6 h-6" />
                            {t.locations?.branch_name}
                        </h3>

                        <div className="space-y-6 flex-grow">
                            <div className="flex items-start gap-4">
                                <Navigation className="w-5 h-5 text-zinc-400 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                                        {t.locations?.address_label}
                                    </p>
                                    <a 
                                        href="https://maps.google.com/?q=Siteler,+Uncalı+Cd.+Erenköy+Sitesi+No:11+B+Dükkan,+07100+Konyaaltı/Antalya" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-zinc-700 leading-relaxed hover:text-premium-gold transition-colors block"
                                    >
                                        {t.locations?.address_value}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-5 h-5 text-zinc-400 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                                        {t.locations?.phone_label}
                                    </p>
                                    <a 
                                        href={phoneLink}
                                        className="text-zinc-700 font-medium hover:text-premium-gold transition-colors block"
                                    >
                                        0533 283 31 03
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="w-5 h-5 text-zinc-400 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                                        {t.locations?.hours_label}
                                    </p>
                                    <p className="text-zinc-700">
                                        {t.locations?.hours_value}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a 
                            href="https://maps.google.com/?q=Siteler,+Uncalı+Cd.+Erenköy+Sitesi+No:11+B+Dükkan,+07100+Konyaaltı/Antalya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-premium-gold hover:text-black transition-all text-center flex items-center justify-center gap-2 group"
                        >
                            <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                            {t.locations?.get_directions}
                        </a>
                    </motion.div>

                    {/* Right Side: Google Map Embed */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="h-[500px] lg:h-auto w-full bg-zinc-200 relative min-h-[500px]"
                    >
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d30.635833!3d36.886389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c391d7e8e8e8e9%3A0x8e8e8e8e8e8e8e8e!2sBarbercuts%20Antalya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                            title="Barbercuts Antalya Location"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
