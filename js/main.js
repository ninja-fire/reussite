import { Game } from '/js/game.js';
import '../scss/main.scss'

function init () {

  const rootContainer = document.getElementById('root-container');
  new Game(rootContainer);
}

init();
