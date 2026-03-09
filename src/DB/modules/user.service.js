import userModel from "../models(collection)/user.model.js";
import * as db_service from "../../DB/db.service.js";
import { providerEnum } from "../../common/Enum/user.enum.js";
import { responseSuccess } from "../../common/utils/response.success.js";
import {
  decrypt,
  encrypt,
} from "../../common/utils/security/Encrypt.security.js";
import { hashSync, compareSync, hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";

import Jwt from "jsonwebtoken";
import {
  GenerateToken,
  VerifyToken,
} from "../../common/utils/token.service.js";
import { Hash } from "../../common/utils/security/hash.security.js";
import { SALT_ROUNDS, SECRETE_KEY } from "../../../config/config.service.js";

export const signUp = async (req, res, next) => {
  const { userName, email, password, gender, phone } = req.body;

  // check email exist
  const existUser = await db_service.findOne({
    model: userModel,
    filter: { email },
  });

  if (existUser) {
    throw new Error("email already exist", { cause: 409 });
  }
  if (!password) {
    throw new Error("Password is required", { cause: 400 });
  }
  // create user
  const user = await db_service.create({
    model: userModel,
    data: {
      userName,
      email,
      password: Hash({plain_text:password,SALT_ROUNDS}),
      gender,
      phone: encrypt(phone),
    },
  });

  responseSuccess({
    res,
    status: 201,
    message: "Success SignUp",
    data: user,
  });
};
export const signUpWithGmail = async (req, res, next) => {
  const { idToken } = req.body;
  const client = new OAuth2Client();

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience:
      "906908698604-spulv6urv60qdg08if275djs0ghnafhv.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  const { email, email_verified, name, picture } = payload; //بنعمل destructing لل payload
  let user = await db_service.findOne({
    model: userModel,
    filter: { email },
  });
  //signUp
  if (!user) {
    user = await db_service.create({
      model: userModel,
      data: {
        email: email,
        confirmed: email_verified,
        userName: name,
        profilePicture: picture,
        provider: providerEnum.google, // عشان انا حطاله قيمة default =system
      },
    });
  }
  //ممكن اليوزر يكون موجود فعلا بس عامل ساين اب عن طريق السيستم
  if (user.provider == providerEnum.system) {
    throw new Error(
      "you can not login from google cause you signup from using system",
      { cause: 400 },
    );
  }
  //login
  const access_token = GenerateToken({
    payload: { id: user._id, email: user.email },
    secret_key: "1@1",
    options: {
      expiresIn: 60 * 60, //يعني هيبوظ امتي
    },
  });
  responseSuccess({ res, data: { access_token } });
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
  const match = compare({palin_text:password,cipher_text:user.password});
  if (!match) {
    throw new Error("Wrong password", { cause: 400 });
  }
  const access_token = GenerateToken({
    payload: { id: user._id, email: user.email },
    secret_key:SECRETE_KEY,
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
