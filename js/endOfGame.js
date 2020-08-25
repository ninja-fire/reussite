import { CardAnimation } from '/js/cardAnimation';
import { Rules } from "./rules";

class EndOfGame {

  constructor (rootContainer) {
    this.rootContainer = rootContainer;

  }

  init (isWinner, onStart) {

    this.container = document.createElement('div');
    this.container.id = 'end-of-game-container';
    this.rootContainer.appendChild(this.container);

    this.cardAnimation = new CardAnimation(this.container, 'card-lose');
    this.rulesContainer = new Rules(this.rootContainer);

    this.cardAnimation.init();

    const btnRulesContainer = document.createElement('div');
    btnRulesContainer.id = 'btn-rules-container';
    this.container.appendChild(btnRulesContainer);

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    btnRulesContainer.appendChild(statusContainer);

    const paraStatus = document.createElement('p');
    const status = isWinner ? 'Congratulations' : `Don't give up!`;
    paraStatus.innerText = `${status}`;
    statusContainer.appendChild(paraStatus);

    const btnBlueContainer = document.createElement('div');
    btnBlueContainer.classList.add('btn-container', 'play');
    btnRulesContainer.appendChild(btnBlueContainer);

    const buttonBlue = document.createElement('button');
    btnBlueContainer.appendChild(buttonBlue);
    buttonBlue.innerText = `Let’s start a new game !`;

    const btnPinkContainer = document.createElement('div');
    btnPinkContainer.classList.add('btn-container', 'rules');
    btnRulesContainer.appendChild(btnPinkContainer);

    const buttonPink = document.createElement('button');
    btnPinkContainer.appendChild(buttonPink);
    buttonPink.innerText = `What is this game ?`;

    buttonPink.addEventListener('click', () => {

      this.rulesContainer.init(() => {
        this.destroy();
        onStart();
      });

    });

    buttonBlue.addEventListener('click', () => {

      this.destroy();
      onStart();

      });
  }

  destroy(){

    this.cardAnimation.destroy();
    this.rulesContainer.destroy();
    this.cardAnimation = null;
    this.rulesContainer = null;
    this.rootContainer.removeChild(this.container);
    this.container = null;

  }

}

export { EndOfGame };
