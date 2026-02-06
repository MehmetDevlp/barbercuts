"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { cn } from "@/utils/cn";

// Lazy load the heavy 3D scene
const Scene = dynamic(() => import("./Scene"), {
    loading: () => <SceneFallback />,
    ssr: false, // 3D usually client-only
});

function SceneFallback() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-xl animate-pulse">
            <span className="text-zinc-700 text-sm tracking-widest uppercase">
                Loading Assets...
            </span>
        </div>
    );
}

interface CanvasContainerProps {
    className?: string;
}

export default function CanvasContainer({ className }: CanvasContainerProps) {
    return (
        <div className={cn("relative w-full h-[500px] md:h-[600px]", className)}>
            <Suspense fallback={<SceneFallback />}>
                <Scene />
            </Suspense>
        </div>
    );
}
