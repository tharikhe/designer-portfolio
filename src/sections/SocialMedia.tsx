import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SocialMedia = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo(textRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none none' }
        }
      );


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="social-media"
      className="relative min-h-screen w-full bg-cream px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-24 flex items-center overflow-hidden"
    >
      <div className="w-full relative">
        {/* Grid for Title and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Left - Title */}
          <div ref={titleRef} className="lg:col-span-4 opacity-0">
            <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[4vw] xl:text-[4.5rem] leading-[0.9] tracking-tight">
              SOCIAL MEDIA
            </h2>
            <p className="text-red text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 italic">
              CREATIVES
            </p>
          </div>

          {/* Spacer for center */}
          <div className="lg:col-span-4 hidden lg:block"></div>

          {/* Right - Description */}
          <div ref={textRef} className="lg:col-span-4 opacity-0 space-y-3 lg:space-y-4 flex flex-col justify-start lg:pt-8">
            <p className="text-red text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase leading-tight tracking-wide">
              CRAFTED STRATEGIC SOCIAL MEDIA CONTENT, INCLUDING POSTERS AND REELS, TO INCREASE VIEWER ENGAGEMENT WITH STOCK MARKET NEWS
            </p>
            <p className="text-red text-xs sm:text-sm lg:text-base leading-relaxed italic">
              My work transforms passive followers into active participants, fostering a loyal and engaged online community
            </p>
            <p className="text-red text-[10px] sm:text-xs leading-relaxed mt-2">
              Every design is tailored to platform-specific requirements — from Instagram carousels to LinkedIn posts, Twitter threads to Pinterest pins. I understand the nuances of each platform and create content that resonates with your target audience.
            </p>
            <p className="text-red text-[10px] sm:text-xs leading-relaxed font-semibold uppercase tracking-wide">
              Services: Carousel Design • Story Templates • Reel Covers • Profile Optimization • Content Calendars • Brand Consistency
            </p>
          </div>
        </div>

        {/* Center - MASSIVE Overlapping Mockup Image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 w-full flex justify-center items-center z-20 pointer-events-none">
          <img
            ref={imageRef}
            src="/images/social-media.png"
            alt="Social Media Instagram Mockups"
            className="w-[100%] sm:w-[90%] lg:w-[85%] xl:w-[80%] h-auto object-contain opacity-0 transform scale-125 hover:scale-[1.3] transition-transform duration-300 pointer-events-auto"
          />
        </div>
      </div>


    </section>
  );
};

export default SocialMedia;
