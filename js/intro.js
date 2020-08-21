import { CardAnimation } from '/js/cardAnimation';
import { Rules } from '/js/rules';

class Intro {

  constructor (rootContainer) {

    this.rootContainer = rootContainer;

  }

  init (onStart) {

    this.container = document.createElement('div');
    this.container.id = 'intro-container';
    this.rootContainer.appendChild(this.container);

    this.cardAnimation = new CardAnimation(this.container, 'card-welcome');
    this.rulesContainer = new Rules(this.rootContainer);

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
    btnBlueContainer.classList.add('btn-container', 'play');
    welcomeContainer.appendChild(btnBlueContainer);

    const btnBlue = document.createElement('button');
    btnBlue.id = 'btn-intro';
    btnBlue.innerText = `Let’s start a new game !`;
    btnBlueContainer.appendChild(btnBlue);

    btnBlue.addEventListener('click', () => {
      this.destroy();
      onStart();
    });

    const btnPinkContainer = document.createElement('div');
    btnPinkContainer.classList.add('btn-container', 'rules');
    welcomeContainer.appendChild(btnPinkContainer);

    const buttonPink = document.createElement('button');
    btnPinkContainer.appendChild(buttonPink);
    buttonPink.innerText = `What is this game ?`;

    buttonPink.addEventListener('click', () => {

      this.rulesContainer.init(() => {
        this.destroy();
        onStart();
      });

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

export { Intro };
