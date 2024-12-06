const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let grid = Array(10)
  .fill(null)
  .map(() => Array(10).fill(""));
let playerCount = 0;
let history = [];
let batch = [];

io.on("connection", (socket) => {
  playerCount++;
  io.emit("player-count", playerCount);
  socket.emit("grid-update", grid);
  socket.emit("grid-history", history);

  socket.on("update-grid", ({ row, col, char }) => {
    if (grid[row][col]) return;

    grid[row][col] = char;
    const timestamp = new Date().toISOString();
    const update = { row, col, char, timestamp };

    history.push(update); // Add to history
    batch.push(update); // Add to batch for grouping

    io.emit("grid-update", grid);
    io.emit("grid-history", history);
  });

  setInterval(() => {
    if (batch.length > 0) {
      io.emit("grouped-updates", batch);
      batch = [];
    }
  }, 1000);

  socket.on("disconnect", () => {
    playerCount--;
    io.emit("player-count", playerCount);
  });
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

