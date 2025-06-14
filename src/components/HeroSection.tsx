import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/contexts/AudioContext';
import FloatingPlayer from '@/components/FloatingPlayer';

interface HeroSectionProps {
  setIsRadioPlayerVisible: (isVisible: boolean) => void;
  setIsMishapi24PlayerVisible: (isVisible: boolean) => void;
}

export function HeroSection({ setIsRadioPlayerVisible, setIsMishapi24PlayerVisible }: HeroSectionProps) {
  const { playAudio } = useAudio();

  const handleRadioClick = () => {
    playAudio("https://stream.zeno.fm/cgxrxyyhjsrtv", "MISHAPI VOICE / GOMA");
    setIsRadioPlayerVisible(true);
  };

  const handleMishapi24Click = () => {
    playAudio("https://stream.zeno.fm/t7anwdwtbluuv", "RADIO MISHAPI 24 KINSHASA");
    setIsMishapi24PlayerVisible(true);
  };

  return (
    <section 
      className="pt-12 pb-16 bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/lovable-uploads/0ee99787-f0d1-4243-ae03-35c677a85f06.png")' }}
    >
      {/* Dark overlay to ensure text readability over the background image */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="font-bold leading-tight mb-4 text-4xl md:text-5xl text-white">
            MISHAPI VOICE TV
            <span className="text-primary block mt-2 text-base md:text-lg">La vision Africaine dans le Monde</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="btn-tv" asChild>
              <Link to="/tv">
                Regarder la TV en direct
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button className="btn-radio" onClick={handleRadioClick}>
              RADIO MISHAPI VOICE GOMA
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button variant="secondary" onClick={handleMishapi24Click}>
              RADIO MISHAPI 24 KINSHASA
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2 text-white/90">Également disponible sur:</p>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center px-3 py-1 border border-white/20 bg-black/50 backdrop-blur-sm rounded-md">
                <img alt="Canal+" className="h-5 mr-2" src="/lovable-uploads/4cb2b446-5308-4cf3-a5d6-71657789fd7d.jpg" />
                <span className="text-sm text-white">Canal 373</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
