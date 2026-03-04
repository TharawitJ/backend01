import type { RequestHandler } from "express";
import CreateHttpError from "http-errors";
import { prisma } from "../libs/prisma.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const register: RequestHandler = async (req, res, next) => {
  const { username, nickname, password } = req.body;
  if (!username.trim() || !password.trim()) {
    // tell TS HttpError type Error and add status type number in class Error
    type HttpError = Error & { status: number };
    //  create new from Error class but create as HttpError(HttpError add status)
    // const invalidErr: HttpError = new Error(
    //   "username and password are required",
    // ) as HttpError;
    // invalidErr.status = 400;
    // throw invalidErr;
    return next(CreateHttpError[400]("username and password are required"));
  }
  const userExist = await prisma.user.findUnique({
    where: { username: username },
  });
  if (userExist) {
    return next(
      CreateHttpError[409](`${username} this username already register`),
    );
  }
  // hash password
  const hashPassword = await bcrypt.hash(password, 5);
  //   insert data to DB
  const result = await prisma.user.create({
    data: { username: username, password: hashPassword, nickname: nickname },
  });
  // delete password from result
  // destructuring password from result and others are newUser(username,nickname,...)
  const { password: pw, ...newUser } = result;
  console.log(newUser);
  res.send(`${username} Register Successful`);
};
export const login: RequestHandler = async (req, res, next) => {
  const { username, nickname, password } = req.body;
  if (!username.trim() || !password.trim()) {
    return next(CreateHttpError[400]("username and password are required"));
  }
  const userExist = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!userExist) {
    return next(CreateHttpError[409](`Username : ${username} not registered`));
  }
  //   bcrypt password check รับก่อนเช็คทีหลัง
  const pwCorrect = await bcrypt.compare(password,userExist.password);
  if (!pwCorrect) {
    return next(CreateHttpError[409](`Username password not correct`));
  }
// give accessToken to front
const payload = {id:userExist.id,username:userExist.username}
const token =jwt.sign(payload,process.env.JWT_SECRET!,{
    algorithm:"HS256",
    expiresIn:"7d"
})
    console.log(token)
  res.json({ message: "Login Successful" });
};
export const getMe: RequestHandler = (req, res) => {
  res.json({ message: "getMe" });
};
