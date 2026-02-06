"use client";

import React, { createContext, useContext } from "react";
import type { Dictionary } from "@/utils/i18n";

const TranslationContext = createContext<Dictionary>({} as Dictionary);

export function TranslationProvider({
    children,
    dictionary,
}: {
    children: React.ReactNode;
    dictionary: Dictionary;
}) {
    return (
        <TranslationContext.Provider value={dictionary}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
}
