import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SocialGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const gridItems = gridRef.current?.querySelectorAll('.grid-item');
      if (gridItems) {
        gsap.fromTo(gridItems,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-cream px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
      <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Card 1 - Missed last swing */}
        <div className="grid-item relative overflow-hidden rounded-xl shadow-lg opacity-0 group">
          <div className="aspect-[3/4] relative">
            <img
              src="/images/creatives1.png"
              alt="Missed last swing?"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Card 2 - Zero Brokerage */}
        <div className="grid-item relative overflow-hidden rounded-xl shadow-lg opacity-0 group row-span-1 lg:row-span-1">
          <div className="aspect-[3/4] relative">
            <img
              src="/images/creatives2.png"
              alt="Zero Brokerage"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Card 3 - When to Buy/Sell */}
        <div className="grid-item relative overflow-hidden rounded-xl shadow-lg opacity-0 group">
          <div className="aspect-[3/4] relative">
            <img
              src="/images/creatives3.png"
              alt="When to Buy When to Sell"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Card 4 - GST Cuts */}
        <div className="grid-item relative overflow-hidden rounded-xl shadow-lg opacity-0 group">
          <div className="aspect-[3/4] relative">
            <img
              src="/images/creatives4.png"
              alt="GST Cuts"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGrid;
