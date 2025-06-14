
import { useFullscreen } from '@/hooks/useFullscreen';
import { useIframeSetup } from '@/hooks/useIframeSetup';
import { useAudio } from '@/contexts/AudioContext';
import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  poster?: string;
}

export function VideoPlayer({
  title
}: VideoPlayerProps) {
  const {
    isFullscreen,
    containerRef,
    iframeRef,
    toggleFullscreen
  } = useFullscreen();
  
  const { setVideoPlaying, isVideoPlaying } = useAudio();
  const hasStartedPlayingRef = useRef(false);
  
  useIframeSetup(iframeRef);

  // Monitor when video starts playing
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleIframeLoad = () => {
      // Assume video starts playing when iframe loads and user is on video page
      if (!hasStartedPlayingRef.current) {
        hasStartedPlayingRef.current = true;
        setVideoPlaying(true);
      }
    };

    // Listen for iframe load events
    iframe.addEventListener('load', handleIframeLoad);

    // Also set video as playing when component mounts (user navigated to video page)
    if (!hasStartedPlayingRef.current) {
      hasStartedPlayingRef.current = true;
      setVideoPlaying(true);
    }

    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
      // Reset video playing state when component unmounts
      setVideoPlaying(false);
      hasStartedPlayingRef.current = false;
    };
  }, [setVideoPlaying]);

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-lg bg-black">
      {/* Lecteur vidéo intégré */}
      <div className="relative w-full" style={{
        paddingBottom: '56.25%'
      }}>
        <iframe 
          ref={iframeRef} 
          src="https://afriqueendirect.tv/mishapi_voice_tv" 
          className="absolute top-0 left-0 w-full h-full border-0" 
          allowFullScreen 
          allow="autoplay; encrypted-media; fullscreen" 
          title={title} 
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups-to-escape-sandbox" 
          style={{
            pointerEvents: 'auto'
          }} 
          scrolling="yes" 
          frameBorder="0" 
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
        </div>
      </div>
    </div>
  );
}
