import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

export const UserRoutes = router;

router.get('/', UserController.getAllUsers);
