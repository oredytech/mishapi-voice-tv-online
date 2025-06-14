
import { useState } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { useAudio } from '@/contexts/AudioContext';

interface FloatingPlayerProps {
  isVisible: boolean;
  onClose: () => void;
  audioUrl: string;
  title: string;
}

export default function FloatingPlayer({ 
  isVisible, 
  onClose, 
  audioUrl, 
  title 
}: FloatingPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const { currentTrack, isPlaying } = useAudio();

  // Afficher le lecteur flottant seulement s'il y a une piste en cours de lecture
  if (!isVisible || !currentTrack || !isPlaying) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="p-2 hover:bg-muted rounded-none transition-colors flex-shrink-0"
            title={isMinimized ? "Agrandir" : "Réduire"}
          >
            {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <div className={`flex-1 px-2 transition-all duration-300 ease-in-out ${
            isMinimized 
              ? "max-h-0 opacity-0 overflow-hidden" 
              : "max-h-12 opacity-100"
          }`}>
            <div className="flex items-center justify-center h-12">
              <AudioPlayer audioUrl={currentTrack.url} title={currentTrack.title} />
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-muted rounded-none transition-colors flex-shrink-0"
            title="Fermer"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
