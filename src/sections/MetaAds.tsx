import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import creative1 from '../creatives1.png';
import creative2 from '../creatives2.png';
import creative3 from '../creatives3.png';
import creative4 from '../creatives4.png';

gsap.registerPlugin(ScrollTrigger);

const MetaAds = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      const items = gridRef.current?.querySelectorAll('.meta-item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' }
          }
        );
      }

      gsap.fromTo(textRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' }
        }
      );


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="meta-ads"
      className="relative min-h-screen w-full bg-cream px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left - Title */}
        <div ref={titleRef} className="lg:col-span-2 opacity-0">
          <p className="text-red text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] mb-2">
            Latest Work
          </p>
          <h2 className="text-red font-black text-[10vw] sm:text-[8vw] lg:text-[4vw] leading-[0.9] tracking-tight">CREATIVES</h2>
          <p className="text-red font-semibold text-sm sm:text-base mt-1 uppercase tracking-wide">FOR META ADS</p>
        </div>

        {/* Center - Creative collage */}
        <div
          ref={gridRef}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-6 lg:h-[620px] xl:h-[700px] gap-4 lg:gap-5"
        >
          <div className="meta-item group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 opacity-0 transition-transform duration-500 hover:-translate-y-1 sm:col-span-2 lg:col-span-3 lg:row-span-4 lg:col-start-1 lg:row-start-1 aspect-[4/5] sm:aspect-[5/6] lg:aspect-auto">
            <img
              src={creative2}
              alt="Zero Brokerage creative"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute top-4 left-4">
              <span className="rounded-full bg-cream/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red shadow-sm">
                Creative 01
              </span>
            </div>
          </div>

          <div className="meta-item group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 opacity-0 transition-transform duration-500 hover:-translate-y-1 lg:col-span-3 lg:row-span-4 lg:col-start-4 lg:row-start-1 aspect-[3/4] lg:aspect-auto">
            <img
              src={creative3}
              alt="When to Buy or Sell creative"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute top-4 left-4">
              <span className="rounded-full bg-cream/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red shadow-sm">
                Creative 02
              </span>
            </div>
          </div>

          <div className="meta-item group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 opacity-0 transition-transform duration-500 hover:-translate-y-1 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-5 aspect-[4/3] lg:aspect-auto">
            <img
              src={creative1}
              alt="Missed last swing creative"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute top-4 left-4">
              <span className="rounded-full bg-cream/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red shadow-sm">
                Creative 03
              </span>
            </div>
          </div>

          <div className="meta-item group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 opacity-0 transition-transform duration-500 hover:-translate-y-1 sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-3 lg:row-start-5 aspect-[16/9] lg:aspect-auto">
            <img
              src={creative4}
              alt="GST Cuts creative"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute top-4 left-4">
              <span className="rounded-full bg-cream/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red shadow-sm">
                Creative 04
              </span>
            </div>
          </div>
        </div>

        {/* Right - Description */}
        <div ref={textRef} className="lg:col-span-3 flex items-center opacity-0">
          <p className="text-red text-sm sm:text-base leading-relaxed">
            Designed high-impact posters and dynamic reels for Meta ads, balancing sharp typography with clear data cues to stop the scroll and drive action.
          </p>
        </div>
      </div>


    </section>
  );
};

export default MetaAds;
