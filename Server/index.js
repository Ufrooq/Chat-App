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

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // adding user⚡ by 🆔 -->
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log(userId);
    onlineUsers.set(userId, socket.id);
  });

  // recieving message💬 from front-end
  socket.on("send-msg", (data) => {
    // const sendUserSocket = onlineUsers.get(data.to);
    console.log(data);
    // if (sendUserSocket) {
    //   // sending message💬 to front-end
    //   socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    // }
  });

  // removing user 👋-->
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
// io.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on("join room", (userID) => {
//     console.log(`🆔 ${userID} joined the room`);
//     socket.join(userID);
//   });

//   socket.on("message", ({ text, roomId }) => {
//     console.log("💬 ", text, "sended to 🆔 ", roomId);
//     io.to(roomId).emit("messageResponse", text);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });
