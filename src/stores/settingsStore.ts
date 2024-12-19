import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface SettingsState {
  isGameSoundsEnabled: boolean;
  setIsGameSoundsEnabled: (isGameSoundsEnabled: boolean) => void;
}

export const useSettingsStore = create(
  persist<SettingsState>(
    set => ({
      isGameSoundsEnabled: true,
      setIsGameSoundsEnabled: (isGameSoundsEnabled: boolean) =>
        set({isGameSoundsEnabled}),
    }),

    getPersistStoreOptions('settings'),
  ),
);
