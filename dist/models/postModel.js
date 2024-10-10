"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // מוודא שהשדה מקושר למודל של משתמש
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now // הוספת ערך ברירת מחדל לתאריך
    },
});
const PostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    comments: [CommentSchema], // הוספת תגובות ישירות באמצעות הסכמה של תגובות
});
exports.default = mongoose_1.default.model("Post", PostSchema);
