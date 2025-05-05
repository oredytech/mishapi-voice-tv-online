
import { useState } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

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

  if (!isVisible) return null;

  return (
    <div className="player-container">
      <div className="container mx-auto">
        <div className="flex items-center justify-between bg-card rounded-t-lg shadow-lg">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="p-2 hover:bg-muted rounded-full ml-2"
            title={isMinimized ? "Agrandir" : "Réduire"}
          >
            {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <div className={`flex-1 transition-all duration-300 ${isMinimized ? "max-h-0 opacity-0 invisible" : "max-h-20 opacity-100 visible"}`}>
            <AudioPlayer audioUrl={audioUrl} title={title} />
          </div>
          
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-muted rounded-full mr-2"
            title="Fermer"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
