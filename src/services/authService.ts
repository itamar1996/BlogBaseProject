import LoginDTO from "../DTO/loginDTO"
import ResponseData from "../DTO/responceDataDTO";
import SigninResponseDTO from "../DTO/signinResponseDTO";
import TokenPayloadDTO from "../DTO/tokenPayloadDTO"
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import bcrypt from 'bcrypt'





export default class AuthService {
    public static async login(userData1:LoginDTO): Promise<ResponseData<SigninResponseDTO|unknown>>{
        try {
        const { username, password } = userData1        
        if(!password||!username)
            {
                return {
                    err:true,
                    message:"missing detles",
                    status:400
                }
            }
            const user = await 
            userModel.findOne({ username }).select('+password');
            if (!user) {
                return {
                    err: true,
                    message: "user not found",
                    status: 400
                };
            }
            const passresult =  await bcrypt.compare(password, user.password)

            if(!passresult)
            {
                return {
                    err: true,
                    message: "password not corect",
                    status: 400
                };
            }

        const payload:TokenPayloadDTO = {
            username,
            id: user.id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn:"10m"
          })          

          return {
            err:false,
            status:200,
            data:{
                token
            }
          }
        }
        catch(error)
        {            
            return {
                err: true,
                message: "Missing madatory data",
                status: 500,
                data:error
              };
        }
    }
    public static async logout(userData:LoginDTO):Promise<void>{
        
    }
 }