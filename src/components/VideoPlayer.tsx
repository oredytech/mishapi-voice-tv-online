
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // Injecter du CSS pour masquer les éléments indésirables
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // Créer une feuille de style pour masquer les éléments indésirables
            const style = iframeDoc.createElement('style');
            style.textContent = `
              /* Masquer tous les éléments sauf le player vidéo */
              body > *:not(video):not([class*="video"]):not([id*="video"]):not([class*="player"]):not([id*="player"]) {
                display: none !important;
              }
              
              /* Masquer les barres de navigation, headers, footers */
              header, nav, footer, .header, .nav, .footer, .navigation, .menu {
                display: none !important;
              }
              
              /* Masquer les sidebars et contenus latéraux */
              .sidebar, .aside, .widget, .ad, .advertisement {
                display: none !important;
              }
              
              /* Bloquer le défilement */
              html, body {
                overflow: hidden !important;
                height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              
              /* Masquer les popups et modales */
              .modal, .popup, .overlay, .dialog, [role="dialog"], [role="alertdialog"] {
                display: none !important;
              }
              
              /* S'assurer que le player vidéo prend tout l'espace */
              video, [class*="video"], [id*="video"], [class*="player"], [id*="player"] {
                width: 100% !important;
                height: 100vh !important;
                max-width: none !important;
                max-height: none !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                z-index: 9999 !important;
              }
              
              /* Masquer les contrôles externes */
              .controls:not(video .controls), .ui-controls, .external-controls {
                display: none !important;
              }
              
              /* Empêcher la sélection de texte */
              * {
                user-select: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
              }
            `;
            iframeDoc.head.appendChild(style);
            
            // Bloquer les événements de défilement
            iframeDoc.addEventListener('scroll', (e) => e.preventDefault());
            iframeDoc.addEventListener('wheel', (e) => e.preventDefault());
            iframeDoc.addEventListener('touchmove', (e) => e.preventDefault());
          }
        } catch (error) {
          // Ignorer les erreurs de cross-origin
          console.log('Cross-origin restrictions - styling not applied');
        }
      };
    }
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
          ref={iframeRef}
          src="https://afriqueendirect.tv/mishapi_voice_tv"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-presentation"
          style={{
            pointerEvents: 'auto',
            overflow: 'hidden'
          }}
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
