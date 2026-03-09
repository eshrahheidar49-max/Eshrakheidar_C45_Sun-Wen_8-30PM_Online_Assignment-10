import { Router } from "express";
import * as US from "./user.service.js"
import { authentication } from "../../common/middleware/authentication.js";
import { authorization } from "../../common/middleware/authorization.js";
import { RoleEnum } from "../../common/Enum/user.enum.js";
const userRouter=Router();
userRouter.post("/signup",US.signUp)
userRouter.post("/signup/gmail",US.signUpWithGmail)
userRouter.post("/login",US.logIn)

userRouter.get("/profile", authentication,authorization([RoleEnum.Admin]),US.getProfile);

export default userRouter;