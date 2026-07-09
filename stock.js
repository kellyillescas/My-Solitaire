function autoMoveWasteCard() {
  const card = waste[waste.length - 1];

  if (!card) {
    return;
  }

  // Try foundation first
  if (canMoveToFoundation(card)) {
    saveState();
    moveWasteCardToFoundation();
    return;
  }

  // Then try tableau
  for (let i = 0; i < tableau.length; i++) {
    if (canMoveToTableau(card, tableau[i])) {
      saveState();

      tableau[i].push(waste.pop());
      renderGame();
      return;
    }
  }
}

function drawFromStock() {
  saveState();

  if (stock.length > 0) {
    for (let i = 0; i < drawCount; i++) {
      if (stock.length === 0) {
        break;
      }

      const card = stock.pop();
      card.faceUp = true;
      waste.push(card);
    }
  } else {
    stock = waste.reverse();
    waste = [];

    stock.forEach(card => {
      card.faceUp = false;
    });
  }

  renderGame();
}