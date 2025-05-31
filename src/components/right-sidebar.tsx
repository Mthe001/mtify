"use client";

import { motion } from "motion/react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAudio } from "../../contexts/audio-context";
import { usePlaylist } from "../../contexts/playlist-context";


const artistInfo = {
  name: "Oxlade",
  monthlyListeners: "5,015,387",
  description:
    "Nigerian, Lagos based singer Oxlade real name Ikuforiji Abdulrahman Olaitan currently making waves in the music industry...",
  image: "https://via.placeholder.com/200x200/f97316/ffffff?text=OX",
};

const credits = [
  {
    name: "Oxlade",
    role: "Main Artist, Lyricist",
    image: "https://via.placeholder.com/40x40/f97316/ffffff?text=OX",
  },
  {
    name: "Camila Cabello",
    role: "Main Artist, Lyricist",
    image: "https://via.placeholder.com/40x40/ec4899/ffffff?text=CC",
  },
];

export function RightSidebar() {
  const { currentTrack, queue } = useAudio();
  const { toggleLikeTrack, isTrackLiked } = usePlaylist();

  if (!currentTrack) {
    return (
      <motion.div
        initial={{ x: 320 }}
        animate={{ x: 0 }}
        className="bg-zinc-900 dark:bg-zinc-950 h-full p-6 border-l border-zinc-800 overflow-y-auto"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-zinc-400">No track selected</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      className="bg-zinc-900 dark:bg-zinc-950 h-full p-6 border-l border-zinc-800 overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Current Song Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="relative">
            <img
              src={currentTrack.imageUrl || "/placeholder.svg"}
              alt={currentTrack.title}
              className="w-full rounded-lg"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-white hover:bg-black/20"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              {currentTrack.title}
            </h2>
            <p className="text-zinc-400">{currentTrack.artist}</p>
            {currentTrack.album && (
              <p className="text-zinc-500 text-sm mt-1">{currentTrack.album}</p>
            )}
          </div>
        </motion.div>

        {/* About the Artist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">
                About the artist
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src={artistInfo.image || "/placeholder.svg"}
                  alt={artistInfo.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-semibold">
                    {artistInfo.name}
                  </h4>
                  <p className="text-zinc-400 text-sm">
                    {artistInfo.monthlyListeners} monthly listeners
                  </p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {artistInfo.description}
              </p>

              <Button className="w-full bg-transparent border border-zinc-600 text-white hover:bg-zinc-700">
                Follow
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Credits</h3>
              <Button
                variant="link"
                className="text-zinc-400 hover:text-white p-0"
              >
                Show all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {credits.map((credit, index) => (
                <motion.div
                  key={credit.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={credit.image || "/placeholder.svg"}
                      alt={credit.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-white font-medium">{credit.name}</h5>
                      <p className="text-zinc-400 text-sm">{credit.role}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-transparent border border-zinc-600 text-white hover:bg-zinc-700"
                  >
                    Follow
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Queue */}
        {queue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">
                  Next in queue
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {queue.slice(0, 5).map((track, index) => (
                  <div key={track.id} className="flex items-center space-x-3">
                    <img
                      src={track.imageUrl || "/placeholder.svg"}
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-white font-medium text-sm truncate">
                        {track.title}
                      </h5>
                      <p className="text-zinc-400 text-xs truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
