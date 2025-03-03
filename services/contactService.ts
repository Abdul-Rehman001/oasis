import siteConfig from "../app/config/site-config";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitContactNumber = async (phone: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://dev-bloom-email-service.azurewebsites.net/api/contact-number`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            storeId: process.env.NEXT_PUBLIC_STORE_ID,
            toEmail: siteConfig.contact.contactDetails.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send phone number");
      }

      const data = await response.json();
      setResponse(data);
      return data;
    } catch (err) {
      console.error("Error in submitContactNumber:", err); // Log the error
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitContactForm = async (
    formData: ContactFormData,
    toEmail: string
  ) => {
    setIsSubmitting(true);
    setError(null);
    setResponse(null);

    try {
      // First, send the phone number
      await submitContactNumber(formData.phone);

      // Then, send the full contact form
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/email/contact-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            storeId: process.env.NEXT_PUBLIC_STORE_ID,
            toEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send contact form");
      }

      const data: ApiResponse = await response.json();
      console.log("data", data);
      setResponse(data);
      return data;
    } catch (err) {
      console.error("Error in submitContactForm:", err); // Log the error
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitContactForm,
    submitContactNumber,
    isSubmitting,
    response,
    error,
  };
};
