import { Deck } from '/js/deck.js';
import { Board } from '/js/board.js';
import cardLose from "../image/card-lose.svg";
import rulesImg from '../image/rules.svg';


class Game {

  constructor(rootContainer) {
    this.rootContainer = rootContainer;
    // this.intro();
    this.init();
    this.endOfGame();

  }

  intro () {

    const introContainer = document.createElement('div');
    introContainer.id = 'intro-container';
    this.rootContainer.appendChild(introContainer);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    introContainer.appendChild(btnContainer);

    const btnIntro = document.createElement('button');
    btnIntro.id = 'btn-intro';
    btnIntro.innerText = `Let’s start a new game !`;
    btnContainer.appendChild(btnIntro);

    btnIntro.addEventListener('click', () => {
      this.rootContainer.removeChild(introContainer);
      this.init();
    });
  }

  init() {

    this.container = document.createElement('div');
    this.container.id = 'game-container';
    this.rootContainer.appendChild(this.container);

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
    this.rootContainer.removeChild(this.container);

    const endOfGameContainer = document.createElement('div');
    endOfGameContainer.id = 'end-of-game-container';
    this.rootContainer.appendChild(endOfGameContainer);

    this.cardLose(endOfGameContainer);

    const btnRulesContainer = document.createElement('div');
    btnRulesContainer.id = 'btn-rules-container';
    endOfGameContainer.appendChild(btnRulesContainer);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    btnRulesContainer.appendChild(btnContainer);

    const button = document.createElement('button');
    btnContainer.appendChild(button);
    // const status = this.win ? 'Congrats' : 'Boooooouh';
    // button.innerText = `${status}, start new game`;
    button.innerText = `Let’s start a new game !`;

    const rulesContainer = document.createElement('div');
    rulesContainer.id = 'rules-container';
    btnRulesContainer.appendChild(rulesContainer);

    const rulesImgContainer = document.createElement('img');
    rulesImgContainer.id = 'rules-img-container';
    rulesImgContainer.src = rulesImg;
    rulesContainer.appendChild(rulesImgContainer);

    const cln = btnContainer.cloneNode(true);
    btnRulesContainer.appendChild(cln);

    // const status = this.win ? 'Congrats' : 'Boooooouh';
    // button.innerText = `${status}, start new game`;
    const buttons = btnRulesContainer.querySelectorAll('.btn-container > button');
    Array.from(buttons).forEach( (button) => {
      button.addEventListener('click', () => {

        this.rootContainer.removeChild(endOfGameContainer);
        this.init();

      });
    });

  }

  cardLose (endOfGameContainer) {

    const cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';
    endOfGameContainer.appendChild(cardContainer);

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
