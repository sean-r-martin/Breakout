'use strict';
import Game from './game.js';

document.addEventListener("DOMContentLoaded", function(event) {
  const game = new Game();
  game.bricks.createBricks();
  game.draw();
});
