import express from "express";
import connectDB from "./db";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({
  path: "./.env",
});
console.log("Clodinary api secretsss", process.env.CLOUDINARY_API_SECRET);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!! ", err);
  });
