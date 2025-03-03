// hooks/useScrollAnimation.ts
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

// hooks/useParallax.ts
import { useScroll, useTransform, MotionValue } from "framer-motion";

export const useParallax = (distance: number = 100): MotionValue<number> => {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 1000], [0, distance]);
};

// hooks/useSmoothScroll.ts
import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const currentTarget = e.currentTarget as HTMLAnchorElement | null;

      const href = currentTarget?.getAttribute("href");

      if (href?.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);
};
