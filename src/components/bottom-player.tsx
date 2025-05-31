"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  PictureInPicture,
  List,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import { useAudio } from "../../contexts/audio-context";
import { usePlaylist } from "../../contexts/playlist-context";

export function BottomPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffled,
    repeatMode,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = useAudio();

  const { toggleLikeTrack, isTrackLiked } = usePlaylist();
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (vol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressChange = (newProgress: number[]) => {
    const time = (newProgress[0] / 100) * duration;
    seekTo(time);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800 p-4 z-50"
    >
      <div className="grid grid-cols-3 items-center gap-4">
        {/* Left: Current Song Info */}
        <div className="flex items-center space-x-3 min-w-0">
          <img
            src={currentTrack.imageUrl || "/placeholder.svg"}
            alt={currentTrack.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium truncate">
              {currentTrack.title}
            </h4>
            <p className="text-zinc-400 text-sm truncate">
              {currentTrack.artist}
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => toggleLikeTrack(currentTrack)}
            className="text-zinc-400 hover:text-white shrink-0"
          >
            <Heart
              className={`h-4 w-4 ${
                isTrackLiked(currentTrack.id)
                  ? "fill-green-500 text-green-500"
                  : ""
              }`}
            />
          </Button>
        </div>

        {/* Center: Player Controls */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleShuffle}
              className={`text-zinc-400 hover:text-white ${
                isShuffled ? "text-green-500" : ""
              }`}
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
              onClick={previousTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              onClick={togglePlayPause}
              className="bg-white hover:bg-gray-200 text-black w-8 h-8"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
              onClick={nextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={toggleRepeat}
              className={`text-zinc-400 hover:text-white ${
                repeatMode !== "off" ? "text-green-500" : ""
              }`}
            >
              {repeatMode === "one" ? (
                <Repeat1 className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-zinc-400 text-xs w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span className="text-zinc-400 text-xs w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume and Additional Controls */}
        <div className="flex items-center justify-end space-x-2">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hidden md:flex"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hidden md:flex"
          >
            <PictureInPicture className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-2 hidden md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleMute}
              className="text-zinc-400 hover:text-white"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-20"
            />
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hidden lg:flex"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
