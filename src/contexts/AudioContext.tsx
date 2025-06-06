
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: {
    url: string;
    title: string;
  } | null;
  volume: number;
  isMuted: boolean;
  playAudio: (url: string, title: string) => void;
  pauseAudio: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ url: string; title: string } | null>(null);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolumeRef = useRef(volume);

  const playAudio = (url: string, title: string) => {
    if (audioRef.current) {
      if (currentTrack?.url !== url) {
        audioRef.current.src = url;
        setCurrentTrack({ url, title });
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Erreur de lecture audio:", error);
        setIsPlaying(false);
      });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else if (currentTrack) {
      playAudio(currentTrack.url, currentTrack.title);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        setVolume(previousVolumeRef.current);
      } else {
        previousVolumeRef.current = volume;
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <AudioContext.Provider value={{
      isPlaying,
      currentTrack,
      volume,
      isMuted,
      playAudio,
      pauseAudio,
      togglePlay,
      setVolume,
      toggleMute,
      audioRef
    }}>
      {children}
      <audio 
        ref={audioRef} 
        preload="none"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onError={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
