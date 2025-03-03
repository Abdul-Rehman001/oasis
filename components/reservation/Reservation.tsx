"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import defaultConfig from "../../app/config/site-config";
import { useState } from "react";
import { Calendar, Clock, Users, Utensils } from "lucide-react";
import { ReservationService } from "@/services/reservationService";
import { toast, Toaster } from "react-hot-toast";
import siteConfig from "../../app/config/site-config";

// Initialize the reservation service
const reservationService = new ReservationService(
  process.env.NEXT_PUBLIC_STORE_ID || "",
  siteConfig.contact.contactDetails.email
);

export default function ReservationPage() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reservationService.submitReservation({
        ...formData,
        guests: parseInt(formData.guests),
      });

      toast.success("Reservation submitted successfully!");
      // Reset form
      setFormData({
        date: "",
        time: "",
        guests: "2",
        occasion: "",
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    } catch (error) {
      toast.error("Failed to submit reservation. Please try again.");
      console.error("Reservation submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section
        className="relative min-h-screen flex items-center overflow-hidden lg:pt-4 pt-12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${theme.accent}20, ${theme.accent}10), url('/hero.jpg')`,
        }}
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 backdrop-blur-sm" />
        </motion.div>

        <div className="relative z-10 w-full max-w-full mx-auto px-4 lg:px-24 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Reservation Form */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
              style={{ backgroundColor: `${theme.secondary}90` }}
            >
              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: theme.primary }}
              >
                {defaultConfig.reservation.title}
              </h1>
              <p className="text-lg mb-8" style={{ color: theme.text }}>
                {defaultConfig.reservation.subtitle}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date & Time Selection */}
                  <div>
                    <label
                      className="flex items-center gap-2 mb-2"
                      style={{ color: theme.primary }}
                    >
                      <Calendar size={20} />
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 rounded-lg"
                      style={{
                        backgroundColor: `${theme.background}60`,
                        color: theme.text,
                      }}
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="flex items-center gap-2 mb-2"
                      style={{ color: theme.primary }}
                    >
                      <Clock size={20} />
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 rounded-lg"
                      style={{
                        backgroundColor: `${theme.background}60`,
                        color: theme.text,
                      }}
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Guests & Occasion */}
                  <div>
                    <label
                      className="flex items-center gap-2 mb-2"
                      style={{ color: theme.primary }}
                    >
                      <Users size={20} />
                      Number of Guests
                    </label>
                    <select
                      className="w-full p-3 rounded-lg"
                      style={{
                        backgroundColor: `${theme.background}60`,
                        color: theme.text,
                      }}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="flex items-center gap-2 mb-2"
                      style={{ color: theme.primary }}
                    >
                      <Utensils size={20} />
                      Occasion
                    </label>
                    <select
                      className="w-full p-3 rounded-lg"
                      style={{
                        backgroundColor: `${theme.background}60`,
                        color: theme.text,
                      }}
                      value={formData.occasion}
                      onChange={(e) =>
                        setFormData({ ...formData, occasion: e.target.value })
                      }
                    >
                      <option value="">Select an occasion</option>
                      {defaultConfig.reservation.occasions.map((occasion) => (
                        <option key={occasion} value={occasion}>
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg"
                    style={{
                      backgroundColor: `${theme.background}60`,
                      color: theme.text,
                    }}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 rounded-lg"
                    style={{
                      backgroundColor: `${theme.background}60`,
                      color: theme.text,
                    }}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 rounded-lg"
                    style={{
                      backgroundColor: `${theme.background}60`,
                      color: theme.text,
                    }}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                  <textarea
                    placeholder="Special Requests or Notes"
                    className="w-full p-3 rounded-lg"
                    style={{
                      backgroundColor: `${theme.background}60`,
                      color: theme.text,
                    }}
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequests: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full text-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.background,
                  }}
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : defaultConfig.reservation.submitButtonText}
                </button>
              </form>
            </motion.div>

            {/* Information Section */}
            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
              style={{ backgroundColor: `${theme.background}90` }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: theme.primary }}
              >
                Dining Hours & Information
              </h2>

              <div className="space-y-6">
                {/* Hours */}
                <div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: theme.accent }}
                  >
                    Opening Hours
                  </h3>
                  <div className="space-y-2">
                    {defaultConfig.hours.map((hour) => (
                      <div
                        key={hour.day}
                        className="flex justify-between"
                        style={{ color: theme.text }}
                      >
                        <span>{hour.day}</span>
                        <span>
                          {hour.open} - {hour.close}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policies */}
                <div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: theme.accent }}
                  >
                    Reservation Policies
                  </h3>
                  <ul className="space-y-2" style={{ color: theme.text }}>
                    {defaultConfig.reservation.policies.map((policy, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span
                          className="text-2xl leading-none"
                          style={{ color: theme.accent }}
                        >
                          •
                        </span>
                        <span>{policy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
