import { MotionConfig } from 'motion/react';
import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollTruckHero } from './components/ScrollTruckHero';
import { ServicesSection } from './components/ServicesSection';

const SECTION_IDS = ['home', 'about', 'services'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollMarker = window.scrollY + 180;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMarker) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (!target) return;
    const navOffset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#faf8f8] text-[#160d0f]">
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        <main>
          <ScrollTruckHero
            onExploreServices={() => scrollToSection('services')}
          />

          <AboutSection />

          <ServicesSection />
        </main>

        <Footer onNavigate={scrollToSection} />
      </div>
    </MotionConfig>
  );
}
