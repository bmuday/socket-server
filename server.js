require("dotenv").config();
const express = require("express");
const http = require("http");
const { createSocket } = require("./socket");
const PORT = process.env.PORT || 5000;

async function main() {
  const expressApp = express();

  const httpServer = http.createServer(expressApp);

  createSocket(httpServer);

  expressApp.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
  });

  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
}

main();
