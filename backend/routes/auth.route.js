import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
} from "../contorllers/auth.controller.js";
import { checkBody } from "../middleware/checkBody.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.post("/signup", checkBody, signup);
router.post("/login", checkBody, login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
export default router;
