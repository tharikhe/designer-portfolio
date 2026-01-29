import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AIGeneration = () => {
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

      const items = gridRef.current?.querySelectorAll('.ai-item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 40, scale: 0.95 },
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
      id="ai-generation"
      className="relative min-h-screen w-full bg-cream px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left - Title and description */}
        <div className="lg:col-span-4">
          <div ref={titleRef} className="mb-6 opacity-0">
            <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[5vw] leading-[0.9] tracking-tight">AI</h2>
            <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[5vw] leading-[0.9] tracking-tight">IMAGE</h2>
            <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[5vw] leading-[0.9] tracking-tight">GENERATION</h2>
          </div>

          <p ref={textRef} className="text-red text-sm sm:text-base leading-relaxed max-w-sm opacity-0">
            This collection highlights some of my favorite personal projects, created in my free time. I leverage cutting-edge AI tools to push the boundaries of visual creativity.
          </p>
          <div className="mt-4 space-y-3 text-red text-xs sm:text-sm leading-relaxed max-w-sm">
            <p className="font-semibold uppercase tracking-wide">AI-Powered Creative Services:</p>
            <p>• <strong>Product Mockups:</strong> Photorealistic visualizations for e-commerce and marketing</p>
            <p>• <strong>Concept Art:</strong> Bringing ideas to life before production begins</p>
            <p>• <strong>Brand Imagery:</strong> Unique visuals that set your brand apart</p>
            <p>• <strong>Social Content:</strong> Scroll-stopping AI-enhanced graphics</p>
            <p className="pt-2 italic font-['Playwrite_NZ']">"Combining human creativity with AI capabilities to deliver visuals that were once impossible."</p>
          </div>
        </div>

        {/* Right - AI works grid */}
        <div ref={gridRef} className="lg:col-span-8 grid grid-cols-2 gap-4">
          {/* Top left - Skincare product */}
          <div className="ai-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-square bg-gradient-to-br from-green-700 to-green-900 relative">
              <img
                src="/images/ai-skincare.png"
                alt="AI Generated Skincare Product"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback content */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-24 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-full rounded-b-lg shadow-2xl relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-800 rounded-full"></div>
                </div>
              </div>
              {/* Moss/leaves decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-900/80 to-transparent"></div>
            </div>
          </div>

          {/* Top right - DRIX beverage */}
          <div className="ai-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative">
              <img
                src="/images/ai-drix.png"
                alt="AI Generated DRIX Beverage"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback content */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <div className="w-16 h-28 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-2xl shadow-2xl transform -rotate-12 flex items-center justify-center">
                    <span className="text-white font-black text-xl tracking-wider transform rotate-90">DRIX</span>
                  </div>
                </div>
              </div>
              {/* Palm tree decorations */}
              <div className="absolute top-4 left-4 text-3xl">🌴</div>
              <div className="absolute top-8 right-4 text-2xl">🌴</div>
              {/* Ice cubes */}
              <div className="absolute bottom-8 left-4 text-xl">🧊</div>
              <div className="absolute bottom-4 right-8 text-xl">🧊</div>
            </div>
          </div>

          {/* Bottom - Perfume (full width) */}
          <div className="ai-item col-span-2 relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[21/9] bg-gradient-to-br from-stone-200 to-stone-400 relative">
              <img
                src="/images/ai-perfume.png"
                alt="AI Generated Perfume"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback content */}
              <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none">
                {/* Curtain effect on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-amber-700/20 to-transparent"></div>

                {/* Perfume bottle */}
                <div className="relative">
                  <div className="w-12 h-20 bg-gradient-to-b from-stone-100 to-stone-300 rounded-lg shadow-xl flex flex-col items-center">
                    <div className="w-8 h-10 bg-stone-100 rounded-t-lg mt-1"></div>
                    <div className="w-6 h-6 bg-stone-800 rounded-full mt-1"></div>
                  </div>
                  {/* Label */}
                  <div className="absolute -right-20 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-2 rounded shadow-lg">
                    <p className="text-stone-800 text-[8px] font-serif">inspired</p>
                    <p className="text-stone-800 text-[10px] font-serif font-bold">perfume house</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default AIGeneration;
