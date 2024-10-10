import { Request, Response, NextFunction } from "express";
import newPostDTO from "../DTO/newPostDTO";
import PostService from "../services/postService";
import updatePostDTO from "../DTO/updatePostDTO";
import addCommentDTO from "../DTO/addCommentDTO";

// Create a new post
export const createPost = async (
  req: Request<any,any,newPostDTO>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result =  await PostService.createPost(req.body);
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {    
    const result =  await PostService.deleteByPostId(req.params.id);

    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};



// Get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result =  await PostService.getAllPosts();
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};


// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result =  await PostService.getByPostId(req.params.id);
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};


// Update a post
export const updatePost = async (
  req: Request<any,any,updatePostDTO>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result =  await PostService.updatePost(req.params.id,req.body);
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};


// Add a comment to a post
export const addComment = async (
  req: Request<any,any,addCommentDTO>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result =  await PostService.handelAddComment(req.params.id,req.body);
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};


