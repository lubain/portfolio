import { useScrollReveal } from "@/presentation/hooks/useScrollReveal";

export const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) => {
  const { ref, isVisible } = useScrollReveal();

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-12";
      case "left":
        return "-translate-x-12";
      case "right":
        return "translate-x-12";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${getDirectionClass()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
