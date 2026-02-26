// import userModel from "../../DB/models(collection)/user.model.js";
// import { VerifyToken } from "../utils/token.service.js";
// import * as db_service from "./../../DB/db.service.js";
// export const authentication = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     //اتاكد الاول انه باعت التوكين
//     throw new Error("Token not exist");
//   }

import userModel from "../../DB/models(collection)/user.model.js";
import { VerifyToken } from "../utils/token.service.js";

//   const decoded = VerifyToken({ token: authorization, secret_key: "1@1" });
//   if (!decoded || !decoded?.id) {
//     throw new Error("Invalide token ");
//   }
//   const user = await db_service.findOne({
//     model: userModel,
//     filter: { _id: decoded.id },
//     options: {},
//   });

//   if (!user) {
//     throw new Error("User Not exist", { cause: 409 });
//   }

//   console.log(decoded);
//   req.user = user;

//   next(); //لازم اقوله next علشان يدخل ال middleware   (getProfile)اللي بعده
// };

export const authentication = async(req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("authorization not exist");
  }
  const token = authorization.split(" ")[1];
  const decoded = VerifyToken({ token: token, secret_key: "1@1" });
  
  if (!decoded || !decoded?.id) {
    throw new Error(" invalide token");
  }
  const user=await db_service.findOne({
    model:userModel,
    filter:{_id:decoded.id},
    options:{}
  })
  req.user=user
  next();
};
