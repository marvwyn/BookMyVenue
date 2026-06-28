import { z } from "zod";

export const ownerOnboardingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Venue name must be at least 3 characters"),

  type: z.enum(
    [
      "AUDITORIUM",
      "BANQUET_HALL",
      "CAFE",
      "RESTAURANT",
      "CONFERENCE_ROOM",
      "STUDIO",
      "OUTDOOR_SPACE",
      "OTHER",
    ],
    {
      errorMap: () => ({
        message: "Please select a venue type",
      }),
    }
  ),

  city: z
    .string()
    .trim()
    .min(2, "City is required"),

  address: z
    .string()
    .trim()
    .min(5, "Address is required"),

  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters")
    .max(1000, "Description is too long"),

  capacity: z.coerce
    .number({
      invalid_type_error: "Capacity is required",
    })
    .min(1, "Capacity must be at least 1"),

  price: z.coerce
    .number({
      invalid_type_error: "Price is required",
    })
    .min(1, "Price must be greater than 0"),
});