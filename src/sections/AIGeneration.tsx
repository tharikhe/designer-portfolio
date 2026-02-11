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
            <p className="pt-2 italic">"Combining human creativity with AI capabilities to deliver visuals that were once impossible."</p>
          </div>
        </div>

        {/* Right - AI works grid */}
        <div ref={gridRef} className="lg:col-span-8 grid grid-cols-2 gap-4">
          {/* Top left */}
          <div className="ai-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <img
                src="/images/ai-1.png"
                alt="AI Generated Image 1"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Top right */}
          <div className="ai-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <img
                src="/images/ai-2.png"
                alt="AI Generated Image 2"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Bottom left */}
          <div className="ai-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <img
                src="/images/ai-3.webp"
                alt="AI Generated Image 3"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Bottom right */}
          <div className="ai-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <img
                src="/images/ai-4.webp"
                alt="AI Generated Image 4"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default AIGeneration;
