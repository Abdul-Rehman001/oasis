"use client";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { HeroSection } from "../../lib/types";
import { useTheme } from "@/hooks/useTheme";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import siteConfig from "@/app/config/site-config";
import { useEffect, useRef, useState } from "react";

interface HeroProps {
  data: HeroSection;
}

export default function Hero({ data }: HeroProps) {
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut",
      },
    }),
  };

  // Google review data
  const googleReview = {
    rating: 4.7,
    count: 236,
  };

  // Delivery app reviews
  const deliveryAppReviews = [
    {
      name: "Zomato",
      logo: "/zomato.png",
      rating: 4.8,
      review: "Best authentic flavors in town! Quick delivery every time.",
      reviewer: "Priya M.",
    },
    {
      name: "Swiggy",
      logo: "/swiggy.png",
      rating: 4.6,
      review: "Amazing food quality. Never disappoints!",
      reviewer: "Rahul S.",
    },
    {
      name: "Uber Eats",
      logo: "/uber.png",
      rating: 4.9,
      review: "Fresh ingredients and perfect portions.",
      reviewer: "Ananya K.",
    },
    {
      name: "Box8",
      logo: "/box8.png",
      rating: 4.7,
      review: "Consistent quality and excellent packaging.",
      reviewer: "Vikram P.",
    },
    {
      name: "Zomato",
      logo: "/zomato.png",
      rating: 4.7,
      review: "The Butter Chicken is to die for! Phenomenal service.",
      reviewer: "Aditya G.",
    },
    {
      name: "Swiggy",
      logo: "/swiggy.png",
      rating: 4.8,
      review: "Perfect spice levels and generous portions!",
      reviewer: "Meera J.",
    },
  ];

  // Animate the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % (deliveryAppReviews.length / 2));
    }, 3000);

    return () => clearInterval(interval);
  }, [deliveryAppReviews.length]);

  // Update animation when active slide changes
  useEffect(() => {
    controls.start({
      x: `-${activeSlide * 100}%`,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    });
  }, [activeSlide, controls]);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden lg:pt-2 pt-12"
      style={{
        background: `linear-gradient(to bottom, ${theme.background}99, ${theme.accent}40)`,
      }}
    >
      {/* Background Animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${theme.background}cc, ${theme.background}99, ${theme.background}cc)`,
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-full lg:px-20 mx-auto px-4 py-4 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Hero Content */}
          <div
            className="backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl"
            style={{ backgroundColor: `${theme.secondary}50` }}
          >
            <div className="max-w-xl">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="mb-2"
              >
                {/* Google Reviews Section */}
                <motion.div
                  custom={0.3}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                  className="flex items-center mb-2"
                >
                  <div className="flex items-center">
                    {renderStars(googleReview.rating)}
                  </div>
                  <div
                    className="ml-2 flex items-center text-sm md:text-base"
                    style={{ color: theme.text }}
                  >
                    <span className="font-bold mr-1">
                      {googleReview.rating}
                    </span>
                    <span className="mr-2">•</span>
                    <span>{googleReview.count} Google Reviews</span>
                  </div>
                </motion.div>
                {/* <span
                  className="text-sm md:text-base uppercase tracking-widest font-semibold"
                  style={{ color: theme.accent }}
                >
                  Welcome to {siteConfig.name}
                </span> */}
              </motion.div>

              <motion.h1
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="text-5xl font-bold mb-3"
                style={{ color: theme.primary }}
              >
                {siteConfig.homepage.hero.heading}
              </motion.h1>

              <motion.p
                custom={0.4}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="text-lg md:text-xl mb-4 leading-relaxed"
                style={{ color: theme.text }}
              >
                {siteConfig.homepage.hero.subheading}
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                custom={0.6}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="flex flex-col sm:flex-row gap-4 mb-2"
              >
                <Link
                  href={data.cta.primary.link}
                  className="group relative px-6 py-1 rounded-full text-lg font-medium overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.background,
                  }}
                >
                  <span className="relative z-10">
                    {siteConfig.homepage.hero.cta.primary.text}
                  </span>
                  <div
                    className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: theme.primary }}
                  />
                </Link>
                <Link
                  href={data.cta.secondary.link}
                  className="group px-6 py-1 rounded-full text-lg font-medium border-2 transition-all duration-300"
                  style={{
                    borderColor: theme.accent,
                    color: theme.primary,
                  }}
                >
                  <span>{siteConfig.homepage.hero.cta.secondary.text}</span>
                </Link>
              </motion.div>
            </div>

            {/* Delivery App Reviews Slider Section */}
            <motion.div
              custom={0.8}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="w-full mt-5"
            >
              <div
                className="p-6 rounded-xl shadow-md backdrop-blur-md"
                style={{ backgroundColor: `${theme.accent}20` }}
              >
                <h3
                  className="text-sm uppercase tracking-wide font-medium mb-4 text-center sm:text-left"
                  style={{ color: theme.primary }}
                >
                  What People Love About us
                </h3>

                {/* Review Slider */}
                <div className="relative overflow-hidden" ref={sliderRef}>
                  <motion.div className="flex" animate={controls}>
                    {deliveryAppReviews.map((review, index) => (
                      <div
                        key={`${review.name}-${index}`}
                        className="min-w-full sm:min-w-[50%] px-2"
                      >
                        <div
                          className="bg-white bg-opacity-80 rounded-lg p-4 h-full shadow-sm transition-all duration-300"
                          style={{ borderLeft: `3px solid ${theme.accent}` }}
                        >
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 relative mr-2">
                              <div
                                className="w-full h-full bg-contain bg-center bg-no-repeat"
                                style={{
                                  backgroundImage: `url(${review.logo})`,
                                }}
                              />
                            </div>
                            <div>
                              <div
                                className="font-medium"
                                style={{ color: theme.primary }}
                              >
                                {review.name}
                              </div>
                              <div className="flex items-center">
                                {renderStars(review.rating)}
                                <span
                                  className="ml-1 text-sm font-medium"
                                  style={{ color: theme.text }}
                                >
                                  {review.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p
                            className="text-sm italic mb-1"
                            style={{ color: theme.text }}
                          >
                            {review.review}
                          </p>
                          <p
                            className="text-xs text-right"
                            style={{ color: `${theme.primary}99` }}
                          >
                            — {review.reviewer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Slider Dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {Array.from({ length: deliveryAppReviews.length / 2 }).map(
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            activeSlide === index
                              ? theme.accent
                              : `${theme.accent}40`,
                          transform:
                            activeSlide === index ? "scale(1.3)" : "scale(1)",
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Image with Motion Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden shadow-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transform hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url(${siteConfig.homepage.hero.backgroundImage})`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
