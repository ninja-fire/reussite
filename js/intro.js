import { CardAnimation } from '/js/cardAnimation';
import { RulesContainer } from '/js/rulesContainer';

class Intro {

  constructor (rootContainer) {

    this.rootContainer = rootContainer;

  }

  init (onStart) {

    this.container = document.createElement('div');
    this.container.id = 'intro-container';
    this.rootContainer.appendChild(this.container);

    this.cardAnimation = new CardAnimation (this.container, 'card-welcome');
    this.rulesContainer = new RulesContainer (this.rootContainer);

    this.cardAnimation.init();

    const welcomeContainer = document.createElement('div');
    welcomeContainer.id = 'welcome-container';
    this.container.appendChild(welcomeContainer);

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    welcomeContainer.appendChild(statusContainer);

    const paraStatus = document.createElement('p');
    paraStatus.innerText = `Welcome!`;
    statusContainer.appendChild(paraStatus);

    const btnBlueContainer = document.createElement('div');
    btnBlueContainer.classList.add('btn-b-container');
    welcomeContainer.appendChild(btnBlueContainer);

    const btnBlue = document.createElement('button');
    btnBlue.id = 'btn-intro';
    btnBlue.innerText = `Let’s start a new game !`;
    btnBlueContainer.appendChild(btnBlue);

    btnBlue.addEventListener('click', () => {
      this.rootContainer.removeChild(this.container);
      onStart();
    });

    const btnPinkContainer = document.createElement('div');
    btnPinkContainer.classList.add('btn-p-container');
    welcomeContainer.appendChild(btnPinkContainer);

    const buttonPink = document.createElement('button');
    btnPinkContainer.appendChild(buttonPink);
    buttonPink.innerText = `What is this game ?`;

    buttonPink.addEventListener('click', () => {

      this.rulesContainer.init(() => {
        this.rootContainer.removeChild(this.container);
        onStart();
      });

    });
  }

}

export { Intro };
