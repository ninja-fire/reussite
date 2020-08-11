class Card {

  constructor(rank, family) {

    this.rank = rank;
    this.family = family;
    this.container = document.createElement('div');
    this.container.classList.add('card-container');

    this.container.innerHTML = `${this.rank} ${this.family}`;

  }

  isSameFamily(card) {

    return this.family === card.family;

  }

  isSameRank(card) {

    return this.rank === card.rank;

  }

  toJson() {

    return {
      rank: this.rank,
      family: this.family,
    };

  }

}

class Deck {

  static families = ['heart', 'diamond', 'club', 'spade'];
  static ranks = ['7', '8', '9', '10', 'jack', 'queen', 'king', 'as'];

  constructor(rootContainer) {
    this.stack = [];
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'deck-container';
    this.rootContainer.appendChild(this.container);
    this.button = document.createElement('button');
    this.container.appendChild(this.button);
    this.button.innerHTML = 'DECK';
    this.init();
    this.shuffle();

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

    return this.stack.pop();

  }

  empty() {

    return this.stack.length === 0;
  }

  toJson() {

    return this.stack.map(card => card.toJson());

  }

}

class Board {

  constructor(rootContainer) {

    this.cards = [];
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'board-container';
    this.rootContainer.appendChild(this.container);
  }

  isWinSize() {

    return this.cards.length === 2;
  }

  canMove(card) {

    const pickedIndex = this.cards.findIndex(boardCard => boardCard === card);

    if (pickedIndex > 0 && pickedIndex < this.cards.length - 1) {

      if (this.cards[pickedIndex - 1].isSameFamily(this.cards[pickedIndex + 1]) || this.cards[pickedIndex - 1].isSameRank(this.cards[pickedIndex + 1])) {

        return true;
      }
    }

    return false
  }

  addCard(card) {
    this.cards.push(card);
    this.container.appendChild(card.container);
  }

  suppCard(card){
    this.cards = this.cards.filter( (_, i) => this.cards[i + 1] !== card);
  }

  canMoveAtLeastOne() {
    return !!this.cards.find(card => this.canMove(card))
  }

  toJson() {

    return this.cards.map(card => card.toJson());

  }

}

class Game {

  constructor(rootContainer) {

    this.endOfGame = false;
    this.win = false;
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'game-container';
    this.rootContainer.appendChild(this.container);
    this.deck = new Deck(this.container);
    this.board = new Board(this.container);
    this.deck.button.addEventListener('click', (event) => this.pickCard() );

  }

  pickCard() {

    if (this.endOfGame === false) {

      const pickedCard = this.deck.pick();

      if (pickedCard) {

        this.board.addCard(pickedCard);
        console.log(this.toJson());

        if (this.deck.empty() && !this.board.canMoveAtLeastOne() ){
          this.endOfGame = true;
          console.log('Lose');
        }
        return true;

      }
    }
    return false;

  }

  moveCard(pickedCard) {

    if (this.endOfGame === false) {

      if (this.board.canMove(pickedCard)) {

        this.board.suppCard(pickedCard);

        if (this.board.isWinSize() && this.deck.empty() ) {

          this.endOfGame = true;
          this.win = true;
          console.log('Win');

        } else if (!this.board.isWinSize() && this.deck.empty() && !this.board.canMoveAtLeastOne() ) {

          this.endOfGame = true;
          console.log('Lose');

        }

        console.log(this.toJson());
        return true;
      }
    }
    return false;
  }

  toJson() {

    return {
      deck: this.deck.toJson(),
      endOfGame: this.endOfGame,
      win: this.win,
      board: this.board.toJson()
    };

  }

}

function init () {
  const rootContainer = document.getElementById('root-container');
  const game = new Game(rootContainer);
  // game.pickCard();
  // game.pickCard();
  // game.pickCard();
}
init();

