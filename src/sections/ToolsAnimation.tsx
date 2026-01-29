"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({
    src,
    index,
    // total, // unused
    // phase, // unused
    target,
}: FlipCardProps) {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200 flex items-center justify-center p-2"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`tool-${index}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "https://cdn.simpleicons.org/adobecreativecloud/999"; // Fallback
                            e.currentTarget.onerror = null; // Prevent infinite loop
                        }}
                    />
                    <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 flex flex-col items-center justify-center p-2 border border-gray-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-1">View</p>
                        <p className="text-[10px] font-medium text-white">Details</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 8;
const MAX_SCROLL = 2000; // Virtual scroll range

// User's custom design software logos
const IMAGES = [
    "/photoshop-camera_5968497.png",
    "/premiere_5611084.png",
    "/after-effects_5968428.png",
    "/illustrator_9814096.png",
    "/lightroom_10526831.png",
    "/CapCut-Emblem.png",
    "/experience_726125.png",
    "/square_16168696.png",
];


// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ToolsAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        const handleResize = () => {
            setContainerSize({
                width: window.innerWidth,
                height: window.innerHeight, // or use specific height if needed, but window is safer for responsive logic
            });
        };

        // Initial set
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- Virtual Scroll Logic (GSAP) ---
    const virtualScroll = useMotionValue(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Register ScrollTrigger if not already registered globally (safe to call multiple times)
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: `+=${MAX_SCROLL}`,
                pin: true,
                scrub: 0, // Instant scrub, letting framer-motion handle smoothing
                onUpdate: (self) => {
                    // Map scroll progress (0-1) to our virtualScroll range (0-MAX_SCROLL)
                    const progress = self.progress;
                    const currentValue = progress * MAX_SCROLL;
                    virtualScroll.set(currentValue);
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Happens between scroll 0 and 600
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling): Starts after morph (e.g., > 600)
    // Rotates the bottom arc as user continues scrolling
    const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-[120vh] bg-[#FAFAFA] overflow-hidden">
            <div className="relative w-full h-full">
                {/* Container */}
                <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                    {/* Intro Text ... */}
                    <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                        <motion.h1
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                            transition={{ duration: 1 }}
                            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-900 uppercase"
                        >
                            Tools of the Trade
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="mt-4 text-sm font-bold tracking-[0.2em] text-gray-500 uppercase"
                        >
                            Scroll to Explore
                        </motion.p>
                    </div>

                    {/* Arc Active Content ... */}
                    <motion.div
                        style={{ opacity: contentOpacity, y: contentY }}
                        className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
                            Powered By
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
                            Mastery over industry-standard tools ensures that every pixel is perfect and every frame tells a story.
                        </p>
                    </motion.div>

                    {/* Main Container */}
                    <div className="relative flex items-center justify-center w-full h-full">
                        {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                            if (introPhase === "scatter") {
                                target = scatterPositions[i];
                            } else if (introPhase === "line") {
                                const lineSpacing = 70;
                                const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                                const lineX = i * lineSpacing - lineTotalWidth / 2;
                                target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                            } else {
                                // 2. Circle Phase & Morph Logic
                                const isMobile = containerSize.width < 768;
                                const minDimension = Math.min(containerSize.width, containerSize.height);

                                // A. Calculate Circle Position
                                const circleRadius = Math.min(minDimension * 0.48, 450);

                                const circleAngle = (i / TOTAL_IMAGES) * 360;
                                const circleRad = (circleAngle * Math.PI) / 180;
                                const circlePos = {
                                    x: Math.cos(circleRad) * circleRadius,
                                    y: Math.sin(circleRad) * circleRadius,
                                    rotation: circleAngle + 90,
                                };

                                // B. Calculate Bottom Arc Position
                                const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                                const arcCenterY = arcApexY + arcRadius;
                                const spreadAngle = isMobile ? 100 : 130;
                                const startAngle = -90 - (spreadAngle / 2);
                                const step = spreadAngle / (TOTAL_IMAGES - 1);

                                const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                                const maxRotation = spreadAngle * 0.8;
                                const boundedRotation = -scrollProgress * maxRotation;

                                const currentArcAngle = startAngle + (i * step) + boundedRotation;
                                const arcRad = (currentArcAngle * Math.PI) / 180;

                                // Angle Constraints for Opacity
                                // If angle is too far "down" the circle, fade out.
                                // Top of circle is -90. Left is -180. Right is 0.
                                // We want to show roughly -180 to 0. (Active arc)
                                // If it goes < -160 or > -20, start fading.
                                let angleOpacity = 1;
                                if (currentArcAngle < -150) {
                                    // Fade out as it goes further left/down
                                    angleOpacity = Math.max(0, 1 - ((-150 - currentArcAngle) / 20));
                                } else if (currentArcAngle > -30) {
                                    // Fade out as it goes further right/down
                                    angleOpacity = Math.max(0, 1 - ((currentArcAngle - (-30)) / 20));
                                }

                                const arcPos = {
                                    x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                    y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                    rotation: currentArcAngle + 90,
                                    scale: isMobile ? 1.4 : 1.8,
                                };

                                target = {
                                    x: lerp(circlePos.x, arcPos.x, morphValue),
                                    y: lerp(circlePos.y, arcPos.y, morphValue),
                                    rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                    scale: lerp(1, arcPos.scale, morphValue),
                                    opacity: morphValue > 0.5 ? angleOpacity : 1, // Only apply angle opacity in arc phase
                                };
                            }

                            return (
                                <FlipCard
                                    key={i}
                                    src={src}
                                    index={i}
                                    total={TOTAL_IMAGES}
                                    phase={introPhase}
                                    target={target}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
