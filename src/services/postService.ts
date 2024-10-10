import newPostDTO from "../DTO/newPostDTO";
import responseData from "../DTO/responceDataDTO";
import postModel from "../models/postModel";
import userModel from "../models/userModel";
export default class PostService{
    public static async createPost(newPost:newPostDTO):Promise<responseData<{ id: string }>>{
        try {                        
            const { title, content,author } = newPost;
            const dbPost = new postModel({
              title,
              content,
              author
              });     
            await dbPost.save()  
            const populatedPost = await postModel.findById(dbPost._id).populate('author', 'id username email');

            return {
                err: false,
                message: "created",
                status: 200,
                data:populatedPost
            };
        } catch (error) {
            return {
                err: true,
                message: "server eror",
                status: 500,
                data:error
            };
        }
    }
    public static async getAllPosts(): Promise<responseData<{ id: string; title: string; content: string; author: { id: string; username: string; email: string } }>>  {
        try {
            const posts = await postModel.find({})
            .select('id title content author')
            .populate('author', 'id username email');
            return {
                err: false,
                message: "Fetched posts successfully",
                status: 200,
                data: posts
            };
        } catch (error) {
            console.error("Error fetching posts:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    public static async getByUserName(username: string): Promise<responseData<{ id: string; title: string; content: string; author: { id: string; username: string; email: string } }>> {
        try {
            const user = await userModel.findOne({ username }).select('id username email'); 
    
            if (!user) {
                return {
                    err: true,
                    message: "User not found",
                    status: 404,
                    data: null 
                };
            }
    
            return {
                err: false,
                message: "Fetched user successfully",
                status: 200,
                data: user
            };
        } catch (error) {
            console.error("Error fetching user:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    
    
}