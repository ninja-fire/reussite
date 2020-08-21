import alkemist from "../sound/alkemist.mp3";

class ControlPanel {

  constructor (rootContainer) {
    this.rootContainer = rootContainer;
    this.container = document.createElement('div');
    this.container.id = 'ctrl-container';
    this.rootContainer.appendChild(this.container);

    this.init();
  }

  init () {

    const muteContainer = document.createElement('div');
    muteContainer.id = 'mute-container';
    this.container.appendChild(muteContainer);

    this.muteBtn = document.createElement('button');
    this.muteBtn.id = 'mute-btn';
    muteContainer.appendChild(this.muteBtn);

    const btnBlueContainer = document.createElement('div');
    btnBlueContainer.classList.add('btn-container', 'warning');
    this.container.appendChild(btnBlueContainer);

    this.btnBlue = document.createElement('button');
    this.btnBlue.innerText = `Reset`;
    btnBlueContainer.appendChild(this.btnBlue);

    this.track = document.createElement('audio');
    this.track.src = alkemist;
    this.rootContainer.appendChild(this.track);

    this.loadTrack();
    this.btnBlue.addEventListener('click', () => this.onReset() );

  }

  loadTrack () {

    this.track.play()
      .then(() => {
        console.log('track on');
        this.muteBtn.addEventListener('click', () => {
          if ( this.track.duration > 0 && ! this.track.paused) {
            this.track.pause();
            this.muteBtn.classList.add('off');

            console.log('track paused');
          } else {
            this.track.play().catch((error) => console.error(error) );
            this.muteBtn.classList.remove('off');
          }
        })
      }).catch((error) => {
      console.error(error);
    });
  }

  onReset () {

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

  }

}

export { ControlPanel };
