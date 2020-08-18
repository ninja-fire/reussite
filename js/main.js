import { GameState } from '/js/gameState.js';
import '../scss/main.scss'

function init () {

  const rootContainer = document.getElementById('root-container');
  new GameState(rootContainer);
}

init();
