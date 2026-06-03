import express from "express";

import {

  createProject,

  getProjects,

  updateProject,

  deleteProject,

  updateStatus

} from "../controllers/projectController";

const router =
  express.Router();

// GET PROJECTS

router.get(
  "/",
  getProjects
);

// CREATE PROJECT

router.post(
  "/",
  createProject
);

// UPDATE PROJECT

router.put(
  "/:id",
  updateProject
);

// UPDATE STATUS

router.put(
  "/status/:id",
  updateStatus
);

// DELETE PROJECT

router.delete(
  "/:id",
  deleteProject
);

export default router;