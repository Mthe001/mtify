"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchResults } from "@/components/search-results";
import { PlaylistDialog } from "@/components/playlist-dialog";
import { mockTracks, useSearch } from "../../contexts/search-context";
import { useAudio } from "../../contexts/audio-context";
import { TrackList } from "./track.list";

const generateDailyMix = (tracks: any[], mixNumber: number, count = 20) => {
  const shuffled = [...tracks].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const madeForYouItems = [
  {
    id: 1,
    title: "Daily Mix 01",
    description: "Cloke, Shiloh Dynasty, AXLEH and more",
    color: "from-cyan-500 to-blue-600",
    tracks: generateDailyMix(mockTracks, 1),
  },
  {
    id: 2,
    title: "Daily Mix 02",
    description: "Prateek Kuhad, Anuv Jain, Kushagra and...",
    color: "from-yellow-500 to-orange-600",
    tracks: generateDailyMix(mockTracks, 2),
  },
  {
    id: 3,
    title: "Daily Mix 03",
    description: "Topu, Bassbaba Sumon, Minar Rahman...",
    color: "from-red-500 to-pink-600",
    tracks: generateDailyMix(mockTracks, 3),
  },
  {
    id: 4,
    title: "Daily Mix 03",
    description: "Topu, Bassbaba Sumon, Minar Rahman...",
    color: "from-red-500 to-pink-600",
    tracks: generateDailyMix(mockTracks, 3),
  },
];

const jumpBackInItems = [
  {
    id: 1,
    title: "Shey Ke ?",
    artist: "Topu",
    tracks: [mockTracks[7]],
    imageUrl: "https://via.placeholder.com/150x150/6b7280/ffffff?text=SK",
  },
  {
    id: 2,
    title: "Habib Wahid",
    artist: "With Tahsan, Arfin Rumey, Minar Rahman...",
    tracks: [mockTracks[8]],
    imageUrl: "https://via.placeholder.com/150x150/10b981/ffffff?text=HW",
  },
  {
    id: 3,
    title: "Best of Romance: Atif Aslam & Pritam",
    artist: "Atif Aslam, Pritam",
    tracks: [mockTracks[9]],
    imageUrl: "https://via.placeholder.com/150x150/dc2626/ffffff?text=BR",
  },
];

export function MainContent() {
  const { setQueue, play } = useAudio();
  const { searchQuery, searchResults } = useSearch();
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState(mockTracks.slice(0, 4));

  const handlePlayMix = (tracks: any[], startIndex = 0) => {
    setQueue(tracks, startIndex);
    play(tracks[startIndex]);
  };

  const handlePlayTrack = (track: any, trackList: any[]) => {
    const index = trackList.findIndex((t) => t.id === track.id);
    setQueue(trackList, index);
    play(track);
  };

  // Show search results if there's a search query
  if (searchQuery.trim()) {
    return <SearchResults />;
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-black pb-32">
      <div className="p-6 space-y-8">
        {/* Quick Access / Recently Played */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recently Played</h2>
            <Button variant="link" className="text-zinc-400 hover:text-white">
              Show all
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recentlyPlayed.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 transition-colors cursor-pointer">
                  <CardContent className="p-3 flex items-center space-x-3">
                    <img
                      src={track.imageUrl || "/placeholder.svg"}
                      alt={track.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">
                        {track.title}
                      </h4>
                      <p className="text-zinc-400 text-sm truncate">
                        {track.artist}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handlePlayTrack(track, recentlyPlayed)}
                    >
                      <Play className="h-4 w-4 text-white" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Made For You */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Made For You</h2>
            <Button variant="link" className="text-zinc-400 hover:text-white">
              Show all
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {madeForYouItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="bg-zinc-800/30 border-zinc-700 hover:bg-zinc-700/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <div
                        className={`w-full aspect-square rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}
                      >
                        <span className="text-white text-4xl font-bold">
                          {item.title.split(" ")[2]}
                        </span>
                      </div>
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        onClick={() => handlePlayMix(item.tracks)}
                      >
                        <Play className="h-4 w-4 text-black fill-black" />
                      </Button>
                    </div>
                    <h3 className="text-white font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Jump Back In */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Jump back in</h2>
            <Button variant="link" className="text-zinc-400 hover:text-white">
              Show all
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jumpBackInItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="bg-zinc-800/30 border-zinc-700 hover:bg-zinc-700/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full aspect-square rounded-lg object-cover"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        onClick={() => handlePlayMix(item.tracks)}
                      >
                        <Play className="h-4 w-4 text-black fill-black" />
                      </Button>
                    </div>
                    <h3 className="text-white font-semibold mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-2">
                      {item.artist}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* All Tracks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">All Songs</h2>
            <Button
              onClick={() => setShowPlaylistDialog(true)}
              className="bg-green-500 hover:bg-green-400 text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </div>

          <TrackList tracks={mockTracks} />
        </motion.section>
      </div>

      <PlaylistDialog
        open={showPlaylistDialog}
        onOpenChange={setShowPlaylistDialog}
      />
    </div>
  );
}
