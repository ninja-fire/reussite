import {Deck} from '/js/deck.js';
import {Board} from '/js/board.js';
import {ControlPanel} from '/js/controlPanel.js';
import cardSound from '/sound/card.mp3'

class Game {

  constructor(rootContainer) {

    this.rootContainer = rootContainer;

  }

  init(onEnd) {

    this.container = document.createElement('div');
    this.container.id = 'game-container';
    this.rootContainer.appendChild(this.container);

    this.deckCtrlContainer = document.createElement('div');
    this.deckCtrlContainer.id = 'deck-ctrl-container';
    this.container.appendChild(this.deckCtrlContainer);

    this.isEndOfGame = false;

    this.onEnd = onEnd;

    this.deck = new Deck(this.deckCtrlContainer, () => this.pickCard());

    this.controlPanel = new ControlPanel(this.deckCtrlContainer, () => this.reset());

    this.board = new Board(this.container, (card) => this.moveCard(card));

  }

  pickCard() {

    if (this.isEndOfGame === false) {

      const pickedCard = this.deck.pick();

      if (pickedCard) {

        this.board.addCard(pickedCard);
        this.soundPlay();
        console.log(this.toJson());

        if (this.deck.empty() && !this.board.canMoveAtLeastOne()) {
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
        console.log(this.toJson());

        if (this.board.isWinSize() && this.deck.empty()) {

          this.isEndOfGame = true;
          console.log('Win');
          this.destroy();
          this.onEnd(true);

        } else if (!this.board.isWinSize() && this.deck.empty() && !this.board.canMoveAtLeastOne()) {

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

  destroy() {

    this.board.destroy();
    this.deck.destroy();
    this.board = null;
    this.deck = null;
    this.rootContainer.removeChild(this.container);
    this.container = null;

  }

  soundPlay() {

    const audio = document.createElement('audio');
    audio.src = cardSound;
    this.container.appendChild(audio);

    audio.play()
      .then(() => {
        console.log('sound on');
        audio.addEventListener('ended', () => {
          this.container.removeChild(audio);
          console.log('sound off');
        })
      }).catch((error) => {
      console.error(error);
    });

  }

  reset() {
    this.destroy();
    this.init();
  }

  toJson() {

    return {
      deck: this.deck.toJson(),
      endOfGame: this.isEndOfGame,
      board: this.board.toJson()
    };

  }

}

export {Game};
