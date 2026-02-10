import express from 'express';
import {
  getLikeCount,
  toggleLike
} from '../controllers/likes.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post("/:id/like",authMiddleware, toggleLike);
router.get("/:id/likes",getLikeCount);

export default router;