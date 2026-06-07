import { useNavbar } from "@/presentation/hooks/useNavbar";
import { menuItems } from "@/presentation/shared/constantes/menuItems";
import { Menu, Moon, Sun, Terminal, X } from "lucide-react";
import LanguageSelector from "@/presentation/components/ui/LanguageSelector";

const Navbar = () => {
  const {
    isDarkMode,
    isScrolled,
    activeSection,
    language,
    themeBtnRef,
    mobileMenuOpen,
    setMobileMenuOpen,
    setIsDarkMode,
    setLanguage,
    toggleTheme,
  } = useNavbar();

  const localizedMenuItems = menuItems[language];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#f0f9ff]/80 dark:bg-[#05111f]/80 backdrop-blur-md border-b border-sky-200 dark:border-sky-900/40 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 relative z-10"
        >
          <Terminal className="w-6 h-6 text-sky-500 dark:text-sky-400" />
          <span>
            Fadhel
            <span className="text-sky-500 dark:text-sky-400"> . </span>Z
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {localizedMenuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-1 transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-sky-500 dark:text-sky-400"
                  : "text-slate-600 dark:text-sky-200/70 hover:text-sky-500 dark:hover:text-sky-400"
              }`}
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-sky-500 dark:bg-sky-400 transition-all duration-500 ease-in-out ${
                  activeSection === item.id
                    ? "w-full opacity-100"
                    : "w-0 opacity-0"
                }`}
              />
            </a>
          ))}

          <LanguageSelector language={language} setLanguage={setLanguage} />

          <button
            aria-label="Basculer le theme"
            ref={themeBtnRef}
            onClick={toggleTheme}
            className="relative p-2.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-slate-700 dark:text-sky-200 hover:scale-110 active:scale-90 transition-all overflow-hidden border border-sky-200 dark:border-sky-700/40"
          >
            {isDarkMode ? (
              <Sun className="relative w-5 h-5" />
            ) : (
              <Moon className="relative w-5 h-5" />
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4 relative z-10">
          <LanguageSelector
            language={language}
            setLanguage={setLanguage}
            compact
          />
          <button
            aria-label="Basculer le theme"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-slate-700 dark:text-sky-200 transition-all"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            aria-label="Menu mobile"
            className="p-2 text-slate-900 dark:text-sky-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#f0f9ff]/95 dark:bg-[#05111f]/95 backdrop-blur-xl border-b border-sky-200 dark:border-sky-900/40 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0 border-transparent"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {localizedMenuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium transition-colors ${
                activeSection === item.id
                  ? "text-sky-500 dark:text-sky-400"
                  : "text-slate-800 dark:text-sky-200"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
