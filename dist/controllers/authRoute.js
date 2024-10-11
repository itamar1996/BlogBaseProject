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
exports.handleSignOutRequset = exports.handleSigninRequset = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const handleSigninRequset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("ygcvjg");
        const result = yield authService_1.default.login(req.body);
        res.cookie('auth_token', result.data, { httpOnly: true });
        // res.cookie("token",result.data).status(result.status!).json(result);   
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleSigninRequset = handleSigninRequset;
const handleSignOutRequset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield authService_1.default.login(req.body);
        res.cookie("token", result.data).status(result.status).json(result);
    }
    catch (error) {
    }
});
exports.handleSignOutRequset = handleSignOutRequset;
