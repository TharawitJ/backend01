import type { RequestHandler } from "express";

export const register: RequestHandler = (req, res) => {
    /* throw custom error
     const customErr = new Error()
     customErr.message = 'Custom Error'
     console.log(customErr) 
     throw(customErr) */
  res.send(`Register`);
};
export const login: RequestHandler = (req, res) => {
  res.json({ message: "Login" });
};
export const getMe: RequestHandler = (req, res) => {
  res.json({ message: "getMe" });
};
