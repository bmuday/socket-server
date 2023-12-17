import { v4 as uuid } from "uuid";
import { Server } from "socket.io";
import { roomHandler } from "./room/index.js";

export const createSocket = (server) => {
  let messages = [];

  // const origin = process.env.PROD
  //   ? process.env.CLIENT_DOMAIN
  //   : "http://localhost:5173";
  const origin = "*";
  console.log("origin", origin);
  const io = new Server(server, {
    cors: {
      origin,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
