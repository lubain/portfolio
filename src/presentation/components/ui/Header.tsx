import { motion } from "framer-motion";
import { Menu, X, Code } from "lucide-react";
import Button from "./Button";
import { SectionId } from "@/presentation/hooks/useSmoothScroll";

interface HeaderProps {
  isDarkMode: boolean;
  isMenuOpen: boolean;
  activeSection: string;
  toggleDarkMode: () => void;
  setIsMenuOpen: (value: boolean) => void;
  handleScrollToSection: (sectionId: SectionId) => void;
}

const navItems = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "À propos" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Competences" },
  { id: "contact", label: "Contact" },
];

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  isMenuOpen,
  activeSection,
  toggleDarkMode,
  setIsMenuOpen,
  handleScrollToSection,
}) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Lubain Fadhel</span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id as SectionId)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              className={`${isDarkMode ? "" : "bg-primary"}`}
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id as SectionId)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Header;
