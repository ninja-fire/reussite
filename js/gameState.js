import { Intro } from '/js/intro.js';
import { Game } from '/js/game.js';
import { EndOfGame } from '/js/endOfGame.js';

class GameState {

  constructor (rootContainer) {
    this.rootContainer = rootContainer;

    this.init();
    this.intro.init(() => this.start());
  }

  init () {

    this.intro = new Intro(this.rootContainer);
    this.game = new Game(this.rootContainer);
    this.endOfGame = new EndOfGame(this.rootContainer);

  }

  start () {

    this.game.init((isWinner) => this.end(isWinner));
  }

  end (isWinner) {
    this.endOfGame.init(isWinner, () => this.start());
  }
}

export { GameState };
