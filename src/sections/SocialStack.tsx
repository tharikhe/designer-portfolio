

import { CardStack } from '@/components/ui/CardStack';
import { MagneticText } from '@/components/ui/morphing-cursor';
import type { CardStackItem } from '@/components/ui/CardStack';

// Demo data for the stack
const PROJECTS: CardStackItem[] = [
    {
        id: 1,
        title: "Market Analysis",
        description: "Detailed breakdown of weekly market trends and forecasts.",
        imageSrc: "/images/social-media.png", // Using your existing mockup as a placeholder
        tag: "Finance",
        href: "#market-analysis"
    },
    {
        id: 2,
        title: "Trump's Tariffs",
        description: "Visualizing the impact of new trade policies on global markets.",
        imageSrc: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=800&auto=format&fit=crop",
        tag: "Economy",
        href: "#trumps-tariffs"
    },
    {
        id: 3,
        title: "Pharma Growth",
        description: "Revenue share analysis of Indian pharma companies in the US.",
        imageSrc: "https://images.unsplash.com/photo-1576091160550-217358c7e618?q=80&w=800&auto=format&fit=crop",
        tag: "Healthcare",
        href: "#pharma-growth"
    },
    {
        id: 4,
        title: "Broker Rankings",
        description: "Comparing India's top stock brokers by active user base.",
        imageSrc: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
        tag: "Brokers",
        href: "#broker-rankings"
    },
    {
        id: 5,
        title: "Crypto Trends",
        description: "Analyzing recent movements in Bitcoin and Ethereum.",
        imageSrc: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop",
        tag: "Crypto",
        href: "#crypto-trends"
    },
];

const SocialStack = () => {
    return (
        <section id="social-stack" className="w-full bg-cream py-16 md:py-20 overflow-hidden flex flex-col items-center">
            <div className="container mx-auto px-4 mb-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2 mb-4">
                    <MagneticText text="LATEST" hoverText="PROJECTS" className="text-red font-black text-6xl md:text-8xl tracking-tight leading-none" />
                    <MagneticText text="WORK" hoverText="RESULTS" className="text-red font-black text-6xl md:text-8xl tracking-tight leading-none" />
                </div>
                <p className="text-red/80 font-medium text-lg max-w-xl mx-auto">
                    Explore my recent social media creatives designed to engage and inform.
                </p>
            </div>

            <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
                <CardStack
                    items={PROJECTS}
                    className="py-6 sm:py-8"
                    cardWidth={320}
                    cardHeight={440}
                    activeScale={1.06}
                    autoAdvance={false}
                />
            </div>
        </section>
    );
};

export default SocialStack;
