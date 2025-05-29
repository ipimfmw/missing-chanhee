import { create } from 'zustand';

interface PlayerState {
  x: number;
  y: number;
  set: (x: number, y: number) => void;
  move: (dx: number, dy: number) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  x: 5,
  y: 5,
  set: (x, y) => set({ x, y }),
  move: (dx, dy) => set((state) => ({ x: state.x + dx, y: state.y + dy })),
  reset: () => set({ x: 5, y: 5 }),
})); 