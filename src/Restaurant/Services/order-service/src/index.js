import connectDB from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

//  create HTTP server
const server = http.createServer(app);

//  attach socket.io
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

//  optional: listen connection
io.on("connection", (socket) => {
  console.log(" New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log(" Client disconnected:", socket.id);
  });
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(` Server running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
  });