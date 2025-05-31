"use client";

import { motion } from "motion/react";
import { Play, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAudio } from "../../contexts/audio-context";
import { useSearch } from "../../contexts/search-context";
import { usePlaylist } from "../../contexts/playlist-context";


export function SearchResults() {
  const { searchQuery, searchResults, isSearching } = useSearch();
  const { setQueue, play } = useAudio();
  const { toggleLikeTrack, isTrackLiked } = usePlaylist();

  const handlePlayTrack = (track: any, trackList: any[]) => {
    const index = trackList.findIndex((t) => t.id === track.id);
    setQueue(trackList, index);
    play(track);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isSearching) {
    return (
      <div className="h-full overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-black pb-32">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-white">Searching...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!searchQuery.trim()) {
    return null;
  }

  const { tracks, artists, albums } = searchResults;

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-black pb-32">
      <div className="p-6 space-y-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Search results for "{searchQuery}"
          </h1>
          <p className="text-zinc-400">
            Found {tracks.length} songs, {artists.length} artists,{" "}
            {albums.length} albums
          </p>
        </motion.div>

        {/* Top Result */}
        {tracks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-white">Top result</h2>
            <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 transition-colors cursor-pointer max-w-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={tracks[0].imageUrl || "/placeholder.svg"}
                    alt={tracks[0].title}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg mb-1 truncate">
                      {tracks[0].title}
                    </h3>
                    <p className="text-zinc-400 mb-2 truncate">
                      {tracks[0].artist}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        className="bg-green-500 hover:bg-green-400 text-black"
                        onClick={() => handlePlayTrack(tracks[0], tracks)}
                      >
                        <Play className="h-4 w-4 fill-black" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleLikeTrack(tracks[0])}
                        className="text-zinc-400 hover:text-white"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isTrackLiked(tracks[0].id)
                              ? "fill-green-500 text-green-500"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Songs */}
        {tracks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-white">Songs</h2>
            <div className="space-y-2">
              {tracks.slice(0, 10).map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="group flex items-center space-x-4 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer"
                  onClick={() => handlePlayTrack(track, tracks)}
                >
                  <div className="relative">
                    <img
                      src={track.imageUrl || "/placeholder.svg"}
                      alt={track.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50"
                    >
                      <Play className="h-4 w-4 text-white" />
                    </Button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">
                      {track.title}
                    </h4>
                    <p className="text-zinc-400 text-sm truncate">
                      {track.artist}
                    </p>
                  </div>

                  <div className="hidden md:block text-zinc-400 text-sm truncate max-w-32">
                    {track.album}
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeTrack(track);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isTrackLiked(track.id)
                          ? "fill-green-500 text-green-500"
                          : ""
                      }`}
                    />
                  </Button>

                  <div className="flex items-center text-zinc-400 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDuration(track.duration)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Artists */}
        {artists.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-white">Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {artists.slice(0, 8).map((artist, index) => (
                <motion.div
                  key={artist}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-zinc-800/30 border-zinc-700 hover:bg-zinc-700/50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {artist
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold truncate">
                        {artist}
                      </h3>
                      <p className="text-zinc-400 text-sm">Artist</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Albums */}
        {albums.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-white">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albums.slice(0, 8).map((album, index) => (
                <motion.div
                  key={album}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-zinc-800/30 border-zinc-700 hover:bg-zinc-700/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="w-full aspect-square mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {album
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold truncate">
                        {album}
                      </h3>
                      <p className="text-zinc-400 text-sm">Album</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* No Results */}
        {tracks.length === 0 && artists.length === 0 && albums.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              No results found
            </h2>
            <p className="text-zinc-400">
              Try searching with different keywords
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
