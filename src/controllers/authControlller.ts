import { Request, Response } from "express";
import LoginDTO from "../DTO/loginDTO";
import AuthService from "../services/authService";
import responseData from "../DTO/responceDataDTO";


export const handleSigninRequest = async (
    req: Request<any, any, LoginDTO>,
    res: Response
): Promise<void> => {
    try {
        const result = await AuthService.login(req.body);
        if (result.err) {
                res.status(200).json(result)
                return
            }
            
        console.log(result);
        res.cookie('auth_token', result.data?.token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });        
        res.status(200).json(result)

    } catch (error) {
        console.log("Server error:", error);
        res.status(400).json(error)

    }
};



export const handleLogoutRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        // מחיקת העוגייה
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        // אם יש מידע נוסף לנקות בשרת (כמו סשן), עשה זאת כאן
        // לדוגמה: req.session.destroy();

        res.status(200).json({ message: 'התנתקת בהצלחה' });
    } catch (error) {
        console.error("שגיאת שרת בעת התנתקות:", error);
        res.status(500).json({ error: 'אירעה שגיאה בעת ניסיון התנתקות' });
    }
};