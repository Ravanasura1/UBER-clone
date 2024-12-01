import express from "express"
import { login, logout, signUp } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/login", login)
router.post("/logout",protectRoute, logout)
router.post("/signup", signUp)

export default router