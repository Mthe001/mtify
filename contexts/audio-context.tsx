"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  audioUrl: string;
  imageUrl: string;
  genre?: string;
  year?: number;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: "off" | "all" | "one";
  queue: Track[];
  currentIndex: number;
  play: (track?: Track) => void;
  pause: () => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (track: Track) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  removeFromQueue: (index: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(75);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [queue, setQueueState] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [originalQueue, setOriginalQueue] = useState<Track[]>([]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };
    const handleLoadedData = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadeddata", handleLoadedData);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [repeatMode]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const play = useCallback(
    (track?: Track) => {
      if (!audioRef.current) return;

      if (track && track !== currentTrack) {
        setCurrentTrack(track);
        audioRef.current.src = track.audioUrl;
        audioRef.current.load();
      }

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.error);
    },
    [currentTrack]
  );

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;

    let nextIndex = currentIndex + 1;
    if (nextIndex >= queue.length) {
      if (repeatMode === "all") {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    setCurrentIndex(nextIndex);
    const nextTrack = queue[nextIndex];
    if (nextTrack) {
      play(nextTrack);
    }
  }, [queue, currentIndex, repeatMode, play]);

  const previousTrack = useCallback(() => {
    if (queue.length === 0) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    setCurrentIndex(prevIndex);
    const prevTrack = queue[prevIndex];
    if (prevTrack) {
      play(prevTrack);
    }
  }, [queue, currentIndex, play]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
  }, []);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const toggleShuffle = useCallback(() => {
    if (!isShuffled) {
      // Enable shuffle
      setOriginalQueue([...queue]);
      const currentTrack = queue[currentIndex];
      const shuffledQueue = shuffleArray(queue);
      const newIndex = shuffledQueue.findIndex(
        (track) => track.id === currentTrack?.id
      );
      setQueueState(shuffledQueue);
      setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    } else {
      // Disable shuffle
      const currentTrack = queue[currentIndex];
      setQueueState(originalQueue);
      const newIndex = originalQueue.findIndex(
        (track) => track.id === currentTrack?.id
      );
      setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    }
    setIsShuffled(!isShuffled);
  }, [isShuffled, queue, currentIndex, originalQueue]);

  const toggleRepeat = useCallback(() => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  }, [repeatMode]);

  const addToQueue = useCallback((track: Track) => {
    setQueueState((prev) => [...prev, track]);
  }, []);

  const setQueue = useCallback((tracks: Track[], startIndex = 0) => {
    setQueueState(tracks);
    setOriginalQueue(tracks);
    setCurrentIndex(startIndex);
    if (tracks[startIndex]) {
      setCurrentTrack(tracks[startIndex]);
    }
  }, []);

  const removeFromQueue = useCallback(
    (index: number) => {
      setQueueState((prev) => {
        const newQueue = prev.filter((_, i) => i !== index);
        if (index < currentIndex) {
          setCurrentIndex((prev) => prev - 1);
        } else if (index === currentIndex && newQueue.length > 0) {
          const newIndex = Math.min(currentIndex, newQueue.length - 1);
          setCurrentIndex(newIndex);
          if (newQueue[newIndex]) {
            play(newQueue[newIndex]);
          }
        }
        return newQueue;
      });
    },
    [currentIndex, play]
  );

  const value: AudioContextType = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffled,
    repeatMode,
    queue,
    currentIndex,
    play,
    pause,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    setQueue,
    removeFromQueue,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}
