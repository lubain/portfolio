const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-slate-200 dark:border-white/5 text-center relative z-10 transition-colors duration-300">
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()} Développé avec{" "}
        <span className="text-purple-600 dark:text-purple-500">React</span> &{" "}
        <span className="text-blue-600 dark:text-blue-500">Tailwind</span>. Tous
        droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
