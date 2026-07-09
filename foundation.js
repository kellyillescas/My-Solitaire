function getFoundationIndex(suit) {
  return suits.indexOf(suit);
}

function canMoveToFoundation(card) {
  const foundation = foundations[getFoundationIndex(card.suit)];

  if (foundation.length === 0) {
    return card.value === 1;
  }

  const topCard = foundation[foundation.length - 1];

  return card.suit === topCard.suit && card.value === topCard.value + 1;
}

function moveTableauCardToFoundation(columnIndex) {
  const column = tableau[columnIndex];
  const card = column[column.length - 1];

  if (!card || !card.faceUp) {
    return;
  }

  if (canMoveToFoundation(card)) {
    saveState();

    column.pop();
    foundations[getFoundationIndex(card.suit)].push(card);

    const newTopCard = column[column.length - 1];
    if (newTopCard && !newTopCard.faceUp) {
      newTopCard.faceUp = true;
    }

    renderGame();
  }
}

function moveWasteCardToFoundation() {
  const card = waste[waste.length - 1];

  if (!card) {
    return;
  }

  if (canMoveToFoundation(card)) {
    saveState();
    waste.pop();
    foundations[getFoundationIndex(card.suit)].push(card);
    renderGame();
  }
}

function checkWin() {
  const hasWon = foundations.every(foundation => foundation.length === 13);

  if (hasWon) {
    setTimeout(() => {
      alert("You win!");
    }, 100);
  }
}

function autoMoveFoundationCard(foundationIndex) {
  const foundation = foundations[foundationIndex];
  const card = foundation[foundation.length - 1];

  if (!card) {
    return;
  }

  for (let i = 0; i < tableau.length; i++) {
    if (canMoveToTableau(card, tableau[i])) {
      saveState();

      tableau[i].push(foundation.pop());
      renderGame();
      return;
    }
  }
}
