import express from "express";

import {
  createFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ
} from "../controllers/faqController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getFAQs);

// Admin protected routes
router.post("/", authMiddleware, createFAQ);
router.put("/:id", authMiddleware, updateFAQ);
router.delete("/:id", authMiddleware, deleteFAQ);

export default router;