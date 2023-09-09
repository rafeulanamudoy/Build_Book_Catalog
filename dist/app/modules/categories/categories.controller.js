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
exports.CategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const categories_service_1 = require("./categories.service");
const createCatagory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    // console.log(category);
    const result = yield categories_service_1.CatagoryService.createCatagory(category);
    // eslint-disable-next-line no-unused-vars
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Category created successfully',
        data: result,
    });
}));
const getCatagories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(category);
    const result = yield categories_service_1.CatagoryService.getCatagories();
    // eslint-disable-next-line no-unused-vars
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Category fetched  successfully',
        data: result,
    });
}));
const getSingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(category);
    const id = req.params.id;
    const result = yield categories_service_1.CatagoryService.getSingleCategory(id);
    // eslint-disable-next-line no-unused-vars
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Category fetched  successfully',
        data: result,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(category);
    const id = req.params.id;
    const updatedInfo = req.body;
    const result = yield categories_service_1.CatagoryService.updateCategory(id, updatedInfo);
    // eslint-disable-next-line no-unused-vars
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Category updated  successfully',
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(category);
    const id = req.params.id;
    const result = yield categories_service_1.CatagoryService.deleteCategory(id);
    // eslint-disable-next-line no-unused-vars
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Category deleted  successfully',
        data: result,
    });
}));
exports.CategoryController = {
    createCatagory,
    getCatagories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
