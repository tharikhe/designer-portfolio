import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GooeyText } from '@/components/ui/GooeyText';
import TextBlockAnimation from '@/components/ui/TextBlockAnimation';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(profileRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(contactRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      );

      gsap.to(titleRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full bg-cream overflow-hidden flex flex-col px-4 sm:px-8 lg:px-16 py-4 sm:py-6"
    >
      {/* Main content - Large Title with Profile */}
      <div className="flex-1 flex items-center justify-center relative">
        <div ref={titleRef} className="relative w-full opacity-0 flex flex-col items-center justify-center">
          {/* Gooey morphing text effect */}
          <GooeyText
            texts={["MUBASHIR'S", "PORTFOLIO"]}
            morphTime={1.5}
            cooldownTime={0.5}
            className="h-[25vh] sm:h-[30vh] lg:h-[35vh]"
            textClassName="text-red font-black text-[15vw] sm:text-[14vw] lg:text-[12vw] leading-[0.85] tracking-tight"
          />

          {/* Profile image container */}
          <div className="relative mt-4">
            {/* Profile image - positioned to overlap the text like the reference */}
            <div
              ref={profileRef}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[35%] z-20 w-[140vw] sm:w-[120vw] lg:w-[100vw] opacity-0"
            >
              <div className="relative">
                {/* Profile silhouette image */}
                <img
                  src="/images/hero-profile.png"
                  alt="Mubashir VM"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row - Contact left, Tagline right - stacks on mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 pb-4">
        {/* Contact info at bottom left */}
        <TextBlockAnimation animateOnScroll={false} delay={0.8} blockColor="#C41E3A">
          <div className="text-red font-semibold text-[10px] sm:text-xs">
            <p className="uppercase tracking-wide">MUBASHIR VM</p>
            <p>+91 9496671652</p>
            <p className="break-all">mubashirbinmohammed960@gmail.com</p>
          </div>
        </TextBlockAnimation>

        {/* Tagline at bottom right */}
        <TextBlockAnimation animateOnScroll={false} delay={0.5} blockColor="#C41E3A">
          <p className="text-red text-[8px] sm:text-[9px] lg:text-xs font-semibold tracking-wider uppercase max-w-xs sm:max-w-sm leading-relaxed text-left sm:text-right">
            I'M A GRAPHIC DESIGNER & VIDEO EDITOR PASSIONATE ABOUT TURNING IDEAS INTO BOLD, MEMORABLE VISUALS. MY WORK BLENDS CLEAN AESTHETICS WITH THOUGHTFUL STRATEGY
          </p>
        </TextBlockAnimation>
      </div>
    </section >
  );
};

export default Hero;
