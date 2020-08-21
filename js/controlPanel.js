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
    btnBlueContainer.classList.add('btn-b-container');
    this.container.appendChild(btnBlueContainer);

    const btnBlue = document.createElement('button');
    btnBlue.innerText = `Reset`;
    btnBlueContainer.appendChild(btnBlue);

    this.track = document.createElement('audio');
    this.track.src = alkemist;
    this.rootContainer.appendChild( this.track);

  }

  muteTrack () {

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

}

export { ControlPanel };
