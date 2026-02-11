import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import ToolsAnimation from './sections/ToolsAnimation';
import MarqueeSection from './sections/MarqueeSection';
import SocialMedia from './sections/SocialMedia';
import MetaAds from './sections/MetaAds';
import Thumbnails from './sections/Thumbnails';
import Photography from './sections/Photography';
import AIGeneration from './sections/AIGeneration';
import Contact from './sections/Contact';

import SeniorDesignerShowcase from './sections/SeniorDesignerShowcase';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; transform?: string } | null>(null);

  // Initialize ScrollTrigger immediately on mount
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // IMPORTANT: Refresh ScrollTrigger after loader finishes
      // This recalculates all trigger positions now that content is visible
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Lightbox modal on image click (site-wide)
  useEffect(() => {
    const handleImageClick = (event: MouseEvent) => {
      const target = event.target;
      const img = target instanceof Element ? target.closest('img') : null;

      if (!img) return;

      if (img.hasAttribute('data-no-lightbox') || img.closest('[data-no-lightbox]')) {
        return;
      }

      event.preventDefault();

      const src =
        img.getAttribute('data-lightbox-src') ||
        (img as HTMLImageElement).currentSrc ||
        img.getAttribute('src') ||
        '';

      if (!src) return;

      setLightbox({
        src,
        alt: img.getAttribute('alt') || 'Image preview',
        transform: img.getAttribute('data-lightbox-transform') || undefined,
      });
    };

    document.addEventListener('click', handleImageClick);
    return () => document.removeEventListener('click', handleImageClick);
  }, []);

  // Close on escape + lock scroll when lightbox is open
  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightbox]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-cream flex items-center justify-center z-[100]">
          <Loader />
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-3 -right-3 bg-cream text-red rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-red/20 hover:bg-white transition-colors"
              aria-label="Close image preview"
              onClick={() => setLightbox(null)}
            >
              X
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
              style={lightbox.transform ? { transform: lightbox.transform } : undefined}
            />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-cream overflow-x-hidden">
        <Navigation />

        <main>
          <Hero />
          <About />
          <ToolsAnimation />
          <MarqueeSection />
          <SocialMedia />
          <SeniorDesignerShowcase />
          <MetaAds />
          <Thumbnails />
          <Photography />
          <AIGeneration />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
