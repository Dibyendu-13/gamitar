import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Grid.css";

const socket = io("http://localhost:4000");

const Grid = () => {
  const [grid, setGrid] = useState(
    Array(10)
      .fill(null)
      .map(() => Array(10).fill(""))
  );
  const [playerCount, setPlayerCount] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [history, setHistory] = useState([]);
  const [showingHistory, setShowingHistory] = useState(false);

  useEffect(() => {
    console.log("Setting up socket listeners");

    socket.on("grid-update", (updatedGrid) => setGrid(updatedGrid));
    socket.on("player-count", (count) => setPlayerCount(count));
    socket.on("grid-history", (updateHistory) => setHistory(updateHistory));
    socket.on("grouped-updates", (groupedBatch) => {
      console.log("Grouped Updates:", groupedBatch);
    });

    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("grid-update");
      socket.off("player-count");
      socket.off("grid-history");
      socket.off("grouped-updates");
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => console.log("Connected to server"));
    socket.on("disconnect", () => console.warn("Disconnected from server"));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const handleBlockClick = (row, col) => {
    if (!canUpdate || grid[row][col]) return;

    const unicodeChar = prompt("Enter a Unicode character:");
    if (!unicodeChar) return;

    // Optimistically update grid locally
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? unicodeChar : cell
        )
      );
      return newGrid;
    });

    // Emit update to the server
    socket.emit("update-grid", { row, col, char: unicodeChar });

    setCanUpdate(false);
    setTimeout(() => setCanUpdate(true), 60000); // Optional cooldown
  };

  const toggleHistory = () => {
    setShowingHistory(!showingHistory);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="container">
      <h1 className="title">Multiplayer Grid</h1>
      <h3 className="player-count">Players Online: {playerCount}</h3>
      <button className="toggle-button" onClick={toggleHistory}>
        {showingHistory ? "Hide History" : "Show History"}
      </button>
      {showingHistory && (
        <div className="history">
          <h4>Update History:</h4>
          <ul>
            {history.map((update, index) => (
              <li key={index} className="history-item">
                <span>
                  <strong>Row:</strong> {update.row}, <strong>Col:</strong> {update.col}
                </span>
                <span>
                  <strong>Char:</strong> {update.char}
                </span>
                <span>
                  <strong>Time:</strong> {formatTimestamp(update.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((block, colIndex) => (
              <div
                key={colIndex}
                className={`grid-block ${block ? "filled" : ""}`}
                onClick={() => handleBlockClick(rowIndex, colIndex)}
              >
                {block}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
