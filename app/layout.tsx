import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { defaultConfig } from "../config/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Oasis Restraunts",
  description:
    "Transform your space with Rainbow Interiors. We create stunning, personalized interior designs for homes, offices, and commercial spaces.",
  icons: "/restaurant.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Navbar config={defaultConfig} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
