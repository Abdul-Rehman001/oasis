// components/sections/Features.tsx
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';
import { Feature } from '../../lib/types';

interface FeaturesProps {
  data: {
    title: string;
    subtitle: string;
    items: Feature[];
  };
}

export default function Features({ data }: FeaturesProps) {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 px-4" style={{ backgroundColor: theme.secondary }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.items.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: theme.background }}
            >
              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                />
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: theme.primary }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-base"
                  style={{ color: theme.text }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}