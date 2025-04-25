import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { checkBody } from "../middleware/checkBody.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  getAllBooks,
  postBook,
  getSingleBook,
} from "../contorllers/book.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllBooks);

router.get("/:id", protectRoute, getSingleBook);

router.post("/", protectRoute, isAdmin, checkBody, postBook);

export default router;
