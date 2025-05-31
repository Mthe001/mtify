"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Bell, Menu,  X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSearch } from "../../contexts/search-context";
import { ModeToggle } from "./Mode-toggle";


interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  
  const { searchQuery, setSearchQuery, clearSearch, addToRecentSearches } =
    useSearch();
  const [localSearchValue, setLocalSearchValue] = useState("");

  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchValue.trim()) {
      setSearchQuery(localSearchValue.trim());
      addToRecentSearches(localSearchValue.trim());
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchValue(value);
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setLocalSearchValue("");
    clearSearch();
  };

  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="bg-zinc-900 dark:bg-zinc-950 p-4 border-b border-zinc-800"
    >
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-zinc-400 hover:text-white"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="What do you want to play?"
              value={localSearchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-orange-500"
            />
            {localSearchValue && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleClearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ModeToggle/>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">M</span>
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
