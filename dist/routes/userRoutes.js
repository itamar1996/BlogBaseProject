"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const verifyUser_1 = __importDefault(require("../middleware/verifyUser"));
const userRouter = (0, express_1.Router)();
userRouter.post("/", userController_1.createUser);
userRouter.get("/", verifyUser_1.default, userController_1.getUsers);
userRouter.get("/:username", verifyUser_1.default, userController_1.getUser);
exports.default = userRouter;
