import cardBack from "../image/cardBack.svg";

class CardAnimation {

  constructor (container, className) {
    this.container = container;
    this.className = className;

  }

  init () {

    this.cardContainer = document.createElement('div');
    this.cardContainer.id = 'card-container';
    this.container.appendChild(this.cardContainer);

    for (let i = 0; i < 10; i++) {

      this.image = document.createElement('img');
      this.image.src = cardBack;
      this.image.classList.add(this.className);
      this.cardContainer.appendChild(this.image);
    }
  }

}

export { CardAnimation };

