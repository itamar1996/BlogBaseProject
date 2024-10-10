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
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
class PostService {
    static createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, author } = newPost;
                const dbPost = new postModel_1.default({
                    title,
                    content,
                    author
                });
                yield dbPost.save();
                const user = yield userModel_1.default.findById(author);
                if (!user) {
                    return {
                        err: true,
                        message: "User not found",
                        status: 404,
                        data: null
                    };
                }
                user.posts.push(dbPost._id);
                yield user.save();
                const populatedPost = yield postModel_1.default.findById(dbPost._id).populate('author', 'id username email');
                return {
                    err: false,
                    message: "created",
                    status: 200,
                    data: populatedPost
                };
            }
            catch (error) {
                return {
                    err: true,
                    message: "server eror",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postModel_1.default.find({})
                    .select('id title content author')
                    .populate('author', 'id username email');
                return {
                    err: false,
                    message: "Fetched posts successfully",
                    status: 200,
                    data: posts
                };
            }
            catch (error) {
                console.error("Error fetching posts:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static getByPostId(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findById(postid)
                    .select('id title content author')
                    .populate('author', 'id username email');
                if (!post) {
                    return {
                        err: true,
                        message: "post not found",
                        status: 404,
                        data: null
                    };
                }
                return {
                    err: false,
                    message: "Fetched post successfully",
                    status: 200,
                    data: post
                };
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static updatePost(postid, newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = newPost;
                const post = yield postModel_1.default.findByIdAndUpdate(postid, { $set: { title: title, content: content } }, { new: true, runValidators: true })
                    .select('id title content author')
                    .populate('author', 'id username email');
                if (!post) {
                    return {
                        err: true,
                        message: "post not found",
                        status: 404,
                        data: null
                    };
                }
                return {
                    err: false,
                    message: "post update successfully",
                    status: 200,
                    data: post
                };
            }
            catch (error) {
                console.error("Error fetching post:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static deleteByPostId(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findById(postid)
                    .select('author');
                const user = yield userModel_1.default.findById(post === null || post === void 0 ? void 0 : post.author);
                if (!user) {
                    return {
                        err: true,
                        message: "user not found",
                        status: 404,
                        data: null
                    };
                }
                yield userModel_1.default.updateOne({ _id: post === null || post === void 0 ? void 0 : post.author }, { $pull: { posts: postid } });
                const result = yield postModel_1.default.deleteOne({ _id: postid });
                if (!result) {
                    return {
                        err: true,
                        message: "post not found",
                        status: 404,
                        data: null
                    };
                }
                return {
                    err: false,
                    message: "Fetched post successfully",
                    status: 200,
                    data: postid
                };
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
}
exports.default = PostService;
