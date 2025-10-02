import { useCallback, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";

export const useOptimizedAnimation = () => {
  const shouldReduceMotion = useReducedMotion();

  // Optimized animation variants
  const variants = useMemo(
    (): Record<string, Variants> => ({
      fadeInUp: {
        initial: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : 30,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0.01 : 0.6,
            ease: "easeOut",
          },
        },
      },
      fadeInLeft: {
        initial: {
          opacity: 0,
          x: shouldReduceMotion ? 0 : -30,
        },
        animate: {
          opacity: 1,
          x: 0,
          transition: {
            duration: shouldReduceMotion ? 0.01 : 0.6,
            ease: "easeOut",
          },
        },
      },
      fadeInRight: {
        initial: {
          opacity: 0,
          x: shouldReduceMotion ? 0 : 30,
        },
        animate: {
          opacity: 1,
          x: 0,
          transition: {
            duration: shouldReduceMotion ? 0.01 : 0.6,
            ease: "easeOut",
          },
        },
      },
      scaleIn: {
        initial: {
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.8,
        },
        animate: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: shouldReduceMotion ? 0.01 : 0.5,
            ease: "easeOut",
          },
        },
      },
      stagger: {
        animate: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.1,
            delayChildren: shouldReduceMotion ? 0 : 0.2,
          },
        },
      },
    }),
    [shouldReduceMotion]
  );

  // Optimized hover animations
  const hoverVariants = useMemo(
    (): Record<string, object> => ({
      scale: shouldReduceMotion ? {} : { scale: 1.05 },
      lift: shouldReduceMotion ? {} : { y: -5, scale: 1.02 },
      glow: shouldReduceMotion
        ? {}
        : {
            boxShadow: "0 0 20px rgba(8, 145, 178, 0.3)",
            scale: 1.02,
          },
    }),
    [shouldReduceMotion]
  );

  // Optimized transition presets
  const transitions = useMemo(
    (): Record<string, Transition> => ({
      smooth: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: "easeInOut",
      },
      spring: shouldReduceMotion
        ? { duration: 0.01 }
        : { type: "spring", stiffness: 300, damping: 30 },
      bounce: shouldReduceMotion
        ? { duration: 0.01 }
        : { type: "spring", bounce: 0.4, duration: 0.6 },
    }),
    [shouldReduceMotion]
  );

  // Memoized animation functions
  const createStaggeredAnimation = useCallback(
    (delay: number = 0.1): Variants => ({
      animate: {
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : delay,
          delayChildren: shouldReduceMotion ? 0 : 0.2,
        },
      },
    }),
    [shouldReduceMotion]
  );

  // const createDelayedAnimation = useCallback(
  //   (delay: number = 0): Variants => ({
  //     ...variants.fadeInUp,
  //     animate: {
  //       ...variants.fadeInUp.animate,
  //       transition: {
  //         ...(variants.fadeInUp.animate as any).transition,
  //         delay: shouldReduceMotion ? 0 : delay,
  //       },
  //     },
  //   }),
  //   [variants.fadeInUp, shouldReduceMotion]
  // );

  return {
    variants,
    hoverVariants,
    transitions,
    createStaggeredAnimation,
    // createDelayedAnimation,
    shouldReduceMotion,
  };
};

export default useOptimizedAnimation;
