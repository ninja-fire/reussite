import { Deck } from '/js/deck.js';
import { Board } from '/js/board.js';
import cardLose from "../image/card-lose.svg";

class Game {

  constructor(rootContainer) {
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'game-container';
    this.rootContainer.appendChild(this.container);
    this.init();
    this.endOfGame();// todo supprimer
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
          this.endOfGame();
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

    this.cardLose();
    this.rootContainer.classList = 'height';
    this.container.classList = 'height';
    const btnContainer = document.createElement('div');
    btnContainer.id = 'btn-container';
    this.container.appendChild(btnContainer);
    const button = document.createElement('button');
    btnContainer.appendChild(button);
    const status = this.win ? 'Congrats' : 'Boooooouh';
    button.innerText = `${status}, start new game`;
    button.addEventListener('click', () => {
      this.container.innerHTML = '';
      this.rootContainer.classList.remove('height');
      this.container.classList.remove('height');
      this.init();
    });

  }

  cardLose () {

    const cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';
    this.container.appendChild(cardContainer);

    for (let i = 0; i < 10; i++) {

      this.image = document.createElement('img');
      this.image.src = cardLose;
      this.image.className = 'card-lose';
      cardContainer.appendChild(this.image);
    }
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

export { Game };
