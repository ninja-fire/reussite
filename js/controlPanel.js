import alkemist from "../sound/alkemist.mp3";
import {Rules} from "./rules";

class ControlPanel {

  constructor(rootContainer, reset) {
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'ctrl-container';
    this.rootContainer.appendChild(this.container);

    this.reset = reset;

    this.init();

  }

  init() {

    const musicContainer = document.createElement('div');
    musicContainer.id = 'music-container';
    this.container.appendChild(musicContainer);

    const muteContainer = document.createElement('div');
    muteContainer.id = 'mute-container';
    musicContainer.appendChild(muteContainer);

    this.muteBtn = document.createElement('button');
    this.muteBtn.id = 'mute-btn';
    muteContainer.appendChild(this.muteBtn);

    const artistContainer = document.createElement('div');
    artistContainer.id = 'artist-container';
    musicContainer.appendChild(artistContainer);

    const artistPara = document.createElement('p');
    artistPara.id = 'artist-para';
    artistPara.innerText = `Discover `;
    artistContainer.appendChild(artistPara);

    const artistLink = document.createElement('a');
    artistLink.id = 'artist-link';
    artistLink.href = 'https://soundcloud.com/alkemist-dub/tracks';
    artistLink.target = 'blank';
    artistLink.innerHTML = `Alkemist`;
    artistPara.appendChild(artistLink);

    const btnContainer = document.createElement('div');
    btnContainer.id = 'btn-container';
    this.container.appendChild(btnContainer);

    const btnWarningContainer = document.createElement('div');
    btnWarningContainer.classList.add('btn-container', 'warning');
    btnContainer.appendChild(btnWarningContainer);

    this.btnWarning = document.createElement('button');
    this.btnWarning.innerText = `Reset`;
    btnWarningContainer.appendChild(this.btnWarning);

    const btnRulesContainer = document.createElement('div');
    btnRulesContainer.classList.add('btn-container', 'rules');
    btnContainer.appendChild(btnRulesContainer);

    this.btnRules = document.createElement('button');
    this.btnRules.innerText = `Rules`;
    btnRulesContainer.appendChild(this.btnRules);

    const githubContainer = document.createElement('div');
    githubContainer.id = 'github-container';
    this.container.appendChild(githubContainer);

    const githubLink = document.createElement('a');
    githubLink.id = 'github-link';
    githubLink.href = 'https://github.com/ninja-fire/reussite';
    githubLink.target = 'blank';
    githubContainer.appendChild(githubLink);

    this.track = document.createElement('audio');
    this.track.src = alkemist;
    this.rootContainer.appendChild(this.track);

    this.loadTrack();
    this.btnWarning.addEventListener('click', () => this.onReset());

  }

  loadTrack() {

    this.track.play()
      .then(() => {
        console.log('track on');
        this.muteBtn.addEventListener('click', () => {
          if (this.track.duration > 0 && !this.track.paused) {
            this.track.pause();
            this.muteBtn.classList.add('off');

            console.log('track paused');
          } else {
            this.track.play().catch((error) => console.error(error));
            this.muteBtn.classList.remove('off');
          }
        })
      }).catch((error) => {
      console.error(error);
    });
  }

  onReset() {

    const validationPopup = document.createElement('div');
    validationPopup.classList.add('popup-container');
    validationPopup.id = 'validation-container';
    this.rootContainer.appendChild(validationPopup);

    const validationContainer = document.createElement('div');
    validationContainer.classList.add('popup');
    validationPopup.appendChild(validationContainer);

    const crossContainer = document.createElement('div');
    crossContainer.classList.add('cross-container');
    validationContainer.appendChild(crossContainer);

    const crossBtn = document.createElement('button');
    crossContainer.appendChild(crossBtn);
    crossBtn.addEventListener('click', () => {
      this.rootContainer.removeChild(validationPopup);
    });

    const titleContainer = document.createElement('div');
    titleContainer.id = 'title-container';
    validationContainer.appendChild(titleContainer);

    const titlePara = document.createElement('h2');
    titlePara.id = 'title';
    titlePara.innerHTML = `Are you sure ?`;
    titleContainer.appendChild(titlePara);

    const messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    validationContainer.appendChild(messageContainer);

    const messagePara = document.createElement('p');
    messagePara.id = 'message';
    messagePara.innerHTML = `You are on the way to reset your game definitely.`;
    messageContainer.appendChild(messagePara);

    const btnResetContainer = document.createElement('div');
    btnResetContainer.classList.add('btn-container', 'warning');
    validationContainer.appendChild(btnResetContainer);

    this.btnReset = document.createElement('button');
    this.btnReset.innerText = `Reset`;
    btnResetContainer.appendChild(this.btnReset);

    this.btnReset.addEventListener('click', this.reset);

  }

}

export {ControlPanel};
