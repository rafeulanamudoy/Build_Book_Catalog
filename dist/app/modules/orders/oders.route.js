"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const specificOrderAuth_1 = __importDefault(require("../../middlewares/specificOrderAuth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const orders_controller_1 = require("./orders.controller");
const orders_validation_1 = require("./orders.validation");
const router = express_1.default.Router();
exports.OrderRoute = router;
router.post('/create-order', (0, validateRequest_1.default)(orders_validation_1.OrderValidation.createOrder), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.OrderController.createOrder);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), orders_controller_1.OrderController.getOrders);
router.get('/:orderId', (0, specificOrderAuth_1.default)(), orders_controller_1.OrderController.getSingleOrder);
