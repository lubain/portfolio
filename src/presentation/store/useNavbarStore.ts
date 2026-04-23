import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useNavbarStore {
  isDarkMode: boolean;
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  activeSection: string;
  language: "fr" | "en";
  setIsDarkMode: (value: boolean) => void;
  setIsScrolled: (value: boolean) => void;
  setMobileMenuOpen: (value: boolean) => void;
  setActiveSection: (value: string) => void;
  setLanguage: (value: "fr" | "en") => void;
}

const NAV_KEY = "portfolio-fdl";

export const useNavbarStore = create<useNavbarStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      activeSection: "accueil",
      isScrolled: false,
      mobileMenuOpen: false,
      language: "fr",
      setIsDarkMode: (value) => set({ isDarkMode: value }),
      setActiveSection: (value) => set({ activeSection: value }),
      setIsScrolled: (value) => set({ isScrolled: value }),
      setMobileMenuOpen: (value) => set({ mobileMenuOpen: value }),
      setLanguage: (value) => {
        document.documentElement.lang = value;
        set({ language: value });
      },
    }),
    { name: NAV_KEY }
  )
);
