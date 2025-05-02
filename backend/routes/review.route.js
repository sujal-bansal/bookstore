import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { checkBody } from "../middleware/checkBody.js";
import { getReview, postReview } from "../contorllers/review.controller.js";
import { refineReview } from "../contorllers/ai.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getReview);
router.post("/:id", protectRoute, checkBody, postReview);
router.post("/refine/:id", protectRoute, checkBody, refineReview);

export default router;
