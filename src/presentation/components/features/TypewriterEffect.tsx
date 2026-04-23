import { useMemo, useState, useEffect } from "react";

interface TypewriterEffectProps {
  texts?: readonly string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts = [],
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 1500,
  className = "",
}) => {
  const longestText = useMemo(() => {
    if (texts.length === 0) return "";
    return texts.reduce((longest, current) =>
      current.length > longest.length ? current : longest
    );
  }, [texts]);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];

        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1));

          if (currentText.length === 0) {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1));

          if (currentText.length === fullText.length) {
            setIsPaused(true);
          }
        }
      },
      isPaused ? pauseDuration : isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentTextIndex,
    texts,
    speed,
    deleteSpeed,
    pauseDuration,
  ]);

  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <span className="invisible whitespace-nowrap">{longestText}</span>
      <span className={`absolute left-0 top-0 whitespace-nowrap ${className}`}>
        {currentText}
        <span className="typewriter-cursor inline-block w-0.5 h-6 bg-primary ml-1" />
      </span>
    </span>
  );
};

export default TypewriterEffect;
