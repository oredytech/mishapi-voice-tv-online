
import { useState, useEffect } from 'react';
import { Volume, Volume1, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/contexts/AudioContext';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const { isPlaying, currentTrack, volume, isMuted, playAudio, pauseAudio, setVolume, toggleMute } = useAudio();
  const [isLoading, setIsLoading] = useState(false);
  
  const isCurrentTrack = currentTrack?.url === audioUrl;
  const isThisTrackPlaying = isCurrentTrack && isPlaying;

  const togglePlay = () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        pauseAudio();
      } else {
        setIsLoading(true);
        playAudio(audioUrl, title);
      }
    } else {
      setIsLoading(true);
      playAudio(audioUrl, title);
    }
  };

  // Écouter les événements de chargement audio
  useEffect(() => {
    if (isCurrentTrack && isPlaying) {
      setIsLoading(false);
    }
  }, [isCurrentTrack, isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={14} />;
    } else if (volume < 0.33) {
      return <Volume size={14} />;
    } else if (volume < 0.66) {
      return <Volume1 size={14} />;
    } else {
      return <Volume2 size={14} />;
    }
  };

  return (
    <div className="flex items-center w-full max-w-4xl mx-auto px-2 gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className={`h-7 w-7 p-0 transition-all flex-shrink-0 ${isThisTrackPlaying ? 'bg-primary text-primary-foreground' : ''}`}
        onClick={togglePlay}
        disabled={isLoading}
        title={isThisTrackPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isThisTrackPlaying ? (
          <Pause size={12} />
        ) : (
          <Play size={12} />
        )}
      </Button>
      
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate flex items-center">
          {isLoading && (
            <div className="flex items-center mr-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-1"></div>
              <span className="text-primary text-xs">Connexion...</span>
            </div>
          )}
          <span className={isLoading ? 'text-muted-foreground' : ''}>
            {title}
          </span>
          {isThisTrackPlaying && !isLoading && (
            <span className="ml-2 text-primary inline-flex items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1 animate-pulse"></span>
              En direct
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
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
          className="w-12 h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`
          }}
        />
        <span className="text-xs text-muted-foreground min-w-[2ch] text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}
