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
import SocialStack from './sections/SocialStack';

import SocialGrid from './sections/SocialGrid';
import MetaAds from './sections/MetaAds';
import Thumbnails from './sections/Thumbnails';
import Photography from './sections/Photography';
import AIGeneration from './sections/AIGeneration';
import Contact from './sections/Contact';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-cream flex items-center justify-center z-[100]">
          <Loader />
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
          <SocialStack />

          <SocialGrid />
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
