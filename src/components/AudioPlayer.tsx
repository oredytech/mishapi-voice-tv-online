
import { useState, useRef, useEffect } from 'react';
import { Volume, Volume1, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolumeRef = useRef(volume);

  useEffect(() => {
    // Mettre à jour l'URL de l'audio si elle change
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.volume = volume;
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    }
  }, [audioUrl]);

  useEffect(() => {
    // Écouter l'événement d'autoplay
    const handleAutoplay = (event: CustomEvent) => {
      if (event.detail.url === audioUrl) {
        togglePlay();
      }
    };

    window.addEventListener('autoplay-radio', handleAutoplay as EventListener);
    return () => {
      window.removeEventListener('autoplay-radio', handleAutoplay as EventListener);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    console.error("Erreur de chargement audio");
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        setVolume(previousVolumeRef.current);
        audioRef.current.volume = previousVolumeRef.current;
      } else {
        previousVolumeRef.current = volume;
        setVolume(0);
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={18} />;
    } else if (volume < 0.33) {
      return <Volume size={18} />;
    } else if (volume < 0.66) {
      return <Volume1 size={18} />;
    } else {
      return <Volume2 size={18} />;
    }
  };

  return (
    <div className="flex items-center p-3 bg-card border rounded-lg">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        preload="none"
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPause={() => setIsPlaying(false)}
      />
      
      <Button 
        variant="outline" 
        size="icon"
        className={`mr-3 transition-all ${isPlaying ? 'bg-primary text-primary-foreground' : ''} ${isLoading ? 'opacity-50' : ''}`}
        onClick={togglePlay}
        disabled={isLoading}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause size={18} />
        ) : (
          <Play size={18} />
        )}
      </Button>
      
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-8 w-8"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {getVolumeIcon()}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`
            }}
          />
          <span className="ml-2 text-xs text-muted-foreground min-w-[3ch]">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <div className="text-sm font-medium truncate">
          {title}
          {isPlaying && (
            <span className="ml-2 text-primary flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse"></span>
              En direct
            </span>
          )}
          {isLoading && (
            <span className="ml-2 text-muted-foreground text-xs">
              Connexion...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
