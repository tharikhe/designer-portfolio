"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MagneticText } from "./morphing-cursor";
import { cn } from "@/lib/utils";

export type CardStackItem = {
    id: string | number;
    title: string;
    description?: string;
    imageSrc?: string;
    href?: string;
    ctaLabel?: string;
    tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
    items: T[];

    /** Selected index on mount */
    initialIndex?: number;

    /** How many cards are visible around the active (odd recommended) */
    maxVisible?: number;

    /** Card sizing */
    cardWidth?: number;
    cardHeight?: number;

    /** How much cards overlap each other (0..0.8). Higher = more overlap */
    overlap?: number;

    /** Total fan angle (deg). Higher = wider arc */
    spreadDeg?: number;

    /** 3D / depth feel */
    perspectivePx?: number;
    depthPx?: number;
    tiltXDeg?: number;

    /** Active emphasis */
    activeLiftPx?: number;
    activeScale?: number;
    inactiveScale?: number;

    /** Motion */
    springStiffness?: number;
    springDamping?: number;

    /** Behavior */
    loop?: boolean;
    autoAdvance?: boolean;
    intervalMs?: number;
    pauseOnHover?: boolean;

    /** UI */
    showDots?: boolean;
    className?: string;

    /** Hooks */
    onChangeIndex?: (index: number, item: T) => void;

    /** Custom renderer (optional) */
    renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
    if (len <= 0) return 0;
    return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
    const raw = i - active;
    if (!loop || len <= 1) return raw;

    // consider wrapped alternative
    const alt = raw > 0 ? raw - len : raw + len;
    return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
    items,
    initialIndex = 0,
    maxVisible = 7,

    cardWidth = 320, // Reduced default width for better fit
    cardHeight = 420, // Increased height for portrait/phone feel

    overlap = 0.48,
    spreadDeg = 48,

    perspectivePx = 1100,
    depthPx = 140,
    tiltXDeg = 12,

    activeLiftPx = 22,
    activeScale = 1.03,
    inactiveScale = 0.94,

    springStiffness = 280,
    springDamping = 28,

    loop = true,
    autoAdvance = true, // Default to true for dynamic feel
    intervalMs = 2800,
    pauseOnHover = true,

    showDots = true,
    className,

    onChangeIndex,
    renderCard,
}: CardStackProps<T>) {
    const reduceMotion = useReducedMotion();
    const len = items.length;

    const [active, setActive] = React.useState(() =>
        wrapIndex(initialIndex, len),
    );
    const [hovering, setHovering] = React.useState(false);

    // keep active in bounds if items change
    React.useEffect(() => {
        setActive((a) => wrapIndex(a, len));
    }, [len]);

    React.useEffect(() => {
        if (!len) return;
        onChangeIndex?.(active, items[active]!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

    const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

    const canGoPrev = loop || active > 0;
    const canGoNext = loop || active < len - 1;

    const prev = React.useCallback(() => {
        if (!len) return;
        if (!canGoPrev) return;
        setActive((a) => wrapIndex(a - 1, len));
    }, [canGoPrev, len]);

    const next = React.useCallback(() => {
        if (!len) return;
        if (!canGoNext) return;
        setActive((a) => wrapIndex(a + 1, len));
    }, [canGoNext, len]);

    // keyboard navigation (when container focused)
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    // autoplay
    React.useEffect(() => {
        if (!autoAdvance) return;
        if (reduceMotion) return;
        if (!len) return;
        if (pauseOnHover && hovering) return;

        const id = window.setInterval(
            () => {
                if (loop || active < len - 1) next();
            },
            Math.max(700, intervalMs),
        );

        return () => window.clearInterval(id);
    }, [
        autoAdvance,
        intervalMs,
        hovering,
        pauseOnHover,
        reduceMotion,
        len,
        loop,
        active,
        next,
    ]);

    if (!len) return null;

    // const activeItem = items[active]!;

    return (
        <div
            className={cn("w-full py-12", className)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* Stage */}
            <div
                className="relative w-full flex justify-center perspective-1000"
                style={{ height: Math.max(380, cardHeight + 80), perspective: `${perspectivePx}px` }}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {/* Background glow in palette theme (Red/Cream) */}
                <div
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[60%] rounded-full bg-red/10 blur-[80px]"
                    aria-hidden="true"
                />

                <div
                    className="relative w-full h-full flex items-center justify-center transform-style-3d"
                >
                    <AnimatePresence initial={false}>
                        {items.map((item, i) => {
                            const off = signedOffset(i, active, len, loop);
                            const abs = Math.abs(off);
                            const visible = abs <= maxOffset;

                            // hide far-away cards cleanly
                            if (!visible) return null;

                            // fan geometry
                            const rotateZ = off * stepDeg;
                            const x = off * cardSpacing;
                            const y = abs * 10; // subtle arc-down feel
                            const z = -abs * depthPx;

                            const isActive = off === 0;

                            const scale = isActive ? activeScale : inactiveScale;
                            const lift = isActive ? -activeLiftPx : 0;

                            const rotateX = isActive ? 0 : tiltXDeg;

                            const zIndex = 100 - abs;

                            // drag only on the active card
                            const dragProps = isActive
                                ? {
                                    drag: "x" as const,
                                    dragConstraints: { left: 0, right: 0 },
                                    dragElastic: 0.18,
                                    onDragEnd: (
                                        _e: any,
                                        info: { offset: { x: number }; velocity: { x: number } },
                                    ) => {
                                        if (reduceMotion) return;
                                        const travel = info.offset.x;
                                        const v = info.velocity.x;
                                        const threshold = Math.min(160, cardWidth * 0.22);

                                        // swipe logic
                                        if (travel > threshold || v > 650) prev();
                                        else if (travel < -threshold || v < -650) next();
                                    },
                                }
                                : {};

                            return (
                                <motion.div
                                    key={item.id}
                                    className={cn(
                                        "absolute transition-shadow duration-300",
                                        "rounded-[2rem] overflow-hidden",
                                        isActive
                                            ? "cursor-grab active:cursor-grabbing shadow-2xl z-50" // Cleaner active state without red glow
                                            : "cursor-pointer shadow-xl border border-white/20",
                                    )}
                                    style={{
                                        width: cardWidth,
                                        height: cardHeight,
                                        zIndex,
                                        background: "#F5F0E8", // Cream background
                                        transformOrigin: "bottom center",
                                    }}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: y + 40,
                                                x,
                                                rotateZ,
                                                rotateX,
                                                scale,
                                                zIndex
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        x,
                                        y: y + lift,
                                        rotateZ,
                                        rotateX,
                                        scale,
                                        zIndex,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: springStiffness,
                                        damping: springDamping,
                                    }}
                                    onClick={() => setActive(i)}
                                    {...dragProps}
                                >
                                    <div
                                        className="h-full w-full relative bg-cream"
                                        style={{
                                            transform: `translateZ(${z}px)`,
                                        }}
                                    >
                                        {renderCard ? (
                                            renderCard(item, { active: isActive })
                                        ) : (
                                            <DefaultFanCard item={item} active={isActive} />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Dots navigation centered at bottom */}
            {showDots ? (
                <div className="mt-8 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                        {items.map((it, idx) => {
                            const on = idx === active;
                            return (
                                <button
                                    key={it.id}
                                    onClick={() => setActive(idx)}
                                    className={cn(
                                        "h-2.5 w-2.5 rounded-full transition-all duration-300",
                                        on
                                            ? "bg-red w-8" // Active dot is Red and wider
                                            : "bg-red/20 hover:bg-red/40",
                                    )}
                                    aria-label={`Go to ${it.title}`}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
    return (
        <div className="relative h-full w-full bg-white group overflow-hidden">
            {/* image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                {item.imageSrc ? (
                    item.href ? (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block h-full w-full"
                            aria-label={`Open link for ${item.title}`}
                        >
                            <img
                                src={item.imageSrc}
                                alt={item.title}
                                className="h-full w-full object-cover"
                                draggable={false}
                                loading="eager"
                            />
                        </a>
                    ) : (
                        <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="h-full w-full object-cover"
                            draggable={false}
                            loading="eager"
                        />
                    )
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                        No image
                    </div>
                )}
            </div>

            {/* Gradient overlay - Black for readability */}
            <div className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
                active ? "opacity-100" : "opacity-80"
            )} />

            {/* content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-black text-cream uppercase leading-none tracking-tight mb-2">
                    {item.title}
                </h3>
                {item.description ? (
                    <p className="line-clamp-2 text-sm md:text-base text-cream/80 font-medium">
                        {item.description}
                    </p>
                ) : null}

                {/* Optional CTA or Arrow */}
                <div className={cn(
                    "mt-4 flex items-center justify-center transition-all duration-300 pointer-events-auto relative z-[999]",
                    active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    {item.href ? (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block"
                            onPointerDown={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MagneticText
                                text="VIEW"
                                hoverText="DETAILS"
                                className="text-white/90 font-black text-sm"
                            />
                        </a>
                    ) : (
                        <MagneticText
                            text="VIEW"
                            hoverText="DETAILS"
                            className="text-white/90 font-black text-sm cursor-not-allowed"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
