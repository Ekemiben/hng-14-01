import express from "express";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

// Middleware
app.use(express.json());

// CORS (REQUIRED)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.use("/api/profiles", profileRoutes);

export default app;