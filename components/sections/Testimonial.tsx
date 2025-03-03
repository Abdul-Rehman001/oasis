// components/sections/Testimonials.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { Testimonial } from "../../lib/types";
import { Star } from "lucide-react";

interface TestimonialsProps {
  data: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
}

export default function Testimonials({ data }: TestimonialsProps) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay, data.items.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      className="py-20 px-4 overflow-hidden min-h-screen"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: theme.primary }}
          >
            {data.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.text }}
          >
            {data.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={currentIndex}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              <div
                className="bg-white rounded-xl p-8 shadow-lg"
                style={{ backgroundColor: theme.background }}
              >
                {/* Quote Icon */}
                <div
                  className="w-12 h-12 mb-6 mx-auto"
                  style={{ color: theme.accent }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-center mb-8">
                  <p
                    className="text-lg italic mb-6"
                    style={{ color: theme.text }}
                  >
                    {data.items[currentIndex].content}
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={
                          i < data.items[currentIndex].rating
                            ? theme.accent
                            : "none"
                        }
                        color={theme.accent}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <footer className="flex flex-col items-center">
                    {data.items[currentIndex].image && (
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                        <Image
                          src={data.items[currentIndex].image!}
                          alt={data.items[currentIndex].author}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <cite
                      className="not-italic font-bold text-lg"
                      style={{ color: theme.primary }}
                    >
                      {data.items[currentIndex].author}
                    </cite>
                    {data.items[currentIndex].role && (
                      <span
                        className="text-sm mt-1"
                        style={{ color: theme.text }}
                      >
                        {data.items[currentIndex].role}
                      </span>
                    )}
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full"
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + data.items.length) % data.items.length
              )
            }
            style={{ backgroundColor: theme.accent }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full"
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % data.items.length)
            }
            style={{ backgroundColor: theme.accent }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
