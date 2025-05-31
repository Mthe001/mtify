"use client";

import { useState } from "react";

import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
import { MainContent } from "@/components/main-content";
import { RightSidebar } from "@/components/right-sidebar";
import { BottomPlayer } from "@/components/bottom-player";
import { MobileMenu } from "@/components/mobile-menu";
import { AudioProvider } from "../../contexts/audio-context";
import { PlaylistProvider } from "../../contexts/playlist-context";
import { SearchProvider } from "../../contexts/search-context";
import { ThemeProvider } from "@/components/theme-provider";


export default function MusicPlayer() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <AudioProvider>
        <SearchProvider>
          <PlaylistProvider>
            <div className="h-screen bg-background text-foreground">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] h-full">
                {/* Mobile Menu Overlay */}
                <MobileMenu
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                />

                {/* Left Sidebar - Hidden on mobile */}
                <div className="hidden lg:block">
                  <Sidebar />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col h-full">
                  <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
                  <div className="flex-1 overflow-hidden">
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] h-full">
                      <MainContent />
                      {/* Right Sidebar - Hidden on mobile, shown on xl screens */}
                      <div className="hidden xl:block">
                        <RightSidebar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Player - Always visible */}
              <BottomPlayer />
            </div>
          </PlaylistProvider>
        </SearchProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
