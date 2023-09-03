import express from 'express';
import { AuthController } from './auth.controller';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

export const AuthRoute = router;

router.post(
  '/signUp',
  validateRequest(AuthValidation.signUpZodSchema),
  AuthController.createUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
// router.get('/', UserController.getAllUsers);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
