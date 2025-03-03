// Gallery.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
// import { defaultConfig } from "../../config/siteConfig";
import siteConfig from "@/app/config/site-config";

type Image = {
  url: string;
  caption?: string;
  alt?: string;
};

const Gallery = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Extract all categories and add "All" option
  const categories = [
    "All",
    ...siteConfig?.homepage?.gallery.categories?.map((cat) => cat.name),
  ];

  // Get all images for the active category
  const filteredImages =
    activeCategory === "All"
      ? siteConfig?.homepage?.gallery.categories.flatMap((cat) => cat.images)
      : siteConfig?.homepage?.gallery.categories.find(
          (cat) => cat.name === activeCategory
        )?.images || [];

  return (
    <section
      className="py-32 mb-4"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container mx-auto px-4 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-normal pb-2"
            style={{ color: theme.primary }}
          >
            Our Gallery
          </h2>
          <p className="text-lg mt-4" style={{ color: theme.text }}>
            A visual feast of our culinary creations
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="rounded-md px-6 py-2 transition-all duration-300"
              style={{
                backgroundColor:
                  activeCategory === category ? theme.accent : "transparent",
                color:
                  activeCategory === category ? theme.background : theme.text,
                borderColor: theme.text,
              }}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3]"
              >
                <Card
                  className="h-full overflow-hidden group cursor-pointer"
                  style={{ backgroundColor: theme.secondary }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0 relative h-full">
                    <Image
                      src={image.url}
                      alt={image.alt || "Restaurant dish"}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered === index ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: `${theme.primary}66` }}
                    >
                      <ZoomIn
                        className="w-8 h-8"
                        style={{ color: theme.background }}
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent
            className="max-w-4xl p-0 overflow-hidden"
            style={{ backgroundColor: `${theme.primary}F0` }}
          >
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
            <div className="relative">
              <Button
                variant="ghost"
                className="absolute right-2 top-2 z-10"
                onClick={() => setSelectedImage(null)}
                aria-label="Close preview"
                style={{ color: theme.background }}
              >
                <X className="w-6 h-6" />
              </Button>
              {selectedImage && (
                <div className="relative">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt || "Restaurant dish"}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ backgroundColor: `${theme.primary}CC` }}
                  >
                    <h3
                      className="text-lg font-medium"
                      style={{ color: theme.background }}
                    >
                      {selectedImage.caption}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
