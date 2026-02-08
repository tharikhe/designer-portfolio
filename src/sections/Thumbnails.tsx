import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import thumb1 from '../thumbnail1.PNG';
import thumb2 from '../thumbnail2.PNG';
import thumb3 from '../thumbnail3.PNG';

const Thumbnails = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' }
        }
      );

      const thumbs = gridRef.current?.querySelectorAll('.thumb-item');
      if (thumbs) {
        gsap.fromTo(thumbs,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' }
          }
        );
      }


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="thumbnails"
      className="relative min-h-screen w-full bg-cream px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left - Title and description */}
        <div className="lg:col-span-4">
          <div ref={titleRef} className="mb-6 opacity-0">
            <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[6vw] leading-[0.9] tracking-tight">THUMBNAIL</h2>
          </div>

          <p ref={textRef} className="text-red text-sm sm:text-base leading-relaxed max-w-sm opacity-0">
            I specialize in crafting visually compelling and clickable thumbnails that grab attention and drive engagement. I understand the power of a strong first impression and use my skills in graphic design, typography, and color theory to create thumbnails that stand out in crowded feeds.
          </p>
          <div className="mt-4 space-y-3 text-red text-xs sm:text-sm leading-relaxed max-w-sm">
            <p className="font-semibold uppercase tracking-wide">What makes a thumbnail click-worthy?</p>
            <p>• <strong>Bold Typography:</strong> Clear, readable text that communicates value instantly</p>
            <p>• <strong>Strategic Colors:</strong> Eye-catching palettes that pop against YouTube's white interface</p>
            <p>• <strong>Emotional Appeal:</strong> Expressions and imagery that trigger curiosity</p>
            <p>• <strong>Brand Consistency:</strong> Maintaining recognizable visual identity across all videos</p>
          </div>
        </div>

        {/* Right - Thumbnail grid */}
        <div ref={gridRef} className="lg:col-span-8 grid grid-cols-2 gap-4">
          {/* Top row - two thumbnails */}
          <div className="thumb-item relative overflow-hidden rounded-lg shadow-xl opacity-0 group aspect-video">
            <img
              src={thumb1}
              alt="Thumbnail 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="thumb-item relative overflow-hidden rounded-lg shadow-xl opacity-0 group aspect-video">
            <img
              src={thumb2}
              alt="Thumbnail 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Bottom row - large thumbnail */}
          <div className="thumb-item col-span-2 relative overflow-hidden rounded-lg shadow-xl opacity-0 group aspect-[21/9]">
            <img
              src={thumb3}
              alt="Thumbnail 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>


    </section>
  );
};

export default Thumbnails;
