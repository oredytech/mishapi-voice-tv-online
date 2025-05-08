
import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import LiveSection from '@/components/LiveSection';
import { NewsSection } from '@/components/NewsSection';
import { YouTubeSection } from '@/components/YouTubeSection';
import { ContactSection } from '@/components/ContactSection';
import FloatingPlayer from '@/components/FloatingPlayer';

const Index = () => {
  const [isRadioPlayerVisible, setIsRadioPlayerVisible] = useState(false);
  const [isMishapi24PlayerVisible, setIsMishapi24PlayerVisible] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        setIsRadioPlayerVisible={setIsRadioPlayerVisible}
        setIsMishapi24PlayerVisible={setIsMishapi24PlayerVisible}
      />

      {/* Live Section */}
      <LiveSection />

      {/* News Section */}
      <NewsSection />
      
      {/* YouTube Videos Section */}
      <YouTubeSection />
      
      {/* Contact Section */}
      <ContactSection />

      {/* Floating Radio Players */}
      <FloatingPlayer 
        isVisible={isRadioPlayerVisible} 
        onClose={() => setIsRadioPlayerVisible(false)} 
        audioUrl="https://stream.zeno.fm/cgxrxyyhjsrtv" 
        title="MISHAPI VOICE Radio" 
      />
      
      <FloatingPlayer 
        isVisible={isMishapi24PlayerVisible} 
        onClose={() => setIsMishapi24PlayerVisible(false)} 
        audioUrl="https://stream.zeno.fm/t7anwdwtbluuv" 
        title="MISHAPI 24" 
      />
    </div>
  );
};

export default Index;
