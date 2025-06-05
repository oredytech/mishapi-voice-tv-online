
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
          }
        } catch (error) {
          console.log('Cross-origin restrictions - styling not applied');
        }
      };
    }
  }, [iframeRef]);
}
