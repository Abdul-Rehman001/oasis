// services/reservationService.ts
import axios from "axios";
import { toast } from "react-hot-toast";

export interface ReservationFormData {
  name: string;
  email: string;
  message?: string;
  phone: string;
  toEmail: string;
  storeId: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
}

export class ReservationService {
  private readonly API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/email/reservation-form`;
  private readonly storeId: string;
  private readonly toEmail: string;

  constructor(storeId: string, toEmail: string) {
    this.storeId = storeId;
    this.toEmail = toEmail;
  }

  async submitReservation(
    formData: Omit<ReservationFormData, "storeId" | "toEmail">
  ) {
    try {
      const reservationData: ReservationFormData = {
        ...formData,
        storeId: this.storeId,
        toEmail: this.toEmail,
        message: formData.specialRequests || "Reservation request",
        guests: Number(formData.guests),
      };

      const response = await axios.post(this.API_URL, reservationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      toast.error("Failed to submit reservation. Please try again.");
      console.error("Error submitting reservation:", error);
      throw error;
    }
  }
}
