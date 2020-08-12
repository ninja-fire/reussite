class Card {

  constructor(rank, family) {

    this.rank = rank;
    this.family = family;
    this.container = document.createElement('div');
    this.container.classList.add('card-container');
    this.container.innerHTML =
`<div>
  ${this.rank} ${this.family}
</div>`;

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

  constructor(rootContainer, onPickCard) {
    this.stack = [];
    this.onPickCard = onPickCard;
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'deck-container';
    this.rootContainer.appendChild(this.container);
    this.button = document.createElement('button');
    this.container.appendChild(this.button);
    this.button.innerText = 'DECK';
    this.init();
    this.shuffle();
    this.button.addEventListener('click', this.onPickCard);
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

  destroy() {
    this.stack = [];
    this.rootContainer.removeChild(this.container);
  }

  toJson() {

    return this.stack.map(card => card.toJson());

  }

}

class Board {

  constructor(rootContainer, onMoveCard) {

    this.cards = [];
    this.rootContainer = rootContainer;
    this.onMoveCard = onMoveCard;
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
    card.container.addEventListener('click', () => this.onMoveCard(card) )
  }

  suppPreviousCard(card){
    const previousCard = this.cards.find(  (_, i) => this.cards[i + 1] === card);
    this.cards = this.cards.filter( (boardCard) => boardCard !== previousCard);
    this.container.removeChild(previousCard.container);
  }

  canMoveAtLeastOne() {
    return !!this.cards.find(card => this.canMove(card))
  }

  destroy() {
    this.cards = [];
    this.rootContainer.removeChild(this.container);
  }

  toJson() {

    return this.cards.map(card => card.toJson());

  }

}

class Game {

  constructor(rootContainer) {
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'game-container';
    this.rootContainer.appendChild(this.container);
    this.init();

  }

  init() {

    this.isEndOfGame = false;
    this.win = false;
    this.deck = new Deck(this.container, () => this.pickCard() );
    this.board = new Board(this.container, (card) => this.moveCard(card) );

  }

  pickCard() {

    if (this.isEndOfGame === false) {

      const pickedCard = this.deck.pick();

      if (pickedCard) {

        this.board.addCard(pickedCard);
        console.log(this.toJson());

        if (this.deck.empty() && !this.board.canMoveAtLeastOne() ){
          this.isEndOfGame = true;
          console.log('Lose');
        }
        return true;

      }
    }
    return false;

  }

  moveCard(card) {

    if (this.isEndOfGame === false) {

      if (this.board.canMove(card)) {

        this.board.suppPreviousCard(card);
        console.log(this.toJson() );

        if (this.board.isWinSize() && this.deck.empty() ) {

          this.isEndOfGame = true;
          this.win = true;
          console.log('Win');
          this.endOfGame();

        } else if (!this.board.isWinSize() && this.deck.empty() && !this.board.canMoveAtLeastOne() ) {

          this.isEndOfGame = true;

          console.log('Lose');
          this.endOfGame();

        }

        return true;
      }
    }
    console.log('You can not move');
    return false;
  }

  endOfGame (){

    this.board.destroy();
    this.deck.destroy();
    this.board = null;
    this.deck = null;
    const button = document.createElement('button');
    this.container.appendChild(button);
    const status = this.win ? 'Congrats' : 'Boooooouh';
    button.innerText = `${status}, start new game`;
    button.addEventListener('click', () => {
      this.container.removeChild(button);
      this.init();
    });

  }

  toJson() {

    return {
      deck: this.deck.toJson(),
      endOfGame: this.isEndOfGame,
      win: this.win,
      board: this.board.toJson()
    };

  }

}

function init () {
  const rootContainer = document.getElementById('root-container');
  new Game(rootContainer);
}

init();
