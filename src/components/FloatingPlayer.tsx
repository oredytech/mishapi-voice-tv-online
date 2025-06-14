
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

export default function FloatingPlayer({ onClose }: Partial<FloatingPlayerProps>) {
  const [isMinimized, setIsMinimized] = useState(false);
  const { currentTrack, isPlaying } = useAudio();

  // Afficher le lecteur flottant seulement s'il y a une piste en cours de lecture
  if (!currentTrack || !isPlaying) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between h-12">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="p-1 hover:bg-muted rounded-none transition-colors flex-shrink-0"
            title={isMinimized ? "Agrandir" : "Réduire"}
          >
            {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <div className={`flex-1 px-2 transition-all duration-300 ease-in-out ${
            isMinimized 
              ? "max-h-0 opacity-0 overflow-hidden" 
              : "max-h-10 opacity-100"
          }`}>
            <div className="flex items-center justify-center h-10">
              <AudioPlayer audioUrl={currentTrack.url} title={currentTrack.title} />
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-muted rounded-none transition-colors flex-shrink-0"
            title="Fermer"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
