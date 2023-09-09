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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const books_constant_1 = require("./books.constant");
const createBooks = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user)
    data.publicationDate = new Date(data.publicationDate);
    console.log(data);
    const result = yield prisma_1.default.bookModel.create({
        data,
    });
    return result;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    //console.log(filters, 'filters data');
    //console.log(filterData, 'filterData');
    //   console.log(search, filterData, 'filters');
    //   console.log(page, limit, skip, 'pagination');
    //console.log(search);
    const andConditons = [];
    if (search) {
        andConditons.push({
            OR: books_constant_1.BookSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.entries(filterData).map(([field, value]) => {
                if (field === 'price') {
                    const numericValue = parseFloat(value);
                    return {
                        [field]: {
                            equals: numericValue,
                        },
                    };
                }
                else if (field === 'category') {
                    return {
                        category: {
                            id: value,
                        },
                    };
                }
                else if (field === 'minPrice') {
                    const parseMinPrice = parseInt(value);
                    return {
                        price: {
                            lte: parseMinPrice,
                        },
                    };
                }
                else if (field === 'maxPrice') {
                    const parseMaxPrice = parseInt(value);
                    return {
                        price: {
                            gte: parseMaxPrice,
                        },
                    };
                }
                return {
                    [field]: {
                        equals: value,
                    },
                };
            }),
        });
    }
    // console.log(Object.keys(filterData), 'using key');
    //console.log(Object.entries(filterData), 'using entries');
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.bookModel.findMany({
        where: whereConditons,
        include: {
            category: true,
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                price: 'desc',
            },
    });
    const total = yield prisma_1.default.bookModel.count();
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBookByCategory = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // console.log(page, size, skip);
    const result = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
        include: {
            books: {
                skip,
                take: size,
            },
        },
    });
    if (!result) {
        return {
            meta: {
                page,
                size,
                total: 0,
                totalPage: 0,
            },
            data: [],
        };
    }
    const total = result === null || result === void 0 ? void 0 : result.books.length;
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result.books,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookModel.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookModel.update({
        where: {
            id,
        },
        data: data,
    });
    return result;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookModel.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookService = {
    createBooks,
    getAllBooks,
    getBookByCategory,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
};
