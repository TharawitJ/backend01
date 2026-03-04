import express from "express";
import {register,login,getMe} from "../controllers/auth.controller.js"

const router = express.Router();
console.log("auth route works")

router.post('/register',register)
router.post('/login',login)
router.get('/me',getMe)

export default router;