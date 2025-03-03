"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Hero from "../components/home/Hero";
import About from "../components/about/About";
import Features from "../components/features/Features";
import SpecialMenu from "../components/menu/SpecialMenu";
import Testimonials from "../components/sections/Testimonial";
import Gallery from "@/components/sections/Gallery";
import CTASection from "../components/sections/CallToAction";
import { defaultConfig } from "../config/siteConfig";
import siteConfig from "./config/site-config";

export default function Home() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <Hero data={defaultConfig.homepage.hero} />

      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <About data={siteConfig.homepage.about} />
        <SpecialMenu
          title={"Our Special Menu"}
          subtitle={"Explore our menu with great taste."}
        />
        <Gallery />
        <Features data={defaultConfig.homepage.features} />
        <Testimonials data={siteConfig.homepage.testimonials} />
        <CTASection data={defaultConfig.homepage.cta} />
      </motion.div>
    </>
  );
}
