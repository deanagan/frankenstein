import express from "express";
import productRoutes from "./productRoutes";
// Add other routes to import

export function configureRoutes(app: express.Application): void {
  app.use("/api", productRoutes);

  // Add other routes to mount here
}
