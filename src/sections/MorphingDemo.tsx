
import { MagneticText } from "@/components/ui/morphing-cursor"

export default function MorphingDemo() {
    return (
        <section className="min-h-[50vh] bg-cream flex flex-col items-center justify-center gap-16 p-8 border-t border-red/10">


            <div className="flex flex-col items-center gap-8">
                {/* Adjusted className to ensure text color visibility against bg-cream */}
                <MagneticText text="SOCIAL" hoverText="MEDIA" className="text-red" />
                <MagneticText text="VIEW" hoverText="DETAILS" className="text-red" />
            </div>
        </section>
    )
}
