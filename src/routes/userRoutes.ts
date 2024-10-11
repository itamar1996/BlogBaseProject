import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/userController";
import { log } from "console";
import verifyUser from "../middleware/verifyUser";

const userRouter = Router();

userRouter.post("/",createUser);
userRouter.get("/",verifyUser, getUsers);
userRouter.get("/:username",verifyUser, getUser);

export default userRouter;
