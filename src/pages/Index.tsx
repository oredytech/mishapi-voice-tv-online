
import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import LiveSection from '@/components/LiveSection';
import { NewsSection } from '@/components/NewsSection';
import { YouTubeSection } from '@/components/YouTubeSection';
import { ContactSection } from '@/components/ContactSection';

interface IndexProps {
  setIsGlobalPlayerVisible?: (isVisible: boolean) => void;
}

const Index = ({ setIsGlobalPlayerVisible }: IndexProps) => {
  const [isRadioPlayerVisible, setIsRadioPlayerVisible] = useState(false);
  const [isMishapi24PlayerVisible, setIsMishapi24PlayerVisible] = useState(false);

  const handleSetRadioPlayerVisible = (isVisible: boolean) => {
    setIsRadioPlayerVisible(isVisible);
    if (setIsGlobalPlayerVisible) {
      setIsGlobalPlayerVisible(isVisible);
    }
  };

  const handleSetMishapi24PlayerVisible = (isVisible: boolean) => {
    setIsMishapi24PlayerVisible(isVisible);
    if (setIsGlobalPlayerVisible) {
      setIsGlobalPlayerVisible(isVisible);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        setIsRadioPlayerVisible={handleSetRadioPlayerVisible}
        setIsMishapi24PlayerVisible={handleSetMishapi24PlayerVisible}
      />

      {/* Live Section */}
      <LiveSection />

      {/* News Section */}
      <NewsSection />
      
      {/* YouTube Videos Section */}
      <YouTubeSection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
