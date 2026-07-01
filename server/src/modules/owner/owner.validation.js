import { z } from "zod";

export const ownerOnboardingSchema = z.object({

    name: z
        .string()
        .min(1, "Venue name is required"),

    type: z.enum([
        "AUDITORIUM",
        "BANQUET_HALL",
        "CAFE",
        "RESTAURANT",
        "CONFERENCE_ROOM",
        "STUDIO",
        "OUTDOOR_SPACE",
        "OTHER",
    ]),

    city: z
        .string()
        .min(1, "City is required"),

    address: z
        .string()
        .min(1, "Address is required"),

    latitude: z.coerce
        .number(),

    longitude: z.coerce
        .number(),

    placeId: z
        .string()
        .optional()
        .or(z.literal("")),

    description: z
        .string()
        .min(
            20,
            "Description should be at least 20 characters"
        )
        .optional()
        .or(z.literal("")),

    capacity: z.coerce
        .number()
        .positive()
        .optional(),

    price: z.coerce
        .number()
        .positive()
        .optional(),

});