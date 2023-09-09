"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../modules/Users/users.route");
const auth_route_1 = require("../modules/auth/auth.route");
const books_route_1 = require("../modules/books/books.route");
const categories_route_1 = require("../modules/categories/categories.route");
const oders_route_1 = require("../modules/orders/oders.route");
const profile_route_1 = require("../modules/profile/profile.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/users',
        route: users_route_1.UserRoutes,
    },
    {
        path: '/categories',
        route: categories_route_1.CategoryRoute,
    },
    {
        path: '/books',
        route: books_route_1.BookRoute,
    },
    {
        path: '/orders',
        route: oders_route_1.OrderRoute,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.routes = router;
