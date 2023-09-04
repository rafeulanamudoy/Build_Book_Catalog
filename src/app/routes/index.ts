import express from 'express';
import { UserRoutes } from '../modules/Users/users.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CategoryRoute } from '../modules/categories/categories.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export const routes = router;
