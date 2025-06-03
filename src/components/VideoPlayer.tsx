
import { useState, useRef, useEffect } from 'react';
import { Volume, Volume1, Volume2, VolumeX, Play, Pause, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  poster?: string;
}

export function VideoPlayer({ title }: VideoPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Erreur: impossible de passer en plein écran: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-lg bg-black">
      {/* Lecteur vidéo intégré d'afriqueendirect.tv */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src="https://afriqueendirect.tv/mishapi_voice_tv"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title={title}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">        
        <div className="flex items-center justify-between">
          <div className="flex items-center">            
            <span className="text-white text-xs">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                En direct
              </span>
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-white text-sm mr-2 hidden sm:block">{title}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
