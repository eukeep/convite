import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { MUSIC_URL } from '../constants';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio started successfully
            })
            .catch((error) => {
              // Auto-play was prevented. This is expected on modern browsers without user interaction.
              // We log a warning instead of an error and revert the state.
              console.warn("Autoplay prevented by browser policy. Music will start on first interaction.");
              setIsPlaying(false);
            });
        }
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        preload="auto"
      />
      
      <div className="bg-amber-800 p-2 rounded-lg border-4 border-amber-950 shadow-xl flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform">
        <div className="bg-black/80 rounded-full p-2 border-2 border-gray-400">
           {isPlaying ? (
             <div className="animate-pulse text-green-400">
                <Volume2 size={24} />
             </div>
           ) : (
             <div className="text-red-500">
                <VolumeX size={24} />
             </div>
           )}
        </div>
        
        <div className="flex flex-col">
            <span className="text-xs text-amber-100 font-mono uppercase tracking-widest">Boteco FM</span>
            <button 
                onClick={togglePlay}
                className="text-white font-bold text-sm bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 active:translate-y-1 transition-all"
            >
                {isPlaying ? 'PAUSAR' : 'TOCAR'}
            </button>
        </div>
        
        {/* Decorative Antenna */}
        <div className="absolute -top-6 right-2 w-1 h-8 bg-gray-400 -rotate-12 rounded-t-full origin-bottom"></div>
      </div>
    </div>
  );
};

export default AudioPlayer;