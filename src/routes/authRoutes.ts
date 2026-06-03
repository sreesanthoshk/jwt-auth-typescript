import express from "express";

import {
  register,
  login
} from "../controllers/authController";

const router =
  express.Router();

// REGISTER ROUTE

router.post(
  "/register",
  register
);

// LOGIN ROUTE

router.post(
  "/login",
  login
);

export default router;