import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { checkBody } from "../middleware/checkBody.js";
import {
  getUserProfile,
  getMe,
  updateProfile,
} from "../contorllers/user.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, getMe);
router.put("/profile", protectRoute, checkBody, updateProfile);
router.get("/:id", protectRoute, getUserProfile);

export default router;
