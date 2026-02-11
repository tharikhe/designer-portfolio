import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Photography = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.photo-item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' }
          }
        );
      }

      gsap.fromTo(titleRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 40%', toggleActions: 'play none none reverse' }
        }
      );


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="photography"
      className="relative min-h-screen w-full bg-cream px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left - Photo grid */}
        <div ref={gridRef} className="lg:col-span-7 grid grid-cols-2 gap-4">
          {/* Photo 1 */}
          <div className="photo-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <img
                src="/phot1.webp"
                alt="Photography 1"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Photo 2 */}
          <div className="photo-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 relative">
              <img
                src="/photography.jpeg"
                alt="Photography 2"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Photo 3 */}
          <div className="photo-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-700 relative">
              <img
                src="/photo3.webp"
                alt="Photography 3"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Photo 4 */}
          <div className="photo-item relative overflow-hidden rounded-lg shadow-lg opacity-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <img
                src="/images/photo4.jpg"
                alt="Photography 4"
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

        {/* Right - Title and description */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div ref={titleRef} className="mb-6 opacity-0">
            <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[6vw] leading-[0.9] tracking-tight">PHOTOGRAPHY</h2>
            <p className="text-red text-xs sm:text-sm font-semibold uppercase tracking-wider mt-4">
              I SPECIALIZE IN PHOTOGRAPHY, USING MY SMARTPHONE & CAMERA TO CAPTURE HIGH-QUALITY, IMPACTFUL IMAGES
            </p>
          </div>

          <p ref={textRef} className="text-red text-sm sm:text-base leading-relaxed opacity-0">
            With my passion for mobile photography, I've honed my skills in composition, lighting, and visual storytelling. This expertise extends to food and product photography, where I capture professional-quality images that highlight intricate details all using just a smartphone.
          </p>
          <div className="mt-6 space-y-4 text-red">
            <div className="border-l-2 border-red pl-4">
              <p className="text-xs uppercase font-bold tracking-wider mb-1">Product Photography</p>
              <p className="text-sm leading-relaxed">From jewelry to cosmetics, I capture products in their best light — highlighting textures, materials, and unique selling points that make customers click "buy."</p>
            </div>
            <div className="border-l-2 border-red pl-4">
              <p className="text-xs uppercase font-bold tracking-wider mb-1">Food & Beverage</p>
              <p className="text-sm leading-relaxed">Mouthwatering shots that make viewers hungry. I specialize in café aesthetics, restaurant menus, and social media food content.</p>
            </div>
            <div className="border-l-2 border-red pl-4">
              <p className="text-xs uppercase font-bold tracking-wider mb-1">Brand Lifestyle</p>
              <p className="text-sm leading-relaxed">Authentic visual stories that connect your brand with your audience, creating emotional resonance through carefully composed imagery.</p>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Photography;
