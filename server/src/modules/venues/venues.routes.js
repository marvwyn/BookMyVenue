import { Router } from "express";
import {
  deleteVenue,
  getVenueById,
  getVenues,
  createVenue,
  updateVenue,
  becomeOwnerController,
} from "./venues.controller.js";
import { authenticate } from "./../../shared/middlewares/auth.middleware.js";
import { authorize } from "./../../shared/middlewares/authorize.middleware.js";
import { validate } from "../../shared/middlewares/validate.middleware.js";
import { becomePartnerSchema, createVenueSchema, updateVenueSchema } from "./venues.validation.js";
import upload from "../../shared/middlewares/upload.middleware.js";

const venueRoutes = Router();

venueRoutes.post(
  "/",
  authenticate,
  authorize("OWNER"),
  validate(createVenueSchema),
  createVenue,
);

venueRoutes.get("/", getVenues);

venueRoutes.get("/:id", getVenueById);

venueRoutes.patch(
  "/:id",
  authenticate,
  authorize("OWNER"),
  upload.array("images", 5),
  validate(updateVenueSchema),
  updateVenue,
);

venueRoutes.delete("/:id", authenticate, authorize("OWNER"), deleteVenue);

venueRoutes.post(
  "/become-owner",
  authenticate,
  upload.array("images", 5), 
  validate(becomePartnerSchema), 
  becomeOwnerController,
);

export default venueRoutes;
