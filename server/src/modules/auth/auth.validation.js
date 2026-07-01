import { z } from "zod";

export const venueSchema = z.object({

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
    .coerce
    .string()
    .optional(),

});

export const signupSchema = z
  .object({

    accountType: z.enum([
      "USER",
      "OWNER",
    ]),

    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    phone: z
      .string()
      .min(10, "Phone number is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    venue: venueSchema.optional(),

  })
  .superRefine((data, ctx) => {

    if (
      data.accountType === "OWNER" &&
      !data.venue
    ) {

      ctx.addIssue({

        code: z.ZodIssueCode.custom,

        path: ["venue"],

        message: "Venue details are required",

      });

    }

  });

export const loginSchema = z.object({

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),

});