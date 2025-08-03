import express, { Application, Request, Response, NextFunction } from "express";

// import routes
import _rootRoutes from "../api/_root/_root.routes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  // Only log if logger is available (it might not be in tests)
  global.logger.info(`${req.method} ${req.path}`, {
    method: req.method,
    url: req.url,
    userAgent: req.get("User-Agent"),
    ip: req.ip,
  });

  next();
});

// Register routes
app.use("/api", _rootRoutes);

// 404 handler
app.use("*", (req: Request, res: Response) => {
  const errorData = {
    error: "Route not found",
    path: req.originalUrl,
  };

  global.logger.warn("404 - Route not found", {
    path: req.originalUrl,
    method: req.method,
  });

  res.status(404).json(errorData);
});

export default app;
