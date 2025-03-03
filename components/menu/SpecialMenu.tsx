"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { MenuItem } from "../../lib/types";
import { menuService } from "@/services/menuService";
import { useEffect, useState } from "react";

interface SpecialMenuProps {
  title: string;
  subtitle: string;
}

export default function SpecialMenu({ title, subtitle }: SpecialMenuProps) {
  const { theme } = useTheme();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const storeId = process.env.NEXT_PUBLIC_STORE_ID;
        if (!storeId) {
          throw new Error("Store ID not found in environment variables");
        }
        const items = await menuService.getMenuItems(storeId);
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: theme.accent }}
        />
      </div>
    );
  }

  return (
    <section
      className="relative py-16 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="absolute top-0 left-0 w-full h-40 opacity-10"
        style={{
          background: `linear-gradient(180deg, ${theme.accent} 0%, transparent 100%)`,
        }}
      />
      <div className="container mx-auto relative z-10 lg:pt-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            style={{ color: theme.accent }}
          >
            {title}
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xl mx-auto"
            style={{ color: theme.text }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              className="group relative backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 p-4 sm:p-6"
              style={{
                backgroundColor: `${theme.secondary}`,
                borderColor: `${theme.accent}20`,
                borderWidth: "1px",
              }}
            >
              <div className="relative flex gap-4 sm:gap-6">
                {item.image && (
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <h3
                      className="text-lg sm:text-xl font-bold transition-colors duration-300"
                      style={{ color: theme.primary }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="text-md sm:text-lg font-bold"
                      style={{ color: theme.accent }}
                    >
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p
                    className="text-sm sm:text-base mb-3 sm:mb-4"
                    style={{ color: theme.text }}
                  >
                    {item.description}
                  </p>

                  {item.dietary && (
                    <div className="flex flex-wrap gap-2">
                      {item.dietary.vegetarian && (
                        <span
                          className="text-xs px-2 sm:px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${theme.accent}20`,
                            color: theme.primary,
                            borderColor: `${theme.accent}40`,
                            borderWidth: "1px",
                          }}
                        >
                          Vegetarian
                        </span>
                      )}
                      {item.dietary.vegan && (
                        <span
                          className="text-xs px-2 sm:px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${theme.accent}20`,
                            color: theme.primary,
                            borderColor: `${theme.accent}40`,
                            borderWidth: "1px",
                          }}
                        >
                          Vegan
                        </span>
                      )}
                      {item.dietary.glutenFree && (
                        <span
                          className="text-xs px-2 sm:px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${theme.accent}20`,
                            color: theme.primary,
                            borderColor: `${theme.accent}40`,
                            borderWidth: "1px",
                          }}
                        >
                          Gluten Free
                        </span>
                      )}
                      {item.dietary.spicy && (
                        <span
                          className="text-xs px-2 sm:px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${theme.accent}20`,
                            color: theme.primary,
                            borderColor: `${theme.accent}40`,
                            borderWidth: "1px",
                          }}
                        >
                          Spicy
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
