
import { useEffect } from 'react';
import { createIframeStyles, createIframeScript } from '@/utils/iframeStyles';

export function useIframeSetup(iframeRef: React.RefObject<HTMLIFrameElement>) {
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // Créer et ajouter les styles
            const style = iframeDoc.createElement('style');
            style.textContent = createIframeStyles();
            iframeDoc.head.appendChild(style);
            
            // Créer et ajouter le script
            const script = iframeDoc.createElement('script');
            script.textContent = createIframeScript();
            iframeDoc.head.appendChild(script);
            
            // Bloquer tous les événements de défilement et interaction indésirable
            const preventAll = (e: Event) => {
              if (e.target && !(e.target as Element).matches('video, video *, [class*="video"] *, [class*="player"] *')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            };
            
            ['scroll', 'wheel', 'touchmove', 'contextmenu'].forEach(event => {
              iframeDoc.addEventListener(event, preventAll, { passive: false, capture: true });
            });
            
            // Bloquer les touches de défilement
            iframeDoc.addEventListener('keydown', (e: KeyboardEvent) => {
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
  }, [iframeRef]);
}
