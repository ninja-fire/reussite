import { Game } from '/js/game.js';

function init () {
  const rootContainer = document.getElementById('root-container');
  new Game(rootContainer);
}

init();
