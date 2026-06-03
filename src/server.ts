import express from "express";

import cors from "cors";

import authRoutes from "./routes/authRoutes";

import projectRoutes from "./routes/projectRoutes";

import userRoutes from "./routes/userRoutes";

const app = express();

// MIDDLEWARE

app.use(express.json());

app.use(cors());

// ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/users",
  userRoutes
);

// TEST ROUTE

app.get("/", (req, res) => {

  res.send(
    "Project Management API Running"
  );
});

// SERVER

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});