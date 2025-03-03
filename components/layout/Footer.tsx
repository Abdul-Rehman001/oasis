"use client";
import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import siteConfig from "@/app/config/site-config";
import Link from "next/link";
import { useContactForm } from "../../services/contactService";
import toast from "react-hot-toast";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
};

const Footer = () => {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const { submitContactNumber, isSubmitting, error } = useContactForm();

  const contactInfo = [
    { Icon: MapPin, text: siteConfig.contact.contactDetails.address },
    { Icon: Phone, text: siteConfig.contact.contactDetails.phone },
    { Icon: Mail, text: siteConfig.contact.contactDetails.email },
  ];

  const handleWhatsAppSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage("");

    // Simple validation
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setFormMessage("Please enter a valid phone number");
      return;
    }

    try {
      // Use the submitContactNumber function from your hook
      const response = await submitContactNumber(phoneNumber);
      console.log("API Response:", response); // Log the API response

      if (response.success) {
        toast.success("Thanks for subscribing to our WhatsApp updates!");
        setPhoneNumber("");
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error submitting contact number:", err); // Log the error
      toast.error("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <footer style={{ backgroundColor: theme.secondary }}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Newsletter Section */}
        <div
          className="py-8 border-b"
          style={{ borderColor: `${theme.text}20` }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3
              className="text-2xl font-display mb-3"
              style={{ color: theme.primary }}
            >
              Stay Updated
            </h3>
            <p className="mb-6" style={{ color: theme.text }}>
              Subscribe to our WhatsApp updates for exclusive offers, new menu
              items, and special events.
            </p>

            <form
              onSubmit={handleWhatsAppSignup}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-grow">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your WhatsApp number"
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  style={{
                    backgroundColor: `${theme.text}10`,
                    color: theme.text,
                    border: `1px solid ${theme.text}30`,
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-md font-medium flex items-center justify-center gap-2"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.secondary,
                }}
              >
                {isSubmitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {formMessage && (
              <p className="mt-3 text-sm" style={{ color: theme.accent }}>
                {formMessage}
              </p>
            )}

            {error && (
              <p className="mt-3 text-sm" style={{ color: "red" }}>
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-12">
          {/* Restaurant Info */}
          <div>
            <h3
              className="text-2xl font-display mb-4 sm:mb-6"
              style={{ color: theme.primary }}
            >
              {siteConfig.name}
            </h3>
            <p className="mb-4 sm:mb-6" style={{ color: theme.text }}>
              A place where flavors meet passion. Experience fine dining like
              never before.
            </p>
            <div className="flex space-x-4">
              {Object.entries(siteConfig.social).map(([key, url], index) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                if (!Icon || !url) return null; // Skip if icon is not defined or URL is empty

                return (
                  <Link
                    key={index}
                    href={url}
                    className="transition-colors duration-300"
                    style={{ color: theme.text }}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-medium mb-4 sm:mb-6"
              style={{ color: theme.primary }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {["Menu", "Reservations", "About Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="transition-colors duration-300"
                    style={{ color: theme.text }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Offerings */}
          <div>
            <h4
              className="text-lg font-medium mb-4 sm:mb-6"
              style={{ color: theme.primary }}
            >
              Our Offerings
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Fine Dining",
                "Private Events",
                "Chef's Specials",
                "Seasonal Menu",
                "Catering Services",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="transition-colors duration-300"
                    style={{ color: theme.text }}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-lg font-medium mb-4 sm:mb-6"
              style={{ color: theme.primary }}
            >
              Contact Us
            </h4>
            <ul className="space-y-3" style={{ color: theme.text }}>
              {contactInfo.map(({ Icon, text }, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: theme.accent }}
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t py-6"
          style={{ borderColor: `${theme.text}20` }}
        >
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center">
            <p style={{ color: theme.text }}>
              © 2025 {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="transition-colors duration-300"
                    style={{ color: theme.text }}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
