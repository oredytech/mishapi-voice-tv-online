
import { useState, useRef, useEffect } from 'react';
import { Volume, Volume1, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AudioPlayer({ audioUrl, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolumeRef = useRef(volume);

  useEffect(() => {
    // Mettre à jour l'URL de l'audio si elle change
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
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
    <div className="flex items-center p-2">
      <audio ref={audioRef} src={audioUrl} preload="none" />
      
      <Button 
        variant="outline" 
        size="icon"
        className={`mr-2 ${isPlaying ? 'bg-primary text-primary-foreground' : ''}`}
        onClick={togglePlay}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </Button>
      
      <div className="flex-1 mx-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
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
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="mt-1 text-sm font-medium">
          {title}
          {isPlaying && (
            <span className="ml-2 text-primary flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse-live"></span>
              En direct
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
