import {Progress, SlotIds} from '@/types/common';
import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  balance: number;
  addBalance: (amount: number) => void;
  subtractBalance: (amount: number) => void;
  setBalance: (amount: number) => void;
  progress: Progress;
  updateProgress: (
    gameId: Omit<Progress, SlotIds.NINE_ELEMENTS>,
    index: number,
    value: number,
  ) => void;
}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      balance: 0,
      addBalance: (amount: number) => set({balance: get().balance + amount}),
      subtractBalance: (amount: number) =>
        set({balance: get().balance - amount}),
      setBalance: (amount: number) => set({balance: amount}),
      progress: {
        [SlotIds.BOOK_DEMO]: [0, 0, 0],
        [SlotIds.ZEUS_JOY]: [0, 0, 0],
        [SlotIds.FISHER_CAMP]: [0, 0, 0],
      },
      updateProgress: (gameId, index, value) => {
        const progress = get().progress;
        progress[gameId][index] = progress[gameId][index] + value;
        set({progress});
      },
    }),

    getPersistStoreOptions('user'),
  ),
);
