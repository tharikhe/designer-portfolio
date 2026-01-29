import MarqueeText from '../components/ui/MarqueeText';

export default function MarqueeSection() {
    return (
        <section className="relative w-full py-8 bg-cream overflow-hidden">
            {/* First Row - Moving Right */}
            <MarqueeText
                baseVelocity={-3}
                scrollDependent={true}
                className="font-black text-red/20 uppercase tracking-tight"
            >
                DESIGN • CREATE • INSPIRE • INNOVATE •
            </MarqueeText>

            {/* Second Row - Moving Left */}
            <MarqueeText
                baseVelocity={3}
                scrollDependent={true}
                className="font-black text-red/30 uppercase tracking-tight"
                delay={200}
            >
                VISUAL STORYTELLING • BRAND IDENTITY • DIGITAL EXPERIENCES •
            </MarqueeText>
        </section>
    );
}
