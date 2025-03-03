"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

interface AboutProps {
  data: {
    title: string;
    description: string;
    image: string;
    stats: Array<{ label: string; value: string }>;
  };
}

export default function About({ data }: AboutProps) {
  const { theme } = useTheme();

  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    },
  };

  return (
    <section
      className="relative py-24 lg:px-16 md:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="absolute top-0 left-0 w-full  h-40 opacity-10"
        style={{
          background: `linear-gradient(180deg, ${theme.accent} 0%, transparent 100%)`,
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
        >
          {/* Image Container */}
          <motion.div
            variants={animations.item}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={data.image}
                alt="About us"
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 50%, ${theme.primary}80 100%)`,
                }}
              />
            </div>
            {/* Decorative Element */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20"
              style={{ backgroundColor: theme.accent }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20"
              style={{ backgroundColor: theme.accent }}
            />
          </motion.div>

          {/* Content Container */}
          <motion.div
            variants={animations.container}
            className="w-full lg:w-1/2 space-y-8"
          >
            <motion.div variants={animations.item}>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ color: theme.primary }}
              >
                {data.title}
              </h2>
              <div
                className="w-20 h-1 rounded-full mb-8"
                style={{ backgroundColor: theme.accent }}
              />
            </motion.div>

            <motion.p
              variants={animations.item}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: theme.text }}
            >
              {data.description}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={animations.container}
              className="grid grid-cols-2 gap-6 mt-12"
            >
              {data.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={animations.item}
                  className="relative group p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-2"
                  style={{
                    backgroundColor: theme.secondary,
                    boxShadow: `0 4px 20px ${theme.primary}20`,
                  }}
                >
                  <div className="relative z-10">
                    <span
                      className="block text-3xl md:text-4xl font-bold mb-2"
                      style={{ color: theme.accent }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-sm md:text-base font-medium"
                      style={{ color: theme.primary }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: theme.accent }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
