const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-sky-200 dark:border-sky-900/30 text-center relative z-10 transition-colors duration-300">
      <p className="text-slate-500 dark:text-sky-300/50 text-sm">
        © {new Date().getFullYear()} Développé avec{" "}
        <span className="text-sky-500 dark:text-sky-400">React</span> &{" "}
        <span className="text-indigo-500 dark:text-indigo-400">Tailwind</span>.
        Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
