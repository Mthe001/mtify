"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { Track } from "./audio-context";
import type { Playlist } from "./playlist-context";

interface SearchResult {
  tracks: Track[];
  playlists: Playlist[];
  artists: string[];
  albums: string[];
}

interface SearchContextType {
  searchQuery: string;
  searchResults: SearchResult;
  isSearching: boolean;
  recentSearches: string[];
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

// Mock music database
const mockTracks: Track[] = [
  {
    id: "1",
    title: "KU LO SA (with Camila Cabello)",
    artist: "Oxlade, Camila Cabello",
    album: "Oxlade From Africa",
    duration: 148,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/f97316/ffffff?text=KU",
    genre: "Afrobeats",
    year: 2023,
  },
  {
    id: "2",
    title: "Jo Tum Mere Ho",
    artist: "Prateek Kuhad",
    album: "The Way That Lovers Do",
    duration: 195,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=JT",
    genre: "Indie Folk",
    year: 2018,
  },
  {
    id: "3",
    title: "im too fast",
    artist: "Shiloh Dynasty",
    album: "Llj",
    duration: 132,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=IT",
    genre: "Lo-fi Hip Hop",
    year: 2017,
  },
  {
    id: "4",
    title: "Ami beche achi",
    artist: "Tomar sporoshe",
    album: "Bengali Classics",
    duration: 210,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/ef4444/ffffff?text=AB",
    genre: "Bengali",
    year: 2020,
  },
  {
    id: "5",
    title: "oh baby i am a wreck",
    artist: "when i'm without you",
    album: "Emotional Ballads",
    duration: 178,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/10b981/ffffff?text=OB",
    genre: "Pop",
    year: 2021,
  },
  {
    id: "6",
    title: "Skin love",
    artist: "Various Artists",
    album: "Summer Vibes",
    duration: 165,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=SL",
    genre: "R&B",
    year: 2022,
  },
  {
    id: "7",
    title: "Trust Nobody",
    artist: "Independent Artist",
    album: "Trust Issues",
    duration: 201,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/6366f1/ffffff?text=TN",
    genre: "Hip Hop",
    year: 2023,
  },
  {
    id: "8",
    title: "Shey Ke?",
    artist: "Topu",
    album: "Bondhu Bhabo Ki",
    duration: 187,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/6b7280/ffffff?text=SK",
    genre: "Bengali Rock",
    year: 2019,
  },
  {
    id: "9",
    title: "Habib Wahid Mix",
    artist: "Habib Wahid, Tahsan, Arfin Rumey",
    album: "Bengali Fusion",
    duration: 245,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/10b981/ffffff?text=HW",
    genre: "Fusion",
    year: 2020,
  },
  {
    id: "10",
    title: "Best of Romance",
    artist: "Atif Aslam, Pritam",
    album: "Bollywood Romance",
    duration: 198,
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    imageUrl: "https://via.placeholder.com/300x300/dc2626/ffffff?text=BR",
    genre: "Bollywood",
    year: 2021,
  },
];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQueryState] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult>({
    tracks: [],
    playlists: [],
    artists: [],
    albums: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("music-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse recent searches:", error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem(
      "music-recent-searches",
      JSON.stringify(recentSearches)
    );
  }, [recentSearches]);

  // Debounced search function
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ tracks: [], playlists: [], artists: [], albums: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();

    // Search tracks
    const matchingTracks = mockTracks.filter(
      (track) =>
        track.title.toLowerCase().includes(lowercaseQuery) ||
        track.artist.toLowerCase().includes(lowercaseQuery) ||
        track.album.toLowerCase().includes(lowercaseQuery) ||
        track.genre?.toLowerCase().includes(lowercaseQuery)
    );

    // Extract unique artists and albums from matching tracks
    const artists = Array.from(
      new Set(matchingTracks.map((track) => track.artist))
    ).filter((artist) => artist.toLowerCase().includes(lowercaseQuery));

    const albums = Array.from(
      new Set(matchingTracks.map((track) => track.album))
    ).filter((album) => album.toLowerCase().includes(lowercaseQuery));

    setSearchResults({
      tracks: matchingTracks,
      playlists: [], // Would search user playlists here
      artists,
      albums,
    });
    setIsSearching(false);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState("");
    setSearchResults({ tracks: [], playlists: [], artists: [], albums: [] });
  }, []);

  const addToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((search) => search !== query);
      return [query, ...filtered].slice(0, 10); // Keep only last 10 searches
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const value: SearchContextType = {
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    setSearchQuery,
    clearSearch,
    addToRecentSearches,
    clearRecentSearches,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

// Export mock tracks for use in other components
export { mockTracks };
