import { getTheme, SiteConfig } from "@/lib/types";

export const defaultConfig: SiteConfig = {
  name: "Oasis",
  description: "Experience culinary excellence in a modern atmosphere",
  address: {
    street: "123 Gourmet Street",
    city: "Foodville",
    state: "CA",
    zip: "90210",
    country: "USA",
  },
  contact: {
    title: "Let's Connect",
    subtitle:
      "Reach out to us for inquiries, collaborations, or just to say hello!",
    form: {
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      phonePlaceholder: "Phone Number",
      messagePlaceholder: "Your Message",
      submitButtonText: "Send Message",
    },
    contactDetails: {
      address:
        "382/2, FLAT 103 OPPOSITE TO IRON BIRD ELEVATORS, 2ND MAIN 4TH CROSS, BALAJI LAYOUT, BANGALORE-560094",
      email: "info@rainbowinteriors.com",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
    },
    mapUrl: "",
  },

  social: {
    facebook: "https://facebook.com/finedining",
    instagram: "https://instagram.com/finedining",
    twitter: "https://twitter.com/finedining",
    yelp: "https://yelp.com/finedining",
  },
  hours: [
    { day: "Monday", open: "17:00", close: "23:00" },
    { day: "Tuesday", open: "17:00", close: "23:00" },
    { day: "Wednesday", open: "17:00", close: "23:00" },
    { day: "Thursday", open: "17:00", close: "23:00" },
    { day: "Friday", open: "17:00", close: "00:00" },
    { day: "Saturday", open: "17:00", close: "00:00" },
    { day: "Sunday", open: "17:00", close: "22:00" },
  ],
  reservation: {
    enabled: true,
    provider: "opentable",
    url: "https://www.opentable.com/restaurant",
    title: "Make a Reservation",
    subtitle: "Book your table for an unforgettable dining experience",
    submitButtonText: "Confirm Reservation",
    occasions: [
      "Birthday",
      "Anniversary",
      "Business Dinner",
      "Date Night",
      "Family Gathering",
      "Special Occasion",
      "Other",
    ],
    policies: [
      "Reservations are held for 15 minutes past the scheduled time",
      "For parties of 6 or more, please call us directly",
      "A credit card is required for parties of 8 or more",
      "Special requests are subject to availability",
      "24-hour cancellation notice is required",
      "Children's high chairs and booster seats are available upon request",
    ],
  },

  theme: {
    themeName: "rustic",
    themeType: "dark",
    theme: getTheme("rustic", "light"),
  },
  homepage: {
    hero: {
      heading: "Experience Culinary Excellence",
      subheading: "Where every flavor tells a story",
      backgroundImage: "/hero.jpg",
      cta: {
        primary: {
          text: "Reserve a Table",
          link: "/reservations",
        },
        secondary: {
          text: "View Menu",
          link: "/menu",
        },
      },
    },
    about: {
      title: "Our Story",
      description:
        "Founded in 2010, we've been serving exceptional cuisine that combines traditional recipes with modern innovation. Our passionate team of chefs creates unforgettable dining experiences using only the finest locally-sourced ingredients.",
      image: "/about.jpg",
      stats: [
        { label: "Years of Experience", value: "15+" },
        { label: "Signature Dishes", value: "30+" },
        { label: "Happy Customers", value: "50k+" },
        { label: "Awards Won", value: "12" },
      ],
    },
    features: {
      title: "Why Choose Us",
      subtitle: "Discover what makes us special",
      items: [
        {
          id: "1",
          title: "Farm to Table",
          description:
            "We source our ingredients directly from local farms and suppliers.",
          image: "/farm.jpg",
        },
        {
          id: "2",
          title: "Expert Chefs",
          description:
            "Our culinary team brings years of experience from around the world.",
          image: "/chef.jpg",
        },
        {
          id: "3",
          title: "Perfect Ambiance",
          description: "Elegant dining space designed for comfort and style.",
          image: "/ambiance.jpg",
        },
      ],
    },

    testimonials: {
      title: "What Our Guests Say",
      subtitle: "Real experiences from our valued customers",
      items: [
        {
          id: "1",
          author: "Emily Johnson",
          role: "Food Critic",
          content:
            "An unforgettable dining experience. The attention to detail in every dish is remarkable.",
          image: "/test1.jpg",
          rating: 5,
        },
        {
          id: "2",
          author: "Michael Smith",
          role: "Restaurant Reviewer",
          content:
            "The atmosphere was perfect, and the flavors were absolutely delightful. Highly recommended!",
          image: "/test3.jpg",
          rating: 4,
        },
        {
          id: "3",
          author: "Sophie Lee",
          role: "Travel Blogger",
          content:
            "A must-visit spot for anyone who loves fine dining. The service was exceptional.",
          image: "/test2.jpg",
          rating: 5,
        },
        {
          id: "4",
          author: "James Brown",
          role: "Food Enthusiast",
          content:
            "Every bite was pure perfection. I will definitely return for more. The flavors were outstanding!",
          image: "/test4.jpg",
          rating: 4,
        },
        {
          id: "5",
          author: "Olivia White",
          role: "Chef",
          content:
            "As a chef myself, I can truly appreciate the technique and creativity that went into these dishes.",
          image: "/test6.jpg",
          rating: 5,
        },
        {
          id: "6",
          author: "Daniel Green",
          role: "Food Photographer",
          content:
            "The presentation of the dishes is truly a work of art. I couldn't stop taking pictures!",
          image: "/test5.jpg",
          rating: 4,
        },
      ],
    },

    gallery: {
      categories: [
        {
          name: "Main Course",
          images: [
            {
              url: "/pasta.jpg",
              caption: "Signature Pasta Dish",
              alt: "Freshly made pasta with seasonal ingredients",
            },
            {
              url: "/salmon.jpg",
              caption: "Grilled Salmon",
              alt: "Perfectly grilled salmon with vegetables",
            },
            {
              url: "/pizza.jpg",
              caption: "Vegetarian Pizza",
              alt: "Stone-baked vegetarian pizza",
            },
            {
              url: "/beef.jpg",
              caption: "Beef Wellington",
              alt: "Classic Beef Wellington with mushroom duxelles",
            },
          ],
        },
        {
          name: "Appetizers",
          images: [
            {
              url: "/salad.jpg",
              caption: "Classic Caesar Salad",
              alt: "Fresh Caesar salad with homemade dressing",
            },
            {
              url: "/bruschetta.jpg",
              caption: "Tomato Bruschetta",
              alt: "Traditional Italian bruschetta",
            },
          ],
        },
        {
          name: "Desserts",
          images: [
            {
              url: "/choco.jpg",
              caption: "Chocolate Lava Cake",
              alt: "Warm chocolate lava cake with vanilla ice cream",
            },
            {
              url: "/mango.jpg",
              caption: "Mango Sorbet",
              alt: "Refreshing mango sorbet",
            },
            {
              url: "/fruit.jpg",
              caption: "Fruit Tart",
              alt: "Seasonal fruit tart with custard",
            },
          ],
        },
      ],
    },
    cta: {
      title: "Ready to Experience Our Cuisine?",
      subtitle:
        "Book your table now and enjoy an unforgettable dining experience",
      buttonText: "Make a Reservation",
      buttonLink: "/reservations",
      backgroundImage: "/ambiance.jpg",
    },
  },
};
