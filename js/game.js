import { Deck } from '/js/deck.js';
import { Board } from '/js/board.js';
import cardLose from "../image/card-lose.svg";
import rulesImg from '../image/rules.svg';

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

    const btnRulesContainer = document.createElement('div');
    btnRulesContainer.id = 'btn-rules-container';
    this.container.appendChild(btnRulesContainer);

    const btnContainer = document.createElement('div');
    btnContainer.id = 'btn-container';
    btnRulesContainer.appendChild(btnContainer);

    const rulesContainer = document.createElement('div');
    rulesContainer.id = 'rules-container';
    btnRulesContainer.appendChild(rulesContainer);

    const rulesImgContainer = document.createElement('img');
    rulesImgContainer.id = 'rules-img-container';
    rulesImgContainer.src = rulesImg;
    rulesContainer.appendChild(rulesImgContainer);


    const button = document.createElement('button');
    btnContainer.appendChild(button);
    // const status = this.win ? 'Congrats' : 'Boooooouh';
    // button.innerText = `${status}, start new game`;
    button.innerText = `Let’s start a new game !`;
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
