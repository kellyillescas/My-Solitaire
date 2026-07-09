function isMovableStack(columnIndex, cardIndex) {
  const column = tableau[columnIndex];

  for (let i = cardIndex; i < column.length - 1; i++) {
    const current = column[i];
    const next = column[i + 1];

    if (!current.faceUp || !next.faceUp) {
      return false;
    }

    if (current.color === next.color) {
      return false;
    }

    if (current.value !== next.value + 1) {
      return false;
    }
  }

  return true;
}

function canMoveToTableau(card, destinationColumn) {
  if (destinationColumn.length === 0) {
    return card.value === 13;
  }

  const topCard = destinationColumn[destinationColumn.length - 1];

  return (
    topCard.faceUp &&
    topCard.color !== card.color &&
    topCard.value === card.value + 1
  );
}