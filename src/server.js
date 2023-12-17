import { config } from "dotenv";
import express from "express";
import http from "http";
import { createSocket } from "./socket.js";

config();
const PORT = process.env.PORT || 5000;

const main = async () => {
  const app = express();
  const server = http.createServer(app);

  createSocket(server);

  app.get("/", (req, res) => {
    res.send("<h1>Server is running...</h1>");
  });

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
};

main();
