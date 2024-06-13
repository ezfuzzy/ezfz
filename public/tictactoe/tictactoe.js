const socket = io("/tictactoe");

const boardContainer = document.getElementById("board-container");
const board = document.getElementById("board");
const cells = board.querySelectorAll("td");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameEnded = false;
let score = { X: 0, O: 0 };
let isMyTurn = true; // turn check

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", () => {
  socket.emit("reset");
});

function handleClick(event) {
  if (!isMyTurn || gameEnded) return;

  const cell = event.target;
  const cellIndex = cell.getAttribute("data-cell-index");

  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    socket.emit("move", { index: cellIndex, player: currentPlayer });

    if (checkWin(currentPlayer)) {
      message.textContent = `Player ${currentPlayer} wins!`;
      gameEnded = true;

      socket.emit("win", { winner: currentPlayer });
      socket.emit("gameEnd");
    } else if (checkDraw()) {
      message.textContent = "Draw!";
      gameEnded = true;
      socket.emit("draw");
      socket.emit("gameEnd");
    } else {
      // 상대방 차례로 전환
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      isMyTurn = false;
      socket.emit("turnChange", { nextPlayer: currentPlayer });
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin(player) {
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

  for (let line of lines) {
    const [a, b, c] = line;
    if (
      cells[a].textContent === player &&
      cells[b].textContent === player &&
      cells[c].textContent === player
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  // some || every
  return !Array.from(cells).some((cell) => cell.textContent === "");
}

function gameEnd() {
  resetButton.style.display = "block"; // 게임 종료 시 reset 버튼 표시
  resetButton.disabled = false; // 게임이 종료되면 reset 버튼 활성화
  board.classList.add("blur"); // 보드판에 흐릿한 효과 추가
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  message.textContent = "";
  gameEnded = false;
  currentPlayer = "X";
  isMyTurn = currentPlayer === "X";

  resetButton.style.display = "none";
  resetButton.disabled = true;
  board.classList.remove("blur");
}

function updateScore(player) {
  score[player]++;
  scoreX.textContent = `X: ${score.X}`;
  scoreO.textContent = `O: ${score.O}`;
}

socket.on("move", (data) => {
  const { index, player } = data;
  cells[index].textContent = player;
  // 상대방 차례로 전환
  currentPlayer = player === "X" ? "O" : "X";
  isMyTurn = currentPlayer !== player;
});

socket.on("win", (data) => {
  if (data.winner === currentPlayer) {
    message.textContent = `You win!`;
  } else {
    message.textContent = `You Lose`;
  }
  gameEnded = true;
  updateScore(data.winner);
});

socket.on("draw", () => {
  message.textContent = "Draw!";
  gameEnded = true;
});

socket.on("gameEnd", () => {
  gameEnd();
});

socket.on("reset", () => {
  resetGame();
});

socket.on("turnChange", (data) => {
  const { nextPlayer } = data;
  isMyTurn = currentPlayer === nextPlayer; // 다음 플레이어가 내가 맞는지 확인
  message.textContent = `Player ${nextPlayer}'s turn`;
});
