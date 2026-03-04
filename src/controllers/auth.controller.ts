import type { RequestHandler } from "express";

export const register: RequestHandler = (req, res) => {

  res.send(`Register`);
};
export const login: RequestHandler = (req, res) => {
  res.json({ message: "Login" });
};
export const getMe: RequestHandler = (req, res) => {
  res.json({ message: "getMe" });
};
