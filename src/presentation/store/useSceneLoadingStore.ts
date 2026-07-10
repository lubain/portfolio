import { create } from "zustand";

interface SceneLoadingState {
  /** Progression de 0 à 100 */
  progress: number;
  /** true dès que toutes les textures sont chargées (ou en cas d'échec géré) */
  isLoaded: boolean;
  setProgress: (value: number) => void;
  setLoaded: (value: boolean) => void;
}

export const useSceneLoadingStore = create<SceneLoadingState>((set) => ({
  progress: 0,
  isLoaded: false,
  setProgress: (value) => set({ progress: value }),
  setLoaded: (value) => set({ isLoaded: value }),
}));
