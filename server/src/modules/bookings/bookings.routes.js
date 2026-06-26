import express from "express";

import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  updateBookingStatus,
  cancelBooking,
  completeBooking,
} from "./bookings.controller.js";

import {authenticate} from "../../shared/middlewares/auth.middleware.js";

import {authorize} from "../../shared/middlewares/authorize.middleware.js";

import {validate} from "../../shared/middlewares/validate.middleware.js";

import {
    createBookingSchema,
    updateBookingStatusSchema,
  } from "./bookings.validation.js";

const bookingRoutes = express.Router();

bookingRoutes.post(
  "/",
  authenticate,
  authorize("USER"),
  validate(createBookingSchema),
  createBooking
);

bookingRoutes.get(
  "/my",
  authenticate,
  getMyBookings
);

bookingRoutes.get(
  "/owner",
  authenticate,
  authorize("OWNER"),
  getOwnerBookings
);

bookingRoutes.patch(
  "/:id/status",
  authenticate,
  authorize("OWNER"),
  validate(updateBookingStatusSchema),
  updateBookingStatus
);

bookingRoutes.patch(
  "/:id/cancel",
  authenticate,
  authorize("OWNER"),
  cancelBooking
);

bookingRoutes.patch(
  "/:id/complete",
  authenticate,
  authorize("OWNER"),
  completeBooking
);

export default bookingRoutes;