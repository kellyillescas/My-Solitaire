function createCardElement(card, options = {}) {
  const {
    showCenterSuit = false,
    faceDown = false,
    extraClasses = []
  } = options;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", ...extraClasses);

  if (flippedCards.includes(card)) {
    cardDiv.classList.add("flip");
  }

  if (faceDown || !card.faceUp) {
    cardDiv.classList.add("face-down", "card-back");
    cardDiv.innerHTML = `
      <div class="card-back-pattern"></div>
    `;    
    return cardDiv;
  }

  if (card.color === "red") {
    cardDiv.classList.add("red");
  }

  cardDiv.innerHTML = `
    <div class="card-corner ${card.color}">
      <div>${card.rank}</div>
      <div>${card.suit}</div>
    </div>

    <div class="card-corner-bottom ${card.color}">
      <div>${card.rank}</div>
      <div>${card.suit}</div>
    </div>
  `;

  if (showCenterSuit) {
    cardDiv.innerHTML += `
      <div class="card-center ${card.color}">
        ${card.suit}
      </div>
    `;
  }

  return cardDiv;
}