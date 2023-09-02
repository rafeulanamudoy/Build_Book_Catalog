import express from 'express';
import { UserController } from './auth.controller';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/signUp',
  validateRequest(AuthValidation.signUpZodSchema),
  UserController.createUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  UserController.loginUser
);
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   UserController.refreshToken
// );
