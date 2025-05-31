"use client";

import { motion } from "motion/react";
import { Home, Search, Library, Heart, Plus, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlaylist } from "../../contexts/playlist-context";
import { useSearch } from "../../contexts/search-context";


const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Search" },
  { icon: Library, label: "Your Library" },
];

export function Sidebar() {
  const { playlists, likedSongs } = usePlaylist();
  const { setSearchQuery } = useSearch();

  const handleSearchClick = () => {
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="bg-zinc-900 dark:bg-zinc-950 h-full p-6 border-r border-zinc-800 overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Music className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">Music</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800",
                  item.active && "text-white bg-zinc-800"
                )}
                onClick={
                  item.label === "Search" ? handleSearchClick : undefined
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </motion.div>
          ))}
        </nav>

        {/* Liked Songs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <div className="mr-3 h-5 w-5 bg-gradient-to-br from-purple-700 to-blue-300 rounded-sm flex items-center justify-center">
              <Heart className="h-3 w-3 text-white fill-white" />
            </div>
            Liked Songs
            {likedSongs.length > 0 && (
              <span className="ml-auto text-xs bg-green-500 text-black px-2 py-1 rounded-full">
                {likedSongs.length}
              </span>
            )}
          </Button>
        </motion.div>

        {/* Create Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Plus className="mr-3 h-5 w-5" />
            Create Playlist
          </Button>
        </motion.div>

        {/* User Playlists */}
        {playlists.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-zinc-400 text-sm font-medium px-2">
              Your Playlists
            </h3>
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm"
                >
                  <div className="mr-3 h-5 w-5 bg-zinc-600 rounded-sm flex items-center justify-center">
                    <Music className="h-3 w-3 text-white" />
                  </div>
                  <span className="truncate">{playlist.name}</span>
                  {playlist.tracks.length > 0 && (
                    <span className="ml-auto text-xs text-zinc-500">
                      {playlist.tracks.length}
                    </span>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
