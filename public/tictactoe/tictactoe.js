const socket = io();

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
let isMyTurn = false; // turn check

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", () => {
  socket.emit("reset");
});

function handleClick(event) {
  if (gameEnded) return; // FIXME: 클라이언트의 차례가 아니거나 게임이 끝났을 때 클릭 이벤트 무시

  const cell = event.target;
  const cellIndex = cell.getAttribute("data-cell-index");

  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    socket.emit("move", { index: cellIndex, player: currentPlayer });

    if (checkWin(currentPlayer)) {
      message.textContent = `Player ${currentPlayer} wins!`;
      gameEnded = true;
      updateScore(currentPlayer);
      socket.emit("gameEnd");
      resetButton.style.display = "block"; // 게임 종료 시 reset 버튼 표시
      resetButton.disabled = false; // 게임이 종료되면 reset 버튼 활성화
      board.classList.add("blur"); // 보드판에 흐릿한 효과 추가
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      isMyTurn = false; // 상대방 차례로 전환
      socket.emit("turnChange", { nextPlayer: currentPlayer });
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

function updateScore(player) {
  score[player]++;
  scoreX.textContent = `X: ${score.X}`;
  scoreO.textContent = `O: ${score.O}`;
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

socket.on("move", (data) => {
  const { index, player } = data;
  cells[index].textContent = player;

  if (checkWin(player)) {
    message.textContent = `Player ${player} wins!`;
    gameEnded = true;
    updateScore(player);
    socket.emit("gameEnd"); // 게임 종료 시 이벤트 전송
    resetButton.style.display = "block"; // 게임 종료 시 reset 버튼 표시
    resetButton.disabled = false; // 게임이 종료되면 reset 버튼 활성화
    board.classList.add("blur"); // 보드판에 흐릿한 효과 추가
  } else {
    currentPlayer = player === "X" ? "O" : "X";
    isMyTurn = currentPlayer !== player;
  }
});

socket.on("reset", () => {
  resetGame();
});

socket.on("turnChange", (data) => {
  const { nextPlayer } = data;
  isMyTurn = currentPlayer === nextPlayer; // 다음 플레이어가 내가 맞는지 확인
  message.textContent = `Player ${nextPlayer}'s turn`;
});

socket.on("gameEnd", () => {
  // FIXME: 제대로 동작 x
  resetButton.style.display = "block"; // 게임 종료 시 reset 버튼 표시
  resetButton.disabled = false; // 게임이 종료되면 reset 버튼 활성화
  board.classList.add("blur"); // 보드판에 흐릿한 효과 추가
});

socket.on("win", (data) => {
  if (data.winner === mySymbol) {
    message.textContent = `You win!`;
  } else {
    message.textContent = `Player ${data.winner} wins!`;
  }
  gameEnded = true;
  updateScore(data.winner);
  resetButton.style.display = "block";
  boardContainer.classList.add("blur");
  resetButton.disabled = false;
  currentPlayer = data.winner === "X" ? "O" : "X"; // 진 클라이언트도 다음 턴을 받도록 변경
});
