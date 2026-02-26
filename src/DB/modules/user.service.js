import userModel from "../models(collection)/user.model.js";
import * as db_service from "../../DB/db.service.js";
import { providerEnum } from "../../common/Enum/user.enum.js";
import { responseSuccess } from "../../common/utils/response.success.js";
import {
  decrypt,
  encrypt,
} from "../../common/utils/security/Encrypt.security.js";
import { hashSync, compareSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import Jwt from "jsonwebtoken";
import {
  GenerateToken,
  VerifyToken,
} from "../../common/utils/token.service.js";
export const signUp = async (req, res, next) => {
  const { userName, email, password, age, gender, phone } = req.body;
  if (userName.split(" ").length < 2) {
    next(
      new Error("Make space beetween tha first and last name", { cause: 400 }),
    );
  }
  // if (password!== )

  if (
    await db_service.findOne({
      model: userModel,
      filter: { email, provider: providerEnum.system },
      select: "+password",
    })
  ) {
    throw new Error("Email exist", { cause: 404 });
  }
  const createUser = await db_service.create({
    model: userModel,
    data: {
      userName,
      email,
      password: hashSync(password, 12),
      age,
      gender,
      phone: encrypt(phone),
    },
  });

  //res.status(201).json({ message: "User created", createUser });
  responseSuccess({ res, status: 201, data: createUser });

  console.log("ERROR 👉", error.message);
  throw new Error("Can not create user", { cause: 401 });
};
export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await db_service.findOne({
    model: userModel,
    filter: { email, provider: providerEnum.system },
    options: {},
  });
  if (!user) {
    throw new Error("User Not exist", { cause: 409 });
  }
  const match = compareSync(password, user.password);
  if (!match) {
    throw new Error("Wrong password", { cause: 400 });
  }
  const access_token = GenerateToken({
    payload: { id: user._id, email: user.email },
    secret_key: "1@1",
    options: {
      expiresIn: 60 * 60, //يعني هيبوظ امتي
      noTimestamp: true, //لو عايزة اشيل ال iat(intiate at)
      issuer: "http://localhost:3000", //لو عايزة اقول مين الاوثر او مين اللي باعته
      //notBefore: 60 * 60, // مش هيشتغل قبل ساعة
      audience: "http://localhost:4000", // لو عايزة اقول مبعوت لمين
      // jwtid: "12#3", // لو عايزة اديله id علشان لو عايزة اعمل بيه حاجة
      jwtid: uuidv4(), // طريقة بتنشا id عشوائي عن طريق UUID(third part module)
    },
  });

  // res.status(201).json({ message: "Done", user });
  responseSuccess({ res, data: { access_token } });

  console.log("LOGIN ERROR 👉", error);
  throw new Error("Can not create user", { cause: 500 });
};
export const getProfile = async (req, res, next) => {
  
   responseSuccess({
    res,
    data: user,
     });
console.log(req.user);

  console.log("LOGIN ERROR 👉", error);
};
