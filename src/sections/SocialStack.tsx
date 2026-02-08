

import { CardStack } from '@/components/ui/CardStack';
import { MagneticText } from '@/components/ui/morphing-cursor';
import type { CardStackItem } from '@/components/ui/CardStack';

import creative1 from '../creatives1.png';
import creative2 from '../creatives2.png';
import creative3 from '../creatives3.png';
import creative4 from '../creatives4.png';

// Demo data for the stack
const PROJECTS: CardStackItem[] = [
    {
        id: 1,
        title: "Missed Last Swing?",
        description: "Analyzing market timing and missed opportunities.",
        imageSrc: creative1,
        tag: "Market Analysis",
        href: "#missed-swing"
    },
    {
        id: 2,
        title: "Zero Brokerage",
        description: "The impact of zero brokerage models on trading volume.",
        imageSrc: creative2,
        tag: "Trading",
        href: "#zero-brokerage"
    },
    {
        id: 3,
        title: "When to Buy/Sell",
        description: "Strategic entry and exit points for maximum gains.",
        imageSrc: creative3,
        tag: "Strategy",
        href: "#buy-sell"
    },
    {
        id: 4,
        title: "GST Cuts",
        description: "Understanding the implications of recent GST reductions.",
        imageSrc: creative4,
        tag: "Policy",
        href: "#gst-cuts"
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
