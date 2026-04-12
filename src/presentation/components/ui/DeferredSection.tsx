import { useEffect, useRef, useState } from "react";

type DeferredSectionProps = {
  children: React.ReactNode;
  placeholderClassName?: string;
  rootMargin?: string;
};

const DeferredSection = ({
  children,
  placeholderClassName = "py-24 px-6",
  rootMargin = "200px",
}: DeferredSectionProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref}>
      {shouldRender ? children : <div className={placeholderClassName} />}
    </div>
  );
};

export default DeferredSection;
