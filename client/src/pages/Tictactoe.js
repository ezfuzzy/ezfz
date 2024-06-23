import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import "../components/Tictactoe.css";
// console.log(process.env.API_URL);

const socket = io("http://localhost:8080/tictactoe");

const TicTacToe = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameEnded, setGameEnded] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleMove = useCallback(
    ({ index, player }) => {
      setCells((prev) => {
        const newCells = [...prev];
        newCells[index] = player;
        return newCells;
      });
      const nextPlayer = player === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setIsMyTurn(currentPlayer === nextPlayer);
    },
    [currentPlayer]
  );

  const handleWin = useCallback(({ winner }) => {
    setMessage(`Player ${winner} wins!`);
    setGameEnded(true);
    updateScore(winner);
  }, []);

  const handleDraw = useCallback(() => {
    setMessage("Draw!");
    setGameEnded(true);
  }, []);

  const handleGameEnd = useCallback(() => {
    gameEnd();
  }, []);

  const handleReset = useCallback(() => {
    resetGame();
  }, []);

  const handleTurnChange = useCallback(
    ({ nextPlayer }) => {
      setIsMyTurn(currentPlayer === nextPlayer);
      setMessage(`Player ${nextPlayer}'s turn`);
    },
    [currentPlayer]
  );

  useEffect(() => {
    socket.on("move", handleMove);
    socket.on("win", handleWin);
    socket.on("draw", handleDraw);
    socket.on("gameEnd", handleGameEnd);
    socket.on("reset", handleReset);
    socket.on("turnChange", handleTurnChange);

    return () => {
      socket.off("move", handleMove);
      socket.off("win", handleWin);
      socket.off("draw", handleDraw);
      socket.off("gameEnd", handleGameEnd);
      socket.off("reset", handleReset);
      socket.off("turnChange", handleTurnChange);
    };
  }, [handleMove, handleWin, handleDraw, handleGameEnd, handleReset, handleTurnChange]);

  const handleClick = (index) => {
    if (!isMyTurn || gameEnded || cells[index]) return;

    const newCells = [...cells];
    newCells[index] = currentPlayer;
    setCells(newCells);
    socket.emit("move", { index, player: currentPlayer });

    if (checkWin(currentPlayer)) {
      setMessage(`Player ${currentPlayer} wins!`);
      setGameEnded(true);
      socket.emit("win", { winner: currentPlayer });
      socket.emit("gameEnd");
    } else if (checkDraw()) {
      setMessage("Draw!");
      setGameEnded(true);
      socket.emit("draw");
      socket.emit("gameEnd");
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setIsMyTurn(false);
      socket.emit("turnChange", { nextPlayer });
      setMessage(`Player ${nextPlayer}'s turn`);
    }
  };

  const checkWin = (player) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return lines.some(([a, b, c]) => {
      return cells[a] === player && cells[b] === player && cells[c] === player;
    });
  };

  const checkDraw = () => {
    return cells.every((cell) => cell);
  };

  const gameEnd = () => {
    setMessage("Game Over");
  };

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setMessage("");
    setGameEnded(false);
    setCurrentPlayer("X");
    setIsMyTurn(true);
  };

  const updateScore = (player) => {
    setScore((prev) => ({ ...prev, [player]: prev[player] + 1 }));
  };

  return (
    <div className="tictactoe-container flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 id="title" className="text-4xl font-bold mb-6">
        Tic Tac Toe
      </h1>
      <div className="board-container border-green-800" id="board-container">
        <table className="board border-3 border-collapse">
          <tbody>
            {Array(3)
              .fill(null)
              .map((_, row) => (
                <tr key={row} className="border-3 border-green-800">
                  {Array(3)
                    .fill(null)
                    .map((_, col) => {
                      const index = row * 3 + col;
                      return (
                        <td
                          key={col}
                          data-cell-index={index}
                          onClick={() => handleClick(index)}
                          className="w-24 h-24 border-3 border-green-800 cursor-pointer text-center text-3xl"
                        >
                          {cells[index]}
                        </td>
                      );
                    })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div id="message" className="mt-4 text-2xl font-semibold">
        {message}
      </div>
      <button
        id="reset"
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Reset
      </button>
      <div className="scores mt-6 flex space-x-8">
        <div id="scoreX" className="text-xl font-semibold">
          X: {score.X}
        </div>
        <div id="scoreO" className="text-xl font-semibold">
          O: {score.O}
        </div>
      </div>
      {gameEnded && <div className="overlay fixed inset-0 bg-black bg-opacity-50" onClick={resetGame}></div>}
    </div>
  );
};

export default TicTacToe;
