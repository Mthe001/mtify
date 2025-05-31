"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Heart, MoreHorizontal, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlaylist } from "../../contexts/playlist-context";
import { useAudio } from "../../contexts/audio-context";

interface TrackListProps {
  tracks: Track[];
  showHeader?: boolean;
  showIndex?: boolean;
}

export function TrackList({
  tracks,
  showHeader = true,
  showIndex = true,
}: TrackListProps) {
  const { currentTrack, isPlaying, setQueue, play, pause } = useAudio();
  const { toggleLikeTrack, isTrackLiked, playlists, addTrackToPlaylist } =
    usePlaylist();
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const handlePlayTrack = (track: Track, index: number) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      setQueue(tracks, index);
      play(track);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isCurrentTrack = (trackId: string) => currentTrack?.id === trackId;

  return (
    <div className="space-y-2">
      {/* Header */}
      {showHeader && (
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2 text-zinc-400 text-sm border-b border-zinc-800">
          {showIndex && <div className="w-8 text-center">#</div>}
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div className="w-8"></div>
          <div className="w-12 text-center">
            <Clock className="h-4 w-4 mx-auto" />
          </div>
        </div>
      )}

      {/* Track List */}
      <div className="space-y-1">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors ${
              isCurrentTrack(track.id) ? "bg-zinc-800/30" : ""
            }`}
            onMouseEnter={() => setHoveredTrack(track.id)}
            onMouseLeave={() => setHoveredTrack(null)}
            onClick={() => handlePlayTrack(track, index)}
          >
            {/* Index/Play Button */}
            {showIndex && (
              <div className="w-8 flex items-center justify-center">
                {hoveredTrack === track.id || isCurrentTrack(track.id) ? (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-6 h-6 text-white hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayTrack(track, index);
                    }}
                  >
                    {isCurrentTrack(track.id) && isPlaying ? (
                      <Pause className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </Button>
                ) : (
                  <span
                    className={`text-sm ${
                      isCurrentTrack(track.id)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={track.imageUrl || "/placeholder.svg"}
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="min-w-0">
                <h4
                  className={`font-medium truncate ${
                    isCurrentTrack(track.id) ? "text-green-500" : "text-white"
                  }`}
                >
                  {track.title}
                </h4>
                <p className="text-zinc-400 text-sm truncate">{track.artist}</p>
              </div>
            </div>

            {/* Album */}
            <div className="hidden md:flex items-center">
              <span className="text-zinc-400 text-sm truncate">
                {track.album}
              </span>
            </div>

            {/* Like Button */}
            <div className="flex items-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeTrack(track);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white w-8 h-8"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isTrackLiked(track.id)
                      ? "fill-green-500 text-green-500 opacity-100"
                      : ""
                  }`}
                />
              </Button>
            </div>

            {/* Duration & More Options */}
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => e.stopPropagation()}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white w-8 h-8"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => toggleLikeTrack(track)}>
                    <Heart className="h-4 w-4 mr-2" />
                    {isTrackLiked(track.id)
                      ? "Remove from Liked Songs"
                      : "Add to Liked Songs"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {playlists.map((playlist) => (
                    <DropdownMenuItem
                      key={playlist.id}
                      onClick={() => addTrackToPlaylist(playlist.id, track)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to {playlist.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-zinc-400 text-sm w-12 text-center">
                {formatDuration(track.duration)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
