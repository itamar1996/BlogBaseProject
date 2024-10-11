"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = require("../routes/authRoute");
const router = (0, express_1.Router)();
router.post("/login", authRoute_1.handleSigninRequset);
router.delete('./logout', () => { });
exports.default = router;
