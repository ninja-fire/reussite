import { Deck } from '/js/deck.js';
import { Board } from '/js/board.js';

class Game {

  constructor(rootContainer) {

    this.rootContainer = rootContainer;

  }

  init (onEnd) {

    this.container = document.createElement('div');
    this.container.id = 'game-container';
    this.rootContainer.appendChild(this.container);

    this.isEndOfGame = false;

    this.onEnd = onEnd;

    this.deck = new Deck(this.container, () => this.pickCard());

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
          this.destroy();
          this.onEnd(false);

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
          console.log('Win');
          this.destroy();
          this.onEnd(true);

        } else if (!this.board.isWinSize() && this.deck.empty() && !this.board.canMoveAtLeastOne() ) {

          this.isEndOfGame = true;

          console.log('Lose');
          this.destroy();
          this.onEnd(false);


        }

        return true;
      }
    }
    console.log('You can not move');
    return false;
  }

  destroy () {

    this.board.destroy();
    this.deck.destroy();
    this.board = null;
    this.deck = null;
    this.rootContainer.removeChild(this.container);
    this.container = null;

  }

  toJson() {

    return {
      deck: this.deck.toJson(),
      endOfGame: this.isEndOfGame,
      board: this.board.toJson()
    };

  }

}

export { Game };
