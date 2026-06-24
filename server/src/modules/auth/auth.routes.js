import { Router } from 'express';

import { signupController, loginController, adminLoginController, becomeOwnerController } from './auth.controller.js';
import { signupSchema, loginSchema, venueSchema } from './auth.validation.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';

const authRoutes = Router();

authRoutes.post(
   '/signup',
   validate(signupSchema),
   signupController
);

authRoutes.post(
   '/login',
   validate(loginSchema),
   loginController
);

authRoutes.post(
   '/admin/login',
   validate(loginSchema),
   adminLoginController
);

authRoutes.post(
   '/become-owner',
   validate(venueSchema), 
   becomeOwnerController
);


export default authRoutes;
