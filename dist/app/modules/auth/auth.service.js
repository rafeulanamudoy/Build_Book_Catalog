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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const isUserExist_1 = __importDefault(require("../../../helpers/isUserExist"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const passwordHash_1 = __importDefault(require("../../../helpers/passwordHash"));
const passwordMatch_1 = __importDefault(require("../../../helpers/passwordMatch"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user)
    const modifyUser = yield (0, passwordHash_1.default)(user);
    const result = yield prisma_1.default.user.create({
        data: modifyUser,
    });
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const userExist = yield (0, isUserExist_1.default)(email);
    if (!userExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Doesn,t Exist');
    }
    // console.log(userExist, 'from service file 30 number line');
    if (userExist.password &&
        !(yield (0, passwordMatch_1.default)(password, userExist.password))) {
        // console.log(
        //   await isPasswordMatched(password, userExist.password),
        //   'to chekc password'
        // );
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { id, role } = userExist;
    // console.log(userExist, 'from auth service tocheck user');
    const token = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        token,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    console.log('decoded token ', verifiedToken);
    const { id } = verifiedToken;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        email: isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({});
    return result;
});
exports.AuthService = {
    createUser,
    loginUser,
    refreshToken,
    getAllUsers,
};
