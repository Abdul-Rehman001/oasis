"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import siteConfig from "@/app/config/site-config";
import { useContactForm } from "@/services/contactService";
import { useTheme } from "../../hooks/useTheme";

const ContactPage = () => {
  const { theme } = useTheme();
  const { submitContactForm, isSubmitting, response, error } = useContactForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactForm(
        formData,
        siteConfig.contact.contactDetails.email
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  return (
    <section
      className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20 min-h-screen"
      style={{ backgroundColor: theme.background }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl lg:text-4xl font-normal mb-3 sm:mb-4"
            style={{ color: theme.primary }}
          >
            {siteConfig.contact.title}
          </h2>
          <p
            className="text-base sm:text-lg px-4"
            style={{ color: theme.text }}
          >
            {siteConfig.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: theme.secondary }}
          >
            {response && (
              <div className="text-green-600 text-left mb-4">
                {response.message}
              </div>
            )}
            {error && (
              <div className="text-red-600 text-center mb-4">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {["name", "email"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={
                    siteConfig.contact.form[
                      `${field}Placeholder` as
                        | "namePlaceholder"
                        | "emailPlaceholder"
                    ]
                  }
                  required
                  className="p-2.5 sm:p-3 border rounded-md w-full focus:outline-none focus:ring-1 text-sm sm:text-base"
                  style={{
                    backgroundColor: theme.secondary,
                    color: theme.text,
                    borderColor: theme.primary,
                  }}
                />
              ))}
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={siteConfig.contact.form.phonePlaceholder}
              className="p-2.5 sm:p-3 border rounded-md w-full focus:outline-none focus:ring-1 text-sm sm:text-base"
              style={{
                backgroundColor: theme.secondary,
                color: theme.text,
                borderColor: theme.primary,
              }}
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              placeholder={siteConfig.contact.form.messagePlaceholder}
              required
              className="p-2.5 sm:p-3 border rounded-md w-full focus:outline-none focus:ring-1 text-sm sm:text-base"
              style={{
                backgroundColor: theme.secondary,
                color: theme.text,
                borderColor: theme.primary,
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-md font-light tracking-wide transition-all text-sm sm:text-base disabled:opacity-50"
              style={{
                backgroundColor: theme.accent,
                color: theme.background,
              }}
            >
              {isSubmitting
                ? "Sending..."
                : siteConfig.contact.form.submitButtonText}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            {[
              {
                Icon: MapPin,
                content: siteConfig.contact.contactDetails.address,
              },
              {
                Icon: Mail,
                content: siteConfig.contact.contactDetails.email,
              },
              {
                Icon: Phone,
                content: siteConfig.contact.contactDetails.phone,
              },
            ].map(({ Icon, content }, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg shadow-md"
                style={{ backgroundColor: theme.secondary }}
              >
                <Icon
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                  style={{ color: theme.accent }}
                />
                <p
                  className="text-sm sm:text-base break-all"
                  style={{ color: theme.text }}
                >
                  {content}
                </p>
              </div>
            ))}

            <div
              className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg shadow-md"
              style={{ backgroundColor: theme.secondary }}
            >
              <FaWhatsapp
                className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                style={{ color: theme.accent }}
              />
              <a
                href={`https://wa.me/${siteConfig.contact.contactDetails.whatsapp.replace(
                  /\s+/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base hover:underline"
                style={{ color: theme.accent }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Map Section - Render only if mapUrl exists */}
        {siteConfig.contact?.mapUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 sm:mt-12 lg:mt-16 border-1 border-cyan-900"
          >
            <iframe
              src={siteConfig.contact.mapUrl}
              width="100%"
              height="400"
              style={{ border: 2 }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg border-1 border-cyan-900"
            ></iframe>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactPage;
