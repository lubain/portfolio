import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Language } from "@/presentation/shared/constantes/translations";

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
  compact?: boolean;
}

const LANGUAGES: {
  value: Language;
  label: string;
  flag: string;
  full: string;
}[] = [
  { value: "fr", label: "FR", flag: "🇫🇷", full: "Français" },
  { value: "en", label: "EN", flag: "🇬🇧", full: "English" },
];

const LanguageSelector = ({
  language,
  setLanguage,
  compact = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.value === language)!;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((o) => !o)}
        className={`
          group flex items-center gap-1.5 rounded-full border
          border-sky-200 dark:border-sky-700/40
          bg-sky-50/80 dark:bg-sky-900/20
          text-slate-700 dark:text-sky-100
          hover:border-sky-400 dark:hover:border-sky-500
          hover:bg-sky-100 dark:hover:bg-sky-800/30
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
          transition-all duration-200 select-none
          ${
            compact
              ? "py-1.5 pl-2.5 pr-2 text-[11px]"
              : "py-2 pl-3.5 pr-3 text-xs"
          }
        `}
      >
        <span className={compact ? "text-sm" : "text-base leading-none"}>
          {current.flag}
        </span>
        <span className="font-semibold tracking-[0.15em] uppercase">
          {current.label}
        </span>
        <ChevronDown
          className={`
            transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            text-slate-400 dark:text-sky-400/60 group-hover:text-sky-500
            ${open ? "rotate-180" : "rotate-0"}
            ${compact ? "w-3 h-3" : "w-3.5 h-3.5"}
          `}
        />
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label="Language options"
        className={`
          absolute right-0 mt-2 w-36 z-50
          rounded-2xl border border-sky-200 dark:border-sky-800/40
          bg-white/95 dark:bg-[#05111f]/95
          backdrop-blur-xl shadow-xl shadow-sky-200/30 dark:shadow-black/40
          overflow-hidden
          transition-all duration-200 origin-top-right
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
      >
        {/* Header label */}
        <div className="px-3 pt-2.5 pb-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Language
          </p>
        </div>

        <div className="p-1.5 flex flex-col gap-0.5">
          {LANGUAGES.map((lang) => {
            const isActive = lang.value === language;
            return (
              <button
                key={lang.value}
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(lang.value)}
                className={`
                  w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl
                  text-left text-sm font-medium
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                      : "text-slate-700 dark:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-900/30"
                  }
                `}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="flex-1">{lang.full}</span>
                <span
                  className={`
                    text-[10px] font-bold tracking-wider uppercase
                    ${
                      isActive
                        ? "text-sky-100"
                        : "text-slate-400 dark:text-sky-400/50"
                    }
                  `}
                >
                  {lang.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom accent line */}
        <div className="h-0.5 mx-3 mb-2 rounded-full bg-gradient-to-r from-sky-400/30 via-sky-400/60 to-indigo-400/30" />
      </div>
    </div>
  );
};

export default LanguageSelector;
