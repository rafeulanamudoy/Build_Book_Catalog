"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (userId, books) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(typeof books, books);
    const orderTransaction = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Create the order
        const order = yield transactionClient.orderModel.create({
            data: {
                userId: userId,
            },
        });
        if (!order) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create order');
        }
        for (const orderedBookData of books) {
            yield transactionClient.orderedBook.create({
                data: {
                    orderId: order.id,
                    bookId: orderedBookData.bookId,
                    quantity: orderedBookData.quantity,
                },
            });
        }
        return order;
    }));
    const responseData = yield prisma_1.default.orderModel.findUnique({
        where: {
            id: orderTransaction.id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return responseData;
});
const getOrders = (role, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(role, userId, 'from serv ice');
    let result;
    if (userId && role === 'admin') {
        result = yield prisma_1.default.orderModel.findMany({
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    result = yield prisma_1.default.orderModel.findMany({
        where: {
            userId,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.orderModel.findUnique({
        where: {
            id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getOrders,
    getSingleOrder,
};
