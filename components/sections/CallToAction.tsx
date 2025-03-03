// components/sections/CTASection.tsx
"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

interface CTAProps {
  data: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
  };
}

export default function CTASection({ data }: CTAProps) {
  const { theme } = useTheme();

  return (
    <section className="relative py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: theme.primary,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: theme.secondary }}
          >
            {data.title}
          </h2>
          <p
            className="text-lg md:text-xl mb-10"
            style={{ color: theme.secondary }}
          >
            {data.subtitle}
          </p>
          <Link
            href={data.buttonLink}
            className="inline-block px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor: theme.accent,
              color: theme.primary,
            }}
          >
            {data.buttonText}
          </Link>

          {/* Decorative Elements */}
          <div className="absolute left-10 top-10 w-20 h-20 opacity-20">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: theme.secondary }}
            >
              <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
            </svg>
          </div>
          <div className="absolute right-10 bottom-10 w-16 h-16 opacity-20">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: theme.secondary }}
            >
              <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
