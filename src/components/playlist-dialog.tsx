"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePlaylist } from "../../contexts/playlist-context";


interface PlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlaylistDialog({ open, onOpenChange }: PlaylistDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createPlaylist } = usePlaylist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createPlaylist(name.trim(), description.trim());
      setName("");
      setDescription("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-white">Create Playlist</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Create a new playlist to organize your favorite songs.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Playlist"
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-white">
                Description (optional)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                className="bg-zinc-800 border-zinc-700 text-white resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-black"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
