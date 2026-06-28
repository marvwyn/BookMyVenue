import { Router } from "express";

import {
  onboardOwner,
} from "./owner.controller.js";

import {
  authenticate,
} from "../../shared/middlewares/auth.middleware.js";

import {
  validate,
} from "../../shared/middlewares/validate.middleware.js";

import upload from "../../shared/middlewares/upload.middleware.js";

import {
  ownerOnboardingSchema,
} from "./owner.validation.js";

const ownerRoutes = Router();

ownerRoutes.post(
  "/onboarding",

  authenticate,

  upload.array("images", 5),

  validate(ownerOnboardingSchema),

  onboardOwner
);

export default ownerRoutes;