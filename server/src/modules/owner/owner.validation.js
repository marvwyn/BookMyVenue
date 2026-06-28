import { z } from "zod";

export const ownerOnboardingSchema =
  z.object({

    name:
      z.string().min(1),

    type:
      z.enum([
        "AUDITORIUM",
        "BANQUET_HALL",
        "CAFE",
        "RESTAURANT",
        "CONFERENCE_ROOM",
        "STUDIO",
        "OUTDOOR_SPACE",
        "OTHER",
      ]),

    city:
      z.string().min(1),

    address:
      z.string().optional(),

    description:
      z.string().optional(),

    capacity:
      z.coerce
        .number()
        .positive()
        .optional(),

    price:
      z.coerce
        .number()
        .positive()
        .optional(),

    amenities:
      z.preprocess((value) => {
        if (!value) return [];

        if (Array.isArray(value)) {
          return value;
        }

        return [value];
      }, z.array(z.string())),

  });