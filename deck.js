function createDeck() {
  deck = [];

  for (let suit of suits) {
    for (let i = 0; i < ranks.length; i++) {
      deck.push({
        suit: suit,
        rank: ranks[i],
        value: i + 1,
        faceUp: false,
        color: suit === "♥" || suit === "♦" ? "red" : "black"
      });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
  }
}

function dealCards() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = deck.pop();

      if (row === col) {
        card.faceUp = true;
      }

      tableau[col].push(card);
    }
  }

  stock = deck;
}