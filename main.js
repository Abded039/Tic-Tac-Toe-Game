"use strict";

const board = document.querySelector(".board");
const nameX = document.querySelector(".nameX");
const nameO = document.querySelector(".nameO");
let intro = document.querySelector(".intro");
let fight = document.querySelector(".fight");
let cells = Array.from({ length: 9 });
let currentPlayer = "X";
let counterX = 0;
let counterO = 0;

const handleClick = (e) => {
  const targetedIndex = e.target.dataset.index;
  if (cells[targetedIndex]) return; // if it's full do nothing to avoid changing the value of cells
  updateCell(targetedIndex, currentPlayer);
  const winner = checkWinner();
  if (winner) {
    board.style.pointerEvents = "none";
    document.querySelector(".win").play();
    setTimeout(() => {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(`${winner}, You Win!`); // to say the winner
      synth.speak(utterThis);
      resetGame(currentPlayer);
    }, 1000);
  } else if (!cells.includes(undefined) && !winner) {
    board.style.pointerEvents = "none";
    setTimeout(() => {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance("It's A Draw!");
      synth.speak(utterThis);
      resetGame(currentPlayer);
    }, 1000);
  }
};

const resetGame = (player) => {
  cells = Array.from({ length: 9 }); // empty it to avoiding that the array is full- that makes problems with the condition line number 9 -and HTML is empty
  player = player === "X" ? "O" : "X";
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("playerX", "playerO");
  });
  board.style.pointerEvents = "all";
};

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") resetGame();
});

const updateCell = (index, player) => {
  cells[index] = player; // to check at the end depending on 'undefined' value
  const cell = board.querySelector(`[data-index="${index}"]`);
  cell.textContent = player;
  cell.classList.add(player === "X" ? "playerX" : "playerO");
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.querySelector(".onClick").play();
};

const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      if (cells[a] === "X") {
        counterX++;
        fight.innerHTML = `
    <p class="playerX">${nameX.value} [<span class="counterX">${counterX}</span>] </p> 
    <i class="fa-solid fa-face-angry"></i>
    <p class="playerO">${nameO.value} [<span class="counterO">${counterO}</span>]</p>
    `;
        return nameX.value;
      } else {
        counterO++;
        fight.innerHTML = `
    <p class="playerX">${nameX.value} [<span class="counterX">${counterX}</span>] </p> 
    <i class="fa-solid fa-face-angry"></i>
    <p class="playerO">${nameO.value} [<span class="counterO">${counterO}</span>]</p>
    `;
        return nameO.value;
      }
    }
  }
  return null;
};

cells.forEach((cell, index) => {
  cell = document.createElement("div");
  cell.addEventListener("mouseover", () => {
    document.querySelector(".onHover").volume = 0.5;
    document.querySelector(".onHover").play();
  });
  cell.classList.add("cell");
  cell.dataset.index = index;
  board.appendChild(cell);
  cell.addEventListener("click", handleClick);
});

checkWinner();

const startGame = () => {
  if (nameX.value === "" || nameO.value === "") {
    alert("Please Enter the Names of the Players");
  } else if (nameX.value === nameO.value) {
    alert("Please Enter Different Names");
  } else {
    board.style.pointerEvents = "all";
    fight.innerHTML = `
    <p class="playerX">${nameX.value} [<span class="counterX">${counterX}</span>] </p> 
    <i class="fa-solid fa-face-angry"></i>
    <p class="playerO">${nameO.value} [<span class="counterO">${counterO}</span>]</p>
    `;

    intro.style.display = "none";
    fight.style.display = "flex";

    let replayButton = document.createElement("button");
    replayButton.classList.add("replayButton");
    replayButton.textContent = "Replay";
    replayButton.addEventListener("click", () => {
      window.location.reload();
    });
    board.appendChild(replayButton);
  }
};
