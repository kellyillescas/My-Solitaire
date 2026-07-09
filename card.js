function createCardElement(card, options = {}) {
  const {
    showCenterSuit = false,
    faceDown = false,
    extraClasses = []
  } = options;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", ...extraClasses);

  if (faceDown || !card.faceUp) {
    cardDiv.classList.add("face-down");
    cardDiv.textContent = "🂠";
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