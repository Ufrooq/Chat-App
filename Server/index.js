import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { connection } from "./dB_Connection/connection.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/users", userRoutes);

//db conenction
connection();

// Server listening
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
