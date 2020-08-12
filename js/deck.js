import { Card } from '/js/card.js';

class Deck {

  static families = ['heart', 'diamond', 'club', 'spade'];
  static ranks = ['7', '8', '9', '10', 'jack', 'queen', 'king', 'as'];

  constructor(rootContainer, onPickCard) {
    this.stack = [];
    this.onPickCard = onPickCard;
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'deck-container';
    this.rootContainer.appendChild(this.container);
    this.image = document.createElement('img');
    this.image.src = 'https://res.cloudinary.com/ninjafire/image/upload/v1597247162/Reussite/deck_kzblkb.svg';
    this.container.appendChild(this.image);
    this.init();
    this.shuffle();
    this.image.addEventListener('click', this.onPickCard);
    this.counter = document.createElement('p');
    this.container.appendChild(this.counter);
    this.counter.innerText = `${this.stack.length}`;
  }

  init() {

    Deck.families.forEach(family => {

      Deck.ranks.forEach(rank => {
        const card = new Card(rank, family);
        this.stack.push(card);
      });

    });

  }

  shuffle() {

    for (let i = this.stack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];

    }

  }

  pick() {

    const pickedCard = this.stack.pop();
    this.counter.innerText = `${this.stack.length}`;
    return pickedCard;

  }

  empty() {

    return this.stack.length === 0;
  }

  destroy() {
    this.stack = [];
    this.rootContainer.removeChild(this.container);
  }

  toJson() {

    return this.stack.map(card => card.toJson());

  }

}

export { Deck };
