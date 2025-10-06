import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { TimerAction } from '@/core/types';
import { nowMs } from '@/lib/time';

interface PlayerState {
  // existing fields (kept for compatibility)
  name: string;
  level: number; // alias of combatLevel for now
  exp: number;

  // new fields
  combatLevel: number;
  totalLevel: number;
  gold: number;
  diamonds: number;

  activeAction?: TimerAction;

  // actions
  startCookingTuna(): void;
  clearAction(): void;

  // persistence helpers
  hydrate(action: TimerAction | undefined): void;
  getStateForSave(): Pick<PlayerState, 'activeAction'>;
}

export const usePlayerStore = create<PlayerState>()(
  immer((set, get) => ({
    name: 'gAbeN',
    level: 31,            // keep in sync with combatLevel for now
    exp: 0,

    combatLevel: 31,
    totalLevel: 434,
    gold: 15470,
    diamonds: 160,

    startCookingTuna() {
      set((s) => {
        s.activeAction = {
          id: 'cook_tuna',
          skill: 'COOKING',
          startedAt: nowMs(),     // uses server offset if available
          durationMs: 10_000,
          qtyPerCycle: 1,
        };
      });
    },

    clearAction() {
      set((s) => {
        s.activeAction = undefined;
      });
    },

    hydrate(action) {
      set((s) => {
        s.activeAction = action;
      });
    },

    getStateForSave() {
      const s = get();
      return { activeAction: s.activeAction };
    },
  }))
);
