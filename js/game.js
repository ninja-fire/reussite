import { Deck } from '/js/deck.js';
import { Board } from '/js/board.js';
import cardBack from "../image/cardBack.svg";
import rulesImg from '../image/rules.svg';


class Game {

  constructor(rootContainer) {
    this.rootContainer = rootContainer;
    this.intro();
    // this.init();
    // this.endOfGame();

  }

  intro () {

    const introContainer = document.createElement('div');
    introContainer.id = 'intro-container';
    this.rootContainer.appendChild(introContainer);

    this.cardAnimation(introContainer, 'card-welcome');

    const welcomeContainer = document.createElement('div');
    welcomeContainer.id = 'welcome-container';
    introContainer.appendChild(welcomeContainer);

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    welcomeContainer.appendChild(statusContainer);

    const paraStatus = document.createElement('p');
    paraStatus.innerText = `Welcome!`;
    statusContainer.appendChild(paraStatus);

    const btnBlueContainer = document.createElement('div');
    btnBlueContainer.classList.add('btn-b-container');
    welcomeContainer.appendChild(btnBlueContainer);

    const btnIntro = document.createElement('button');
    btnIntro.id = 'btn-intro';
    btnIntro.innerText = `Let’s start a new game !`;
    btnBlueContainer.appendChild(btnIntro);

    btnIntro.addEventListener('click', () => {
      this.rootContainer.removeChild(introContainer);
      this.init();
    });

    const btnPinkContainer = document.createElement('div');
    btnPinkContainer.classList.add('btn-p-container');
    welcomeContainer.appendChild(btnPinkContainer);

    const buttonPink = document.createElement('button');
    btnPinkContainer.appendChild(buttonPink);
    buttonPink.innerText = `What is this game ?`;
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

    this.cardAnimation(endOfGameContainer, 'card-lose');

    const btnRulesContainer = document.createElement('div');
    btnRulesContainer.id = 'btn-rules-container';
    endOfGameContainer.appendChild(btnRulesContainer);

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    btnRulesContainer.appendChild(statusContainer);

    const paraStatus = document.createElement('p');
    const status = this.win ? 'Congratulations' : `Don't give up!`;
    paraStatus.innerText = `${status}`;
    statusContainer.appendChild(paraStatus);

    const btnBlueContainer = document.createElement('div');
    btnBlueContainer.classList.add('btn-b-container');
    btnRulesContainer.appendChild(btnBlueContainer);

    const buttonBlue = document.createElement('button');
    btnBlueContainer.appendChild(buttonBlue);
    buttonBlue.innerText = `Let’s start a new game !`;

    const btnPinkContainer = document.createElement('div');
    btnPinkContainer.classList.add('btn-p-container');
    btnRulesContainer.appendChild(btnPinkContainer);

    const buttonPink = document.createElement('button');
    btnPinkContainer.appendChild(buttonPink);
    buttonPink.innerText = `What is this game ?`;

    // const rulesContainer = document.createElement('div');
    // rulesContainer.id = 'rules-container';
    // btnRulesContainer.appendChild(rulesContainer);
    //
    // const rulesImgContainer = document.createElement('img');
    // rulesImgContainer.id = 'rules-img-container';
    // rulesImgContainer.src = rulesImg;
    // rulesContainer.appendChild(rulesImgContainer);

    // const cln = btnContainer.cloneNode(true);
    // btnRulesContainer.appendChild(cln);


    const buttons = btnRulesContainer.querySelectorAll('.btn-b-container > button');
    Array.from(buttons).forEach( (button) => {
      button.addEventListener('click', () => {

        this.rootContainer.removeChild(endOfGameContainer);
        this.init();

      });
    });

  }

  cardAnimation (container, className) {

    const cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';
    container.appendChild(cardContainer);

    for (let i = 0; i < 10; i++) {

      this.image = document.createElement('img');
      this.image.src = cardBack;
      this.image.classList.add(className);
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
