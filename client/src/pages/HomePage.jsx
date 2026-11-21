import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import DemoSection from '../components/home/DemoSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import Pricing from '../components/home/Pricing';
import CTASection from '../components/home/CTASection';
import BgGradient from '../components/common/BgGradient';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="relative w-full">
      <BgGradient />

      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <Pricing />
        <CTASection />
      </div>
    </div>
  );
};

export default HomePage;
