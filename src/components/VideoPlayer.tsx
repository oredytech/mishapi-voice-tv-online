
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
    // Isoler uniquement le lecteur vidéo et bloquer tout le reste
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // Créer une feuille de style pour masquer tout sauf le player
            const style = iframeDoc.createElement('style');
            style.textContent = `
              /* Masquer complètement l'en-tête et la navigation */
              header, .header, nav, .nav, .navbar, .navigation, .menu, .top-bar {
                display: none !important;
                visibility: hidden !important;
              }
              
              /* Masquer footer et éléments de bas de page */
              footer, .footer, .bottom-bar {
                display: none !important;
              }
              
              /* Masquer sidebars et contenus latéraux */
              .sidebar, .aside, .widget, .ad, .advertisement, .banner {
                display: none !important;
              }
              
              /* Bloquer complètement le défilement sur tout */
              html, body {
                overflow: hidden !important;
                height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
                position: fixed !important;
                width: 100% !important;
                background: #000 !important;
              }
              
              /* Masquer toutes les fenêtres surgissantes et modales */
              .modal, .popup, .overlay, .dialog, .alert, .notification,
              [role="dialog"], [role="alertdialog"], [role="modal"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                z-index: -1 !important;
              }
              
              /* Cibler spécifiquement le conteneur du lecteur vidéo */
              .video-container, .player-container, .stream-container,
              [class*="video"], [class*="player"], [class*="stream"],
              [id*="video"], [id*="player"], [id*="stream"] {
                width: 100% !important;
                height: 100vh !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                z-index: 999999 !important;
                background: #000 !important;
              }
              
              /* Masquer tous les autres éléments du body */
              body > *:not([class*="video"]):not([class*="player"]):not([class*="stream"]):not(script):not(style) {
                display: none !important;
              }
              
              /* S'assurer que les éléments vidéo prennent tout l'espace */
              video, iframe[src*="video"], iframe[src*="stream"], iframe[src*="player"] {
                width: 100% !important;
                height: 100% !important;
                max-width: none !important;
                max-height: none !important;
              }
              
              /* Bloquer la sélection de texte */
              * {
                user-select: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                overflow: hidden !important;
              }
              
              /* Masquer les contrôles externes */
              .controls:not(video .controls), .ui-controls, .external-controls {
                display: none !important;
              }
              
              /* Bloquer les messages d'erreur et alertes */
              .error, .warning, .alert-message, .toast {
                display: none !important;
              }
            `;
            iframeDoc.head.appendChild(style);
            
            // Script pour forcer la mise en page du lecteur
            const script = iframeDoc.createElement('script');
            script.textContent = `
              // Fonction pour identifier et isoler le lecteur vidéo
              function isolateVideoPlayer() {
                // Chercher les éléments vidéo
                const videoElements = document.querySelectorAll('video, iframe[src*="video"], iframe[src*="stream"], [class*="video"], [class*="player"], [class*="stream"]');
                
                if (videoElements.length > 0) {
                  videoElements.forEach(el => {
                    el.style.cssText = 'width: 100% !important; height: 100vh !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 999999 !important;';
                  });
                }
                
                // Masquer tous les autres éléments
                const allElements = document.querySelectorAll('body > *');
                allElements.forEach(el => {
                  if (!el.matches('video, iframe[src*="video"], iframe[src*="stream"], [class*="video"], [class*="player"], [class*="stream"], script, style')) {
                    el.style.display = 'none';
                  }
                });
              }
              
              // Exécuter immédiatement et après chargement
              isolateVideoPlayer();
              document.addEventListener('DOMContentLoaded', isolateVideoPlayer);
              
              // Surveiller les changements DOM pour bloquer les nouveaux éléments
              const observer = new MutationObserver(isolateVideoPlayer);
              observer.observe(document.body, { childList: true, subtree: true });
            `;
            iframeDoc.head.appendChild(script);
            
            // Bloquer tous les événements de défilement et interaction indésirable
            const preventAll = (e) => {
              if (e.target && !e.target.matches('video, video *, [class*="video"] *, [class*="player"] *')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            };
            
            ['scroll', 'wheel', 'touchmove', 'contextmenu'].forEach(event => {
              iframeDoc.addEventListener(event, preventAll, { passive: false, capture: true });
            });
            
            // Bloquer les touches de défilement
            iframeDoc.addEventListener('keydown', (e) => {
              if ([32, 33, 34, 35, 36, 37, 38, 39, 40, 27].includes(e.keyCode)) {
                e.preventDefault();
                e.stopPropagation();
              }
            }, { passive: false });
          }
        } catch (error) {
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
      {/* Lecteur vidéo intégré optimisé */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          ref={iframeRef}
          src="https://afriqueendirect.tv/mishapi_voice_tv"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups-to-escape-sandbox"
          style={{
            pointerEvents: 'auto',
            overflow: 'hidden'
          }}
          scrolling="no"
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
