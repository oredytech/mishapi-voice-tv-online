
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="p-3 hover:bg-muted rounded-none transition-colors"
            title={isMinimized ? "Agrandir" : "Réduire"}
          >
            {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          <div className={`flex-1 px-2 transition-all duration-300 ease-in-out ${
            isMinimized 
              ? "max-h-0 opacity-0 overflow-hidden" 
              : "max-h-24 opacity-100 py-2"
          }`}>
            <AudioPlayer audioUrl={audioUrl} title={title} />
          </div>
          
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-muted rounded-none transition-colors"
            title="Fermer"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
