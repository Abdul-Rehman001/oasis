/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTheme, SiteConfig } from "@/lib/types";
import { writeFile } from "fs/promises";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

async function fetchConfig(
  endpoint: string
): Promise<{ data: { siteConfig: Partial<SiteConfig> } }> {
  try {
    const response = await fetch(
      `${endpoint}/site/get-site-config/?storeId=${process.env.NEXT_PUBLIC_STORE_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Fetched configuration:", result);
    return result;
  } catch (error) {
    console.error("Error fetching config data:", error);
    throw error;
  }
}

interface ConfigGeneratorOptions {
  environment: string;
  configEndpoint: string;
  outputPath: string;
}

// function validateMenuItem(item: any): void {
//   if (!item.id || !item.name || !item.description || !item.category) {
//     throw new Error(`Invalid menu item: ${JSON.stringify(item)}`);
//   }

//   if (typeof item.price !== "number") {
//     throw new Error(`Invalid price for menu item ${item.name}`);
//   }
// }

function validateTestimonial(testimonial: any): void {
  if (!testimonial.id || !testimonial.author || !testimonial.content) {
    throw new Error(`Invalid testimonial: ${JSON.stringify(testimonial)}`);
  }

  if (
    typeof testimonial.rating !== "number" ||
    testimonial.rating < 1 ||
    testimonial.rating > 5
  ) {
    throw new Error(`Invalid rating for testimonial by ${testimonial.author}`);
  }
}

function applyFallbackData(
  config: Partial<SiteConfig>,
  defaultConfig: SiteConfig
): SiteConfig {
  const result = { ...defaultConfig };

  // Helper function to ensure array items have all required fields
  const mergeArrayItems = (
    source: any[],
    fallback: any[],
    keyField: string
  ) => {
    return source.map((item) => {
      const fallbackItem =
        fallback.find((f) => f[keyField] === item[keyField]) || fallback[0];
      return { ...fallbackItem, ...item };
    });
  };

  // Basic Info Fallbacks
  result.name = config.name || defaultConfig.name;
  result.description = config.description || defaultConfig.description;

  // Address Fallback
  result.address = {
    ...defaultConfig.address,
    ...config.address,
  };

  // Contact Fallback
  result.contact = {
    ...defaultConfig.contact,
    ...config.contact,
    form: {
      ...defaultConfig.contact.form,
      ...config.contact?.form,
    },
    contactDetails: {
      ...defaultConfig.contact.contactDetails,
      ...config.contact?.contactDetails,
    },
  };

  // Social Links Fallback
  result.social = {
    ...defaultConfig.social,
    ...config.social,
  };

  // Business Hours Fallback
  if (config.hours?.length) {
    result.hours = mergeArrayItems(config.hours, defaultConfig.hours, "day");
  }

  // Reservation Fallback
  result.reservation = {
    ...defaultConfig.reservation,
    ...config.reservation,
    occasions:
      config.reservation?.occasions || defaultConfig.reservation.occasions,
    policies:
      config.reservation?.policies || defaultConfig.reservation.policies,
  };

  // Theme Fallback
  result.theme = {
    themeName: config.theme?.themeName || defaultConfig.theme.themeName,
    themeType: config.theme?.themeType || defaultConfig.theme.themeType,
    theme:
      config.theme?.theme ||
      getTheme(result.theme.themeName, result.theme.themeType),
  };

  // Homepage Fallbacks
  if (config.homepage) {
    result.homepage = {
      // Hero Section
      hero: {
        ...defaultConfig.homepage.hero,
        ...config.homepage.hero,
        cta: {
          primary: {
            ...defaultConfig.homepage.hero.cta.primary,
            ...config.homepage.hero?.cta?.primary,
          },
          secondary: {
            ...defaultConfig.homepage.hero.cta.secondary,
            ...config.homepage.hero?.cta?.secondary,
          },
        },
      },

      // About Section
      about: {
        ...defaultConfig.homepage.about,
        ...config.homepage.about,
        stats:
          config.homepage.about?.stats || defaultConfig.homepage.about.stats,
      },

      // Features Section
      features: {
        ...defaultConfig.homepage.features,
        ...config.homepage.features,
        items: config.homepage.features?.items
          ? mergeArrayItems(
              config.homepage.features.items,
              defaultConfig.homepage.features.items,
              "id"
            )
          : defaultConfig.homepage.features.items,
      },

      // Special Menu Section
      // specialMenu: {
      //   ...defaultConfig.homepage.specialMenu,
      //   ...config.homepage.specialMenu,
      //   items: config.homepage.specialMenu?.items
      //     ? mergeArrayItems(
      //         config.homepage.specialMenu.items,
      //         defaultConfig.homepage.specialMenu.items,
      //         "id"
      //       )
      //     : defaultConfig.homepage.specialMenu.items,
      // },

      // Testimonials Section
      testimonials: {
        ...defaultConfig.homepage.testimonials,
        ...config.homepage.testimonials,
        items: config.homepage.testimonials?.items
          ? mergeArrayItems(
              config.homepage.testimonials.items,
              defaultConfig.homepage.testimonials.items,
              "id"
            )
          : defaultConfig.homepage.testimonials.items,
      },

      // Gallery Section
      gallery: {
        categories: config.homepage.gallery?.categories
          ? config.homepage.gallery.categories.map((category) => ({
              name: category.name,
              images: category.images.map((image) => ({
                url: image.url,
                caption: image.caption || "",
                alt: image.alt || image.caption || "",
              })),
            }))
          : defaultConfig.homepage.gallery.categories,
      },

      // CTA Section
      cta: {
        ...defaultConfig.homepage.cta,
        ...config.homepage.cta,
      },
    };
  }

  return result;
}

function validateConfig(config: SiteConfig): void {
  const requiredSections = [
    "name",
    "description",
    "address",
    "contact",
    "hours",
    "reservation",
    "homepage",
    "theme",
  ];

  for (const section of requiredSections) {
    if (!config[section as keyof SiteConfig]) {
      throw new Error(`Missing required section: ${section}`);
    }
  }

  // Validate business hours
  config.hours?.forEach((hour) => {
    if (!hour.day || !hour.open || !hour.close) {
      throw new Error(`Invalid business hours: ${JSON.stringify(hour)}`);
    }
  });

  // // Validate menu items
  // config.homepage?.specialMenu?.items?.forEach(validateMenuItem);

  // Validate testimonials
  config.homepage?.testimonials?.items?.forEach(validateTestimonial);

  // Validate theme
  if (!config.theme?.themeName || !config.theme?.themeType) {
    throw new Error("Invalid theme configuration");
  }
}

async function generateConfigFile(
  apiConfig: Partial<SiteConfig>,
  options: ConfigGeneratorOptions
): Promise<void> {
  const timestamp = new Date().toISOString();

  // Import default config
  const { defaultConfig } = await import("../config/siteConfig");

  // Apply fallback data and merge configurations
  const mergedConfig = applyFallbackData(apiConfig, defaultConfig);

  // Remove server-specific fields
  const fieldsToRemove = [
    "_id",
    "userId",
    "storeId",
    "subdomain",
    "createdAt",
    "updatedAt",
    "siteType",
    "store",
  ];

  fieldsToRemove.forEach((field) => {
    delete (mergedConfig as any)[field];
  });

  // Validate the merged configuration
  try {
    validateConfig(mergedConfig);
  } catch (error) {
    console.error("Configuration validation failed:", error);
    throw error;
  }

  // Ensure theme is properly set
  mergedConfig.theme.theme = getTheme(
    mergedConfig.theme.themeName,
    mergedConfig.theme.themeType
  );

  const configContent = `// Generated at ${timestamp}
// Environment: ${options.environment}

import { SiteConfig } from "@/lib/types";

const siteConfig: SiteConfig = ${JSON.stringify(mergedConfig, null, 2)};

export default siteConfig;
`;

  const outputPath = path.resolve(process.cwd(), options.outputPath);

  try {
    await writeFile(outputPath, configContent, "utf-8");
    console.log(`✅ Configuration generated successfully at ${outputPath}`);
  } catch (error) {
    console.error("Error writing configuration file:", error);
    throw error;
  }
}

async function main() {
  try {
    const options: ConfigGeneratorOptions = {
      environment: process.env.NODE_ENV || "development",
      configEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      outputPath: "app/config/site-config.ts",
    };

    console.log(`🔄 Fetching configuration for ${options.environment}...`);
    const { data } = await fetchConfig(options.configEndpoint);

    console.log("📝 Generating configuration file...");
    await generateConfigFile(data.siteConfig, options);
  } catch (error) {
    console.error("❌ Configuration generation failed:", error);
    process.exit(1);
  }
}

main();
