export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  yelp?: string;
  X?: string;
  youtube?: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  dietary?: {
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    spicy?: boolean;
  };
};

export type BusinessHours = {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
};

export type Reservation = {
  enabled: boolean;
  provider: string;
  url: string;
  title: string;
  subtitle: string;
  submitButtonText: string;
  occasions: string[];
  policies: string[];
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role?: string;
  content: string;
  image?: string;
  rating: number;
};

export interface GalleryConfig {
  categories: Array<{
    name: string;
    images: Array<{
      url: string;
      caption?: string;
      alt?: string;
    }>;
  }>;
}

export type HeroSection = {
  heading: string;
  subheading: string;
  backgroundImage: string;
  cta: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
};

export type Homepage = {
  hero: HeroSection;
  about: {
    title: string;
    description: string;
    image: string;
    stats: Array<{ label: string; value: string }>;
  };
  features: {
    title: string;
    subtitle: string;
    items: Feature[];
  };
  // specialMenu: {
  //   title: string;
  //   subtitle: string;
  //   items: MenuItem[];
  // };
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  gallery: {
    categories: Array<{
      name: string;
      images: Array<{
        url: string;
        caption?: string;
        alt?: string;
      }>;
    }>;
  };

  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
  };
};

export type SiteConfig = {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      messagePlaceholder: string;
      submitButtonText: string;
    };
    contactDetails: {
      address: string;
      email: string;
      phone: string;
      whatsapp: string;
    };
    mapUrl: string;
  };
  social: SocialLinks;
  hours: BusinessHours[];
  reservation: Reservation;
  theme: {
    themeName: string; // Just these two properties for theme
    themeType: "light" | "dark";
    theme: Theme;
  };
  homepage: Homepage;
};
export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface ColorPalette {
  light: Theme;
  dark: Theme;
}

export const defaultPalettes: Record<string, ColorPalette> = {
  classic: {
    light: {
      primary: "#1c1917",
      secondary: "#f8fafc",
      accent: "#ca8a04",
      background: "#ffffff",
      text: "#334155",
    },
    dark: {
      primary: "#f8fafc",
      secondary: "#1c1917",
      accent: "#eab308",
      background: "#0f172a",
      text: "#e2e8f0",
    },
  },
  modern: {
    light: {
      primary: "#0f172a",
      secondary: "#f1f5f9",
      accent: "#0ea5e9",
      background: "#ffffff",
      text: "#334155",
    },
    dark: {
      primary: "#f1f5f9",
      secondary: "#0f172a",
      accent: "#38bdf8",
      background: "#020617",
      text: "#e2e8f0",
    },
  },
  rustic: {
    light: {
      primary: "#451a03",
      secondary: "#ffe2d5",
      accent: "#ea580c",
      background: "#ffffff",
      text: "#422006",
    },
    dark: {
      primary: "#fef3c7",
      secondary: "#451a03",
      accent: "#f97316",
      background: "#1c1917",
      text: "#fef3c7",
    },
  },
  minimal: {
    light: {
      primary: "#2d3436",
      secondary: "#f5f6fa",
      accent: "#00b894",
      background: "#ffffff",
      text: "#2d3436",
    },
    dark: {
      primary: "#f5f6fa",
      secondary: "#2d3436",
      accent: "#00b894",
      background: "#1e272e",
      text: "#f5f6fa",
    },
  },
  retro: {
    light: {
      primary: "#1a1a1a",
      secondary: "#f4f4f4",
      accent: "#d4af37",
      background: "#ffffff",
      text: "#333333",
    },
    dark: {
      primary: "#f4f4f4",
      secondary: "#1a1a1a",
      accent: "#d4af37",
      background: "#121212",
      text: "#e0e0e0",
    },
  },
  nature: {
    light: {
      primary: "#2f5233",
      secondary: "#f0f7f0",
      accent: "#88b06a",
      background: "#ffffff",
      text: "#1a331d",
    },
    dark: {
      primary: "#88b06a",
      secondary: "#1a331d",
      accent: "#d4e6c4",
      background: "#0f1f12",
      text: "#f0f7f0",
    },
  },
  ocean: {
    light: {
      primary: "#1e3d59",
      secondary: "#f5f8fa",
      accent: "#17a2b8",
      background: "#ffffff",
      text: "#2c3e50",
    },
    dark: {
      primary: "#17a2b8",
      secondary: "#1e3d59",
      accent: "#48dbfb",
      background: "#102a43",
      text: "#f5f8fa",
    },
  },
};
export const generateCustomPalette = (
  primary: string,
  secondary: string,
  accent: string,
  background: string = "#ffffff",
  text: string = "#333333"
): Theme => ({
  primary,
  secondary,
  accent,
  background,
  text,
});
export const getTheme = (
  themeName: string,
  themeType: "light" | "dark"
): Theme => {
  return (
    defaultPalettes[themeName]?.[themeType] ||
    defaultPalettes["classic"]["light"]
  );
};
