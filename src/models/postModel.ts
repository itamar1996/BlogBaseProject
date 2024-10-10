import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
}


const CommentSchema = new mongoose.Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // מוודא שהשדה מקושר למודל של משתמש
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now // הוספת ערך ברירת מחדל לתאריך
  },
});
const PostSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comments: [CommentSchema], // הוספת תגובות ישירות באמצעות הסכמה של תגובות
});


const Comment = mongoose.model('Comment', CommentSchema);
const Post = mongoose.model('Post', PostSchema);
