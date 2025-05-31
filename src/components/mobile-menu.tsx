"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Home, Search, Library, Heart, Plus, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaylist } from "../../contexts/playlist-context";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Search" },
  { icon: Library, label: "Your Library" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { playlists, likedSongs } = usePlaylist();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-zinc-900 dark:bg-zinc-950 z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Music className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">
                    Music
                  </span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onClose}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className={`w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800 ${
                      item.active ? "text-white bg-zinc-800" : ""
                    }`}
                    onClick={onClose}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
              </nav>

              {/* Liked Songs */}
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={onClose}
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

              {/* Create Playlist */}
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={onClose}
              >
                <Plus className="mr-3 h-5 w-5" />
                Create Playlist
              </Button>

              {/* User Playlists */}
              {playlists.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-zinc-400 text-sm font-medium px-2">
                    Your Playlists
                  </h3>
                  {playlists.map((playlist) => (
                    <Button
                      key={playlist.id}
                      variant="ghost"
                      className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm"
                      onClick={onClose}
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
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
