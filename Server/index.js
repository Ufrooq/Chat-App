import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { connection } from "./dB_Connection/connection.js";
import userRoutes from "./Routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

//routes
app.use("/users", userRoutes);

//db conenction
connection();

// Server listening
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
