import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );

      gsap.fromTo(infoRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 40%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full bg-cream px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 flex flex-col justify-center"
    >
      {/* Title */}
      <h2 ref={titleRef} className="text-red font-black text-[12vw] sm:text-[10vw] lg:text-[7vw] leading-[0.9] tracking-tight mb-8 sm:mb-12 lg:mb-16 opacity-0">
        GET IN TOUCH
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
        {/* Left column - Contact info */}
        <div ref={infoRef} className="space-y-6 opacity-0">
          <div className="bg-[#F5F0E8] p-6 border-2 border-red rounded-lg shadow-[4px_4px_0px_0px_#C41E3A]">
            <h3 className="text-red font-bold text-lg sm:text-xl mb-4 uppercase tracking-wide">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-red font-bold text-base sm:text-lg uppercase tracking-wide">MUBASHIR VM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-red font-medium text-base">+91 9496671652</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-red font-medium text-base break-all">Mubashirbinmohammed960@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="bg-[#F5F0E8] p-6 border-2 border-red rounded-lg shadow-[4px_4px_0px_0px_#C41E3A]">
            <h3 className="text-red font-bold text-lg sm:text-xl mb-4 uppercase tracking-wide">Follow Me</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mbz.arcxxvs?igsh=MWI4YXgzcXNocWxmbA%3D%3D&utm_source=qr"
                className="w-12 h-12 rounded-full border-2 border-red bg-[#F5F0E8] shadow-[3px_3px_0px_0px_#C41E3A] flex items-center justify-center text-red hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mubashir-v-m-2595a6204?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                className="w-12 h-12 rounded-full border-2 border-red bg-[#F5F0E8] shadow-[3px_3px_0px_0px_#C41E3A] flex items-center justify-center text-red hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right column - Contact form */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 sm:p-8 bg-cream border-2 border-red rounded-lg shadow-[4px_4px_0px_0px_#C41E3A] opacity-0">
          <div className="mb-6">
            <p className="text-red font-black text-xl sm:text-2xl mb-2">Let's Work Together</p>
            <p className="text-red/60 font-medium text-sm sm:text-base">I'd love to hear about your project</p>
          </div>

          <div className="space-y-5">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#F5F0E8] border-2 border-red rounded-md px-4 py-3 text-red font-semibold focus:outline-none focus:border-red-dark shadow-[3px_3px_0px_0px_#C41E3A] transition-all placeholder-red/50"
                placeholder="Your Name"
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#F5F0E8] border-2 border-red rounded-md px-4 py-3 text-red font-semibold focus:outline-none focus:border-red-dark shadow-[3px_3px_0px_0px_#C41E3A] transition-all placeholder-red/50"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-[#F5F0E8] border-2 border-red rounded-md px-4 py-3 text-red font-semibold focus:outline-none focus:border-red-dark shadow-[3px_3px_0px_0px_#C41E3A] transition-all resize-none placeholder-red/50"
                placeholder="Tell me about your project..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="mt-6 sm:mt-8 w-full py-3 px-6 bg-[#F5F0E8] border-2 border-red rounded-md font-bold text-red text-base sm:text-lg shadow-[4px_4px_0px_0px_#C41E3A] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer"
          >
            {submitted ? (
              <span className="text-green-600">Message Sent! ✓</span>
            ) : (
              <>Let's go →</>
            )}
          </button>
        </form>
      </div>

      {/* Decorative line */}
      <div
        ref={lineRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-1/4 h-0.5 bg-red origin-left"
        style={{ transform: 'scaleX(0) translateX(-50%)' }}
      ></div>
    </section>
  );
};

export default Contact;
