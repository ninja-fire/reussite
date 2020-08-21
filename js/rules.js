import rulesImg from "../image/rules.svg";

class Rules {

  constructor (rootContainer) {
    this.rootContainer = rootContainer;

  }

  init (onStart) {

    this.container = document.createElement('div');
    this.container.id = 'rules-popup-container';
    this.rootContainer.appendChild(this.container);

    const rulesContainer = document.createElement('div');
    rulesContainer.id = 'rules-container';
    this.container.appendChild(rulesContainer);

    const crossContainer = document.createElement('div');
    crossContainer.classList.add('cross-container');
    rulesContainer.appendChild(crossContainer);

    const crossBtn = document.createElement('button');
    crossBtn.id = 'cross-btn';
    crossContainer.appendChild(crossBtn);

    crossBtn.addEventListener('click', () => {
      this.destroy();
    });

    const rulesImgCtn = document.createElement('img');
    rulesImgCtn.id = 'rules-img-container';
    rulesImgCtn.src = rulesImg;
    rulesContainer.appendChild(rulesImgCtn);

    const btnBlueContainer = document.createElement('div');
    btnBlueContainer.classList.add('btn-b-container');
    rulesContainer.appendChild(btnBlueContainer);

    const btnBlue = document.createElement('button');
    btnBlue.id = 'btn-intro';
    btnBlue.innerText = `Let’s start a new game !`;
    btnBlueContainer.appendChild(btnBlue);

    btnBlue.addEventListener('click', () => {
      this.destroy();
      onStart();
    });
  }


  destroy(){

    if(this.container){

      this.rootContainer.removeChild(this.container);
      this.container = null;

    }

  }

}

export { Rules };
