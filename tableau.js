function autoMoveTableauCard(columnIndex, cardIndex) {
  const column = tableau[columnIndex];
  const card = column[cardIndex];

  if (!card || !card.faceUp) {
    return;
  }

  if (!isMovableStack(columnIndex, cardIndex)) {
    return;
  }

  // Only try foundation if this is the top card
  if (cardIndex === column.length - 1 && canMoveToFoundation(card)) {
    saveState();
    moveTableauCardToFoundation(columnIndex);
    return;
  }

  // Otherwise, look for a tableau column
  for (let i = 0; i < tableau.length; i++) {
    if (i === columnIndex) {
      continue;
    }

    if (canMoveToTableau(card, tableau[i])) {
      saveState();

      const movingStack = column.splice(cardIndex);
      tableau[i].push(...movingStack);

      const newTop = column[column.length - 1];

      if (newTop && !newTop.faceUp) {
        newTop.faceUp = true;
      }

      renderGame();
      return;
    }
  }
}