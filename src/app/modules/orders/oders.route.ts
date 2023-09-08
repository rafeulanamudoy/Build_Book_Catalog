import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import specificOrderAuth from '../../middlewares/specificOrderAuth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './orders.controller';
import { OrderValidation } from './orders.validation';

const router = express.Router();
export const OrderRoute = router;
router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrder),
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrders
);
router.get('/:orderId', specificOrderAuth(), OrderController.getSingleOrder);
