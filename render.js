function renderGame() {
  const tableauDiv = document.getElementById("tableau");
  tableauDiv.innerHTML = "";

  for (let col = 0; col < 7; col++) {
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("column");

    tableau[col].forEach((card, cardIndex) => {
      const cardDiv = createCardElement(card, {
        showCenterSuit: true
      });

      // Keep lower cards on top of higher cards
      cardDiv.style.zIndex = cardIndex + 1;

      if (card.faceUp) {
        cardDiv.addEventListener("click", () => {
          autoMoveTableauCard(col, cardIndex);
        });
      }

      columnDiv.appendChild(cardDiv);
    });

    tableauDiv.appendChild(columnDiv);
  }

  const stockDiv = document.getElementById("stock");

  stockDiv.innerHTML = "";

  if (stock.length > 0) {
    stockDiv.classList.add("card-back");
  } else {
    stockDiv.classList.remove("card-back");
    stockDiv.textContent = "Empty";
  }
  
  const wasteDiv = document.getElementById("waste");
  wasteDiv.innerHTML = "";

  if (waste.length === 0) {
    wasteDiv.textContent = "Waste";
  } else {
    const visibleWasteCards = waste.slice(-3);

    visibleWasteCards.forEach((card, index) => {
      const isTopWasteCard = index === visibleWasteCards.length - 1;

      const cardDiv = createCardElement(card, {
        showCenterSuit: isTopWasteCard,
        extraClasses: ["waste-card"]
      });

      if (isTopWasteCard) {
        cardDiv.classList.add("top-waste-card");
      } else {
        cardDiv.classList.add("behind-waste-card");
      }

      cardDiv.style.top = "0px";
      cardDiv.style.left = `${index * 34}px`;
      cardDiv.style.zIndex = index + 1;

      if (isTopWasteCard) {
        cardDiv.addEventListener("click", (event) => {
          event.stopPropagation();
          autoMoveWasteCard();
        });
      }

      wasteDiv.appendChild(cardDiv);
    });
  }

  for (let i = 0; i < 4; i++) {
    const foundationDiv = document.getElementById(`foundation-${i}`);
    const topCard = foundations[i][foundations[i].length - 1];

    if (topCard) {
      foundationDiv.innerHTML = "";

      const cardDiv = createCardElement(topCard, {
        showCenterSuit: true,
        extraClasses: ["foundation-card"]
      });

      cardDiv.addEventListener("click", () => {
        autoMoveFoundationCard(i);
      });

      foundationDiv.appendChild(cardDiv);
    } else {
      foundationDiv.textContent = suits[i];
      foundationDiv.classList.remove("red");
    }
  }

  checkWin();

  flippedCards = [];
}