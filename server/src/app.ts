import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  // Only log if logger is available (it might not be in tests)
  if (global.logger) {
    logger.info(`${req.method} ${req.path}`, {
      method: req.method,
      url: req.url,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
    });
  }
  next();
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  const healthData = {
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  };

  if (global.logger) {
    logger.info("Health check accessed", { endpoint: "/api/health" });
  }

  res.status(200).json(healthData);
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  const errorData = {
    error: "Route not found",
    path: req.originalUrl,
  };

  if (global.logger) {
    logger.warn("404 - Route not found", { path: req.originalUrl, method: req.method });
  }

  res.status(404).json(errorData);
});

export default app;
