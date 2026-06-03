import express from "express";

import {
  getUsers
} from "../controllers/userController";

const router =
  express.Router();

// GET USERS

router.get(
  "/",
  getUsers
);

export default router;