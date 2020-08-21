import cardBack from "../image/cardBack.svg";

class CardAnimation {

  constructor (rootContainer, className) {

    this.rootContainer = rootContainer;
    this.className = className;

  }

  init () {

    this.container = document.createElement('div');
    this.container.id = 'card-container';
    this.rootContainer.appendChild(this.container);

    for (let i = 0; i < 10; i++) {

      const image = document.createElement('img');
      image.src = cardBack;
      image.classList.add(this.className);
      this.container.appendChild(image);

    }

  }

  destroy(){

    this.rootContainer.removeChild(this.container);
    this.container = null;

  }

}

export { CardAnimation };

