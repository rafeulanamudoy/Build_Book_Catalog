import express from 'express';
import { UserRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export const routes = router;
