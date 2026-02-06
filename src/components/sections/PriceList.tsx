"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/components/layout/TranslationProvider";
import { useParams } from "next/navigation";

interface PriceListProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PriceList({ isOpen, onClose }: PriceListProps) {
  const t = useTranslation();
  const { lang } = useParams();
  // Using 'any' here temporarily to bypass strict type checking until types are fully regenerated,
  // but at runtime 't.price_list' will be available from the updated JSONs.
  const { title, categories, footer_text, book_button } = (t as any).price_list;

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Set default open category when data loads or component mounts
  useEffect(() => {
    if (categories && categories.length > 0) {
        setOpenCategory(categories[0].title);
    }
  }, [categories]);

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const toggleCategory = (catTitle: string) => {
    setOpenCategory(openCategory === catTitle ? null : catTitle);
  };

  const handleWhatsApp = () => {
    const message = lang === "tr" 
        ? "Merhaba, randevu almak istiyorum." 
        : "Hello, I would like to make an appointment.";
    window.open(`https://wa.me/905332833103?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 shadow-2xl overflow-hidden rounded-lg max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="relative z-10 p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
                <h2 className="text-2xl font-serif text-[#D4AF37] tracking-wider">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-white/50 hover:text-white transition-colors duration-200"
                >
                  <X size={24} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="space-y-4">
                {categories.map((category: any, idx: number) => (
                  <div key={idx} className="border border-white/5 rounded-md overflow-hidden bg-[#111]">
                    <button
                      onClick={() => toggleCategory(category.title)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors duration-200"
                    >
                      <h3 className={`text-lg font-bold uppercase tracking-wide transition-colors ${openCategory === category.title ? 'text-[#D4AF37]' : 'text-white'}`}>
                        {category.title}
                      </h3>
                      {openCategory === category.title ? (
                        <ChevronUp className="text-[#D4AF37]" size={20} />
                      ) : (
                        <ChevronDown className="text-white/50" size={20} />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {openCategory === category.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="p-4 pt-0 border-t border-dashed border-white/10">
                            <ul className="space-y-3 mt-4">
                              {category.services.map((service: any, sIdx: number) => (
                                <li 
                                  key={sIdx}
                                  className="flex items-end justify-between text-white/80 hover:text-white transition-colors duration-200"
                                >
                                  <span className="text-base font-medium">{service.name}</span>
                                  <span className="flex-grow mx-4 border-b border-dotted border-white/10 mb-1.5"></span>
                                  <span className="font-bold text-[#D4AF37]">{service.price}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer Section */}
              <div className="mt-8 text-center space-y-4 pt-6 border-t border-white/5">
                <p className="text-white text-base font-medium">
                  {footer_text}
                </p>
                <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center justify-center px-8 py-3 bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold uppercase tracking-wider text-sm transition-all duration-300 rounded-sm w-full md:w-auto"
                >
                    {book_button}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
