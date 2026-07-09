const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = [];
let tableau = [[], [], [], [], [], [], []];
let stock = [];
let waste = [];
let foundations = [[], [], [], []];

let selectedCard = null;
let selectedColumn = null;

let drawCount = 3;

let moveHistory = [];

function startGame() {
  deck = [];
  tableau = [[], [], [], [], [], [], []];
  stock = [];
  waste = [];
  foundations = [[], [], [], []];
  moveHistory = [];

  createDeck();
  shuffleDeck();
  dealCards();

  renderGame();
}

function saveState() {
  const state = {
    tableau: JSON.parse(JSON.stringify(tableau)),
    stock: JSON.parse(JSON.stringify(stock)),
    waste: JSON.parse(JSON.stringify(waste)),
    foundations: JSON.parse(JSON.stringify(foundations))
  };

  moveHistory.push(state);
}

function undoMove() {
  if (moveHistory.length === 0) {
    return;
  }

  const previousState = moveHistory.pop();

  tableau = previousState.tableau;
  stock = previousState.stock;
  waste = previousState.waste;
  foundations = previousState.foundations;

  renderGame();
}

const stockPile = document.getElementById("stock");
const wastePile = document.getElementById("waste");
const undoButton = document.getElementById("undo-button");
const newGameButton = document.getElementById("new-game-button");

console.log("stockPile:", stockPile);
console.log("wastePile:", wastePile);
console.log("undoButton:", undoButton);
console.log("newGameButton:", newGameButton);

if (stockPile) {
  stockPile.addEventListener("click", drawFromStock);
}

if (wastePile) {
  wastePile.addEventListener("click", autoMoveWasteCard);
}

if (undoButton) {
  undoButton.addEventListener("click", undoMove);
}

if (newGameButton) {
  newGameButton.addEventListener("click", startGame);
}

startGame();