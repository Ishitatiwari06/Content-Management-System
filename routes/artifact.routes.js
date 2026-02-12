import express from 'express';
import {
  createArtifact,
  getArtifacts
} from '../controllers/artifact.controller.js';
import { apiLimiter } from '../middlewares/rateLimiter.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import authorizeRoles from '../middlewares/authorizeRoles.middleware.js';
import { upload } from '../middlewares/uploads.middleware.js';

const router = express.Router();
router.post("/", authMiddleware, upload.single("media"), createArtifact);
router.get("/",apiLimiter, authMiddleware,authorizeRoles("ADMIN"), getArtifacts);
export default router;