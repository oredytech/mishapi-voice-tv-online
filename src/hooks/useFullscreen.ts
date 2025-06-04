
import { useState, useRef, useEffect } from 'react';

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'fullscreenChange') {
        setIsFullscreen(event.data.isFullscreen);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('message', handleMessage);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const enterFullscreen = () => {
    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Erreur: impossible de passer en plein écran: ${err.message}`);
      });
      
      // Synchroniser avec l'iframe
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({ 
          type: 'toggleFullscreen', 
          enterFullscreen: true 
        }, '*');
      }
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      
      // Synchroniser avec l'iframe
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({ 
          type: 'toggleFullscreen', 
          enterFullscreen: false 
        }, '*');
      }
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  return {
    isFullscreen,
    containerRef,
    iframeRef,
    toggleFullscreen
  };
}
