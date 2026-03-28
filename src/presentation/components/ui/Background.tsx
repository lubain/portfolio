const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="blob bg-purple-600 w-96 h-96 rounded-full top-[-10%] left-[-10%]"></div>
      <div
        className="blob bg-blue-600 w-96 h-96 rounded-full bottom-[-10%] right-[-10%]"
        style={{ animationDelay: "-5s" }}
      ></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-20 mix-blend-overlay"></div>
    </div>
  );
};

export default Background;
