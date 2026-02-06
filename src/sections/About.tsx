import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo(bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(skillsRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 40%', toggleActions: 'play none none reverse' }
        }
      );


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full bg-cream px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full">
        {/* Left column */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Title - stacked */}
            <div ref={titleRef} className="mb-8 opacity-0">
              <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tight">ABOUT</h2>
              <h2 className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tight">ME</h2>
            </div>

            {/* Bio text */}
            <p ref={bioRef} className="text-red text-sm sm:text-base leading-relaxed max-w-md opacity-0">
              Design is where strategy meets soul, and for over five years, I’ve been a <span className="font-bold">visual storyteller</span> dedicated to turning big ideas into memorable digital moments. My journey has been defined by a relentless pursuit of aesthetic excellence. I don't just create content; I craft experiences. From the cutting-edge possibilities of <span className="font-bold">AI image & video generation</span> to the precision of <span className="font-bold">product photography</span> and <span className="font-bold">videography</span>, I bring a versatile skillset to every project. Whether it's editing a high-energy reel that captures attention in seconds or meticulously planning a <span className="font-bold">social media</span> strategy, I blend technical expertise with creative vision. By pairing clean aesthetics with a deep understanding of <span className="font-bold">color harmony</span>, my goal is simple: to help your brand speak clearly, beautifully, and authentically, leaving a lasting impact in a crowded digital landscape.
            </p>
          </div>


        </div>

        {/* Right column */}
        <div className="flex flex-col">
          {/* Circular Profile Image */}
          <div ref={imageRef} className="mb-8 opacity-0">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <div
                className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-red/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-white ring-1 ring-red/15 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
                <img
                  src="/images/about-profile.png"
                  alt="Mubashir VM - About"
                  className="h-full w-full object-contain object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-red/30 text-sm">Add about-profile.png</div>';
                    }
                  }}
                />
              </div>
              <div
                className="pointer-events-none absolute -bottom-5 -left-5 h-14 w-14 rounded-full border border-red/20"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Skills and Experience */}
          <div ref={skillsRef} className="space-y-0 opacity-0">
            {/* Skills */}
            <div className="border-t-2 border-red py-4">
              <h3 className="text-red font-bold text-sm mb-2">SKILLS:</h3>
              <div className="text-red text-sm font-medium space-y-1">
                <p>ADOBE CREATIVE SUITE</p>
                <p>REELS CREATION</p>
                <p>AI IMAGE & VIDEO GENERATION</p>
                <p>PRODUCT PHOTOGRAPHY</p>
                <p>VIDEOGRAPHY</p>
                <p>SOCIAL MEDIA HANDLING</p>
              </div>
            </div>

            {/* Experience */}
            <div className="border-t-2 border-red py-4">
              <h3 className="text-red font-bold text-sm mb-2">EXPERIENCE:</h3>
              <div className="text-red text-sm font-medium space-y-1">
                <p>TRADERS CIRCUIT (OCTOBER 2025-PRESENT)</p>
                <p>FREELANCING (2020-2025)</p>
              </div>
            </div>

            {/* Bottom border */}
            <div className="border-t-2 border-red"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
