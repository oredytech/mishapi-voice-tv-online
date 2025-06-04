
export const createIframeStyles = () => `
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
  
  /* Repositionner le body pour commencer au niveau du player */
  html, body {
    overflow: hidden !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    position: fixed !important;
    width: 100% !important;
    background: #000 !important;
    transform: translateY(-25%) !important;
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
    height: 125% !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 999999 !important;
    background: #000 !important;
    transform: none !important;
  }
  
  /* Masquer tous les autres éléments du body sauf le player */
  body > *:not([class*="video"]):not([class*="player"]):not([class*="stream"]):not(script):not(style) {
    display: none !important;
  }
  
  /* S'assurer que les éléments vidéo prennent tout l'espace */
  video, iframe[src*="video"], iframe[src*="stream"], iframe[src*="player"] {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    transform: none !important;
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

export const createIframeScript = () => `
  // Fonction pour identifier et isoler le lecteur vidéo
  function isolateVideoPlayer() {
    // Chercher les éléments vidéo
    const videoElements = document.querySelectorAll('video, iframe[src*="video"], iframe[src*="stream"], [class*="video"], [class*="player"], [class*="stream"]');
    
    if (videoElements.length > 0) {
      videoElements.forEach(el => {
        el.style.cssText = 'width: 100% !important; height: 125% !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 999999 !important; transform: none !important;';
      });
    }
    
    // Repositionner le body pour commencer au niveau du player
    document.body.style.transform = 'translateY(-25%)';
    document.documentElement.style.transform = 'translateY(-25%)';
    
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
  
  // Détecter les changements de plein écran dans l'iframe et communiquer avec le parent
  function handleFullscreenChange() {
    const isFullscreen = !!document.fullscreenElement || !!document.webkitFullscreenElement || !!document.mozFullScreenElement;
    window.parent.postMessage({ type: 'fullscreenChange', isFullscreen }, '*');
  }
  
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  
  // Écouter les messages du parent pour synchroniser le plein écran
  window.addEventListener('message', (event) => {
    if (event.data.type === 'toggleFullscreen') {
      const videoElement = document.querySelector('video, [class*="video"], [class*="player"]');
      if (videoElement) {
        if (event.data.enterFullscreen) {
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
          } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
          } else if (videoElement.mozRequestFullScreen) {
            videoElement.mozRequestFullScreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          }
        }
      }
    }
  });
`;
