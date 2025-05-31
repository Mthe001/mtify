"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { Track } from "./audio-context";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
  createdAt: Date;
  isLiked?: boolean;
}

interface PlaylistContextType {
  playlists: Playlist[];
  likedSongs: Track[];
  createPlaylist: (name: string, description?: string) => Playlist;
  deletePlaylist: (id: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  toggleLikeTrack: (track: Track) => void;
  isTrackLiked: (trackId: string) => boolean;
  updatePlaylist: (id: string, updates: Partial<Playlist>) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
}

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("music-playlists");
    const savedLikedSongs = localStorage.getItem("music-liked-songs");

    if (savedPlaylists) {
      try {
        const parsed = JSON.parse(savedPlaylists);
        setPlaylists(
          (parsed as Playlist[]).map((p: Playlist) => ({
            ...p,
            createdAt: new Date(p.createdAt),
          }))
        );
      } catch (error) {
        console.error("Failed to parse playlists:", error);
      }
    }

    if (savedLikedSongs) {
      try {
        setLikedSongs(JSON.parse(savedLikedSongs));
      } catch (error) {
        console.error("Failed to parse liked songs:", error);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("music-playlists", JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem("music-liked-songs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const createPlaylist = (name: string, description = "") => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      imageUrl: `https://via.placeholder.com/300x300/f97316/ffffff?text=${encodeURIComponent(
        name.charAt(0).toUpperCase()
      )}`,
      tracks: [],
      createdAt: new Date(),
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const deletePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
  };

  const addTrackToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          const trackExists = playlist.tracks.some((t) => t.id === track.id);
          if (!trackExists) {
            return {
              ...playlist,
              tracks: [...playlist.tracks, track],
            };
          }
        }
        return playlist;
      })
    );
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            tracks: playlist.tracks.filter((t) => t.id !== trackId),
          };
        }
        return playlist;
      })
    );
  };

  const toggleLikeTrack = (track: Track) => {
    setLikedSongs((prev) => {
      const isLiked = prev.some((t) => t.id === track.id);
      if (isLiked) {
        return prev.filter((t) => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  const isTrackLiked = (trackId: string) => {
    return likedSongs.some((t) => t.id === trackId);
  };

  const updatePlaylist = (id: string, updates: Partial<Playlist>) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === id ? { ...playlist, ...updates } : playlist
      )
    );
  };

  const value: PlaylistContextType = {
    playlists,
    likedSongs,
    createPlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    toggleLikeTrack,
    isTrackLiked,
    updatePlaylist,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}
