import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./dB_Connection/connection.js";
import userRoutes from "./Routes/userRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

// middlewares --->
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
};
app.use(cors(corsOptions));

//routes --->
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

//db conenction --->
connection();

// Server listening -->
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

// socket.io connection --->
const io = new Server(server, {
  cors: {
    corsOptions,
  },
  pingTimeout: 60000,
});
io.on("connection", (socket) => {
  // user joining the application -->
  socket.on("setup", (userId) => {
    socket.join(userId);
    console.log(userId + " connected ");
    socket.emit("connected");
  });
  // // user joining particular chat -->
  // socket.on("join chat", (roomId) => {
  //   socket.join(roomId);
  //   console.log("user joined " + roomId + " room");
  // });

  // user sending a message -->
  socket.on("send new message", ({ roomId, message }) => {
    socket.broadcast.emit("display_message", {
      roomId: roomId,
      message: message,
    });
  });
});
