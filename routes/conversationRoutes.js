import express from "express";

import {
  createConversation,
  getConversations,
  getConversationById,
  updateConversationStatus
} from "../controllers/conversationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route - client can create a conversation
router.post("/", createConversation);

// Admin protected routes
router.get("/", authMiddleware, getConversations);

router.get("/:id", authMiddleware, getConversationById);

router.put("/:id/status", authMiddleware, updateConversationStatus);

export default router;