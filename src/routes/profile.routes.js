import express from "express";
import {
  createProfile,
  getSingleProfile,
  getAllProfiles,
  deleteProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/", createProfile);
router.get("/", getAllProfiles);
router.get("/:id", getSingleProfile);
router.delete("/:id", deleteProfile);

export default router;