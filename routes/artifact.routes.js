import express from 'express';
import {
  createArtifact,
  getArtifacts
} from '../controllers/artifact.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import authorizeRoles from '../middlewares/authorizeRoles.middleware.js';

const router = express.Router();
router.post("/", authMiddleware, createArtifact);
router.get("/", authMiddleware,authorizeRoles("ADMIN"), getArtifacts);
export default router;