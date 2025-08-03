import { Router } from "express";

const _rootRoutes = Router();

_rootRoutes.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

export default _rootRoutes;
