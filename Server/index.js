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
});

// Modify the connection handler to store sockets for each user
// const userSockets = {};

// io.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on("user_connected", (userId) => {
//     userSockets[userId] = socket.id;
//   });

//   socket.on("message", (data) => {
//     console.log("💬", data);
//     const toUserId = data.toUserId; // Replace with the actual field that identifies the recipient user
//     const recipientSocket = userSockets[toUserId];
//     if (recipientSocket) {
//       io.to(recipientSocket).emit("messageResponse", data);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });

let rooms = {};

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("addUser", (currentUserId) => {
    rooms[currentUserId] = socket.id;
  });
  socket.on("message", (data) => {
    console.log("💬", data);
    io.to(rooms[data.currentReciever]).emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
