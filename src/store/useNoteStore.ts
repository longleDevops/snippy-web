// src/features/sidebar/store/sidebarStore.ts
import { create } from "zustand";

interface NoteStore {
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));