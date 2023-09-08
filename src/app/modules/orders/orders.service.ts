import { OrderModel, OrderedBook } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (
  userId: string,
  books: OrderedBook[]
): Promise<any> => {
  console.log(typeof books, books);

  const orderTransaction = await prisma.$transaction(
    async transactionClient => {
      // Create the order
      const order = await transactionClient.orderModel.create({
        data: {
          userId: userId,
        },
      });
      if (!order) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
      }
      for (const orderedBookData of books) {
        await transactionClient.orderedBook.create({
          data: {
            orderId: order.id,
            bookId: orderedBookData.bookId,
            quantity: orderedBookData.quantity,
          },
        });
      }
      return order;
    }
  );
  const responseData = await prisma.orderModel.findUnique({
    where: {
      id: orderTransaction.id,
    },
    include: {
      orderedBooks: true,
    },
  });
  return responseData;
};

const getOrders = async (
  role: string,
  userId: string
): Promise<OrderModel[]> => {
  console.log(role, userId, 'from serv ice');
  let result;

  if (userId && role === 'admin') {
    result = await prisma.orderModel.findMany({
      include: {
        orderedBooks: true,
      },
    });
    return result;
  }
  result = await prisma.orderModel.findMany({
    where: {
      userId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};
export const OrderService = {
  createOrder,
  getOrders,
};
