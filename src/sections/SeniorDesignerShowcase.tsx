import { CardStack } from "@/components/ui/CardStack";
import type { CardStackItem } from "@/components/ui/CardStack";

import video1 from "../video1.mp4";
import video2 from "../video2.mp4";
import video3 from "../video3.mp4";
import video4 from "../video4.mp4";
import video5 from "../video5.MP4";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Visual Storytelling",
    description: "Crafting narratives that engage and inspire audiences through motion",
    imageSrc: "",
    videoSrc: video1,
    href: "#",
  },
  {
    id: 2,
    title: "Motion Graphics",
    description: "Animating brand elements to create dynamic visual identities",
    imageSrc: "",
    videoSrc: video2,
    href: "#",
  },
  {
    id: 3,
    title: "Video Editing",
    description: "Seamlessly weaving footage to tell a cohesive and impactful story",
    imageSrc: "",
    videoSrc: video3,
    href: "#",
  },
  {
    id: 4,
    title: "3D Animation",
    description: "Adding depth and dimension to visuals for immersive experiences",
    imageSrc: "",
    videoSrc: video4,
    href: "#",
  },
  {
    id: 5,
    title: "Post-Production",
    description: "Polishing and refining content with color grading and visual effects",
    imageSrc: "",
    videoSrc: video5,
    href: "#",
  },
];

export default function SeniorDesignerShowcase() {
  return (
    <div className="w-full py-20 bg-cream">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red mb-4">MOTION GRAPHICS & VIDEO EDITOR</h2>
          <p className="text-lg text-red/80 max-w-2xl mx-auto">
            Bringing static designs to life through compelling motion and storytelling
          </p>
        </div>
        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={3000}
          pauseOnHover
          showDots
          cardWidth={280}
          cardHeight={500}
        />
      </div>
    </div>
  );
}