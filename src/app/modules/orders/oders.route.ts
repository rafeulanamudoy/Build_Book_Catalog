import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import specificOrderAuth from '../../middlewares/specificOrderAuth';
import { OrderController } from './orders.controller';

const router = express.Router();
export const OrderRoute = router;
router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrders
);
router.get('/:orderId', specificOrderAuth(), OrderController.getSingleOrder);
