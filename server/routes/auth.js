import { signin, register } from "../controllers/auth.js";
import express from "express";
const authRouter = express.Router();
authRouter.post('/auth/signin', signin).post('/auth/signup', register)
export default authRouter;