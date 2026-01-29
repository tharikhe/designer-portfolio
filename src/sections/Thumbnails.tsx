import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
          <div className="thumb-item relative overflow-hidden rounded-lg shadow-xl opacity-0 group">
            <div className="aspect-video bg-gradient-to-br from-red-900 to-red-700 p-3 flex flex-col justify-between relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/4 text-6xl font-black text-white/30">BUDGET</div>
              </div>

              <div className="relative z-10">
                <p className="text-white text-xs font-bold uppercase">WHAT TO EXPECT</p>
                <p className="text-white/80 text-[10px]">2025</p>
              </div>

              {/* Person silhouettes area */}
              <div className="relative z-10 flex justify-end">
                <div className="w-16 h-16 bg-gradient-to-t from-gray-800 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="thumb-item relative overflow-hidden rounded-lg shadow-xl opacity-0 group">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 p-3 flex flex-col justify-between relative">
              {/* Background - bank building */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-blue-900/50"></div>

              <div className="relative z-10 text-right">
                <p className="text-white text-lg font-black uppercase">THE REAL TRUTH?</p>
              </div>

              {/* Person silhouette */}
              <div className="relative z-10">
                <div className="w-12 h-16 bg-gradient-to-t from-gray-600 to-transparent rounded-t-full"></div>
              </div>
            </div>
          </div>

          {/* Bottom row - large thumbnail */}
          <div className="thumb-item col-span-2 relative overflow-hidden rounded-lg shadow-xl opacity-0 group">
            <div className="aspect-[21/9] bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex flex-col justify-between relative">
              {/* Background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-900 to-transparent"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/50 to-transparent"></div>
                {/* Factory/industry silhouette */}
                <div className="absolute bottom-0 left-4 flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-4 h-16 bg-gray-700 rounded-t"></div>
                  ))}
                </div>
              </div>

              {/* Logo */}
              <div className="relative z-10 flex items-center gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">T</span>
                </div>
                <span className="text-white/70 text-[10px]">Traders Circuit</span>
              </div>

              {/* Title */}
              <div className="relative z-10 text-center">
                <p className="text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider">TRADE WARS</p>
              </div>

              {/* Person silhouettes */}
              <div className="relative z-10 flex justify-center gap-4">
                <div className="w-12 h-16 bg-gradient-to-t from-gray-600 to-transparent rounded-t-full"></div>
                <div className="w-14 h-20 bg-gradient-to-t from-gray-500 to-transparent rounded-t-full"></div>
                <div className="w-12 h-16 bg-gradient-to-t from-gray-600 to-transparent rounded-t-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Thumbnails;
