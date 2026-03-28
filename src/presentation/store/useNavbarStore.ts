import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useNavbarStore {
  isDarkMode: boolean;
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  activeSection: string;
  setIsDarkMode: (value: boolean) => void;
  setIsScrolled: (value: boolean) => void;
  setMobileMenuOpen: (value: boolean) => void;
  setActiveSection: (value: string) => void;
}

const NAV_KEY = "portfolio-fdl";

export const useNavbarStore = create<useNavbarStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      activeSection: "accueil",
      isScrolled: false,
      mobileMenuOpen: false,
      setIsDarkMode: (value) => set({ isDarkMode: value }),
      setActiveSection: (value) => set({ activeSection: value }),
      setIsScrolled: (value) => set({ isScrolled: value }),
      setMobileMenuOpen: (value) => set({ mobileMenuOpen: value }),
    }),
    { name: NAV_KEY }
  )
);
