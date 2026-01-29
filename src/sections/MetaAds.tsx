import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
          <h2 className="text-red font-black text-[10vw] sm:text-[8vw] lg:text-[4vw] leading-[0.9] tracking-tight">CREATIVES</h2>
          <p className="text-red font-semibold text-sm sm:text-base mt-1 uppercase tracking-wide">FOR META ADS</p>
        </div>

        {/* Center - Grid of ads */}
        <div ref={gridRef} className="lg:col-span-7 grid grid-cols-2 gap-4">
          {/* Top left - 50,000+ Traders */}
          <div className="meta-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 aspect-[3/4] p-4 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">T</span>
                </div>
                <span className="text-white/70 text-[8px]">Traders Circuit</span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white text-xl sm:text-2xl font-bold leading-tight">
                  We've Hit<br />50,000+<br />Traders
                </p>
              </div>

              <button className="text-white text-xs border border-white/40 rounded-full px-3 py-1 w-fit">
                subscribenow
              </button>

              {/* Phone mockup */}
              <div className="absolute right-2 bottom-16 w-16 h-28 bg-gray-900 rounded-xl p-1 shadow-xl transform rotate-12">
                <div className="bg-gray-800 rounded-lg h-full w-full overflow-hidden p-1">
                  <div className="space-y-1">
                    <div className="h-1 bg-white/20 rounded w-3/4"></div>
                    <div className="h-6 bg-green-500/30 rounded mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top right - Woman with phone (tall) */}
          <div className="meta-item relative overflow-hidden rounded-lg shadow-lg opacity-0 row-span-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 h-full p-4 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">T</span>
                </div>
                <span className="text-white/70 text-[8px]">Traders Circuit</span>
              </div>

              {/* Center content - phone in hand */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-48 bg-gradient-to-b from-blue-400/30 to-transparent rounded-full"></div>
                </div>
                {/* Phone mockup */}
                <div className="relative w-20 h-36 bg-gray-900 rounded-2xl p-1 shadow-2xl">
                  <div className="bg-blue-600 rounded-xl h-full w-full overflow-hidden p-2">
                    <div className="space-y-1">
                      <div className="h-1 bg-white/30 rounded"></div>
                      <div className="h-8 bg-green-500/40 rounded"></div>
                      <div className="h-1 bg-white/20 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEBI Badge */}
              <div className="mt-4">
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2 w-fit">
                  <span className="text-lg">✓</span>
                  <div>
                    <div className="text-[8px] leading-none">SEBI</div>
                    <div className="text-[10px] leading-none">REG.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom left - GST Cuts (extends under the tall card) */}
          <div className="meta-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="bg-gradient-to-br from-gray-800 to-black aspect-[4/3] p-4 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">T</span>
                </div>
                <span className="text-white/70 text-[8px]">Traders Circuit</span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white text-lg font-bold">
                  GST CUTS & <span className="italic font-serif">Lollapalooza</span> Effect
                </p>
              </div>

              {/* Chart visualization */}
              <div className="mt-2 flex items-end gap-1 h-12">
                {[30, 50, 40, 70, 55, 80, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/20 rounded-t" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom right - Bridging your path */}
          <div className="meta-item relative overflow-hidden rounded-lg shadow-lg opacity-0 col-span-2 lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 aspect-[4/3] p-4 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">T</span>
                </div>
                <span className="text-white/70 text-[8px]">Traders Circuit</span>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-white text-2xl sm:text-3xl font-bold italic">Bridging</p>
                <p className="text-white/80 text-lg sm:text-xl italic">your path</p>
              </div>

              {/* Bridge illustration */}
              <div className="relative h-12 mt-2">
                <div className="absolute bottom-0 left-0 w-6 h-10 bg-gray-700 rounded-t"></div>
                <div className="absolute bottom-0 right-0 w-6 h-10 bg-gray-700 rounded-t"></div>
                <div className="absolute bottom-4 left-6 right-6 h-1 bg-white/30"></div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-2 left-1/3 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Description */}
        <div ref={textRef} className="lg:col-span-3 flex items-center opacity-0">
          <p className="text-red text-sm sm:text-base leading-relaxed">
            Designed high-impact posters and dynamic reels for Meta ads, leveraging <span className="font-bold">AI image generators</span> to streamline the creative process and produce unique visuals efficiently
          </p>
        </div>
      </div>


    </section>
  );
};

export default MetaAds;
