import { Router } from "express";

import {
  getMyAccount,
  updateMyAccount,
} from "./account.controller.js";

import {
  authenticate,
} from "../../shared/middlewares/auth.middleware.js";

import {
  validate,
} from "../../shared/middlewares/validate.middleware.js";

import {
  updateAccountSchema,
} from "./account.validation.js";

const accountRoutes = Router();

accountRoutes.get(
  "/",
  authenticate,
  getMyAccount
);

accountRoutes.patch(
  "/",
  authenticate,
  validate(updateAccountSchema),
  updateMyAccount
);

export default accountRoutes;