"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { SiteConfig } from "../../lib/types";

interface NavbarProps {
  config: SiteConfig;
}

export default function Navbar({}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Reservations", path: "/reservations" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 border-b-2 border-gray-600/20 ${
        isScrolled ? "py-2 shadow-lg" : "py-2"
      }`}
      style={{
        backgroundColor: isScrolled
          ? `${theme.background}95`
          : `${theme.background}80`,
        backdropFilter: "blur(8px)",
      }}
    >
      <nav className="container mx-auto px-4 lg:px-12">
        <div className="flex justify-between items-center">
          <Link href="/" className="relative group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Image
                src="https://iili.io/33K58Qe.png"
                alt="oasis"
                width={20}
                height={20}
                className="h-14 w-20"
              />
            </motion.div>
            <span
              className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: theme.accent }}
            />
          </Link>

          <div className="hidden md:flex items-center w-full">
            <div className="flex-1 flex justify-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  onMouseEnter={() => setActiveItem(item.path)}
                  style={{ color: theme.primary }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeItem === item.path && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: `${theme.accent}20` }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="ml-auto">
              <Link
                href="/contact"
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.background,
                }}
              >
                Connect with us
              </Link>
            </div>
          </div>

          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-6 h-5">
              {[0, 2, 4].map((top, i) => (
                <motion.span
                  key={i}
                  className="absolute w-6 h-0.5"
                  style={{
                    backgroundColor: theme.primary,
                    top: `${top * 4}px`,
                  }}
                  animate={
                    i === 1
                      ? { opacity: isMobileMenuOpen ? 0 : 1 }
                      : {
                          rotate: isMobileMenuOpen ? (i === 0 ? 45 : -45) : 0,
                          y: isMobileMenuOpen ? (i === 0 ? 8 : -8) : 0,
                        }
                  }
                />
              ))}
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div
                className="rounded-2xl p-4 shadow-lg backdrop-blur-md"
                style={{ backgroundColor: `${theme.background}95` }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className="block py-3 px-4 rounded-xl transition-colors duration-300"
                      style={{
                        color: theme.primary,
                        backgroundColor:
                          activeItem === item.path
                            ? `${theme.accent}20`
                            : "transparent",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link
                    href="/contact"
                    className="block mt-4 py-3 px-4 rounded-xl text-center transition-all duration-300"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.background,
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
