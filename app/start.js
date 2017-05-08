'use strict';
import Game from './game.js';
let game = new Game();
const startButton = $('#start-button');
const resumeButton = $('#resume-button');
const restartButton = $('#restart-button');

startButton.show();

function startGame() {
  game.setupCanvas();
  game.bricks.createBricks();
  game.draw();
  $('#start-button').remove();
}

function pauseGame() {
  if ($('#start-button').text()) {
    return null;
  } else {
    game.status = 'paused';
    resumeButton.show();
    restartButton.show();
  }
}

function resumeGame() {
  $('#resume-button').hide();
  $('#restart-button').hide();
  game.status = 'active';
  game.draw();
}

function restartGame() {
  $('#resume-button').hide();
  $('#restart-button').hide();
  $('#victory-msg').hide();
  $('#gameover-msg').hide();
  $(document).keypress(pauseGame);
  game = new Game();
  game.setupCanvas();
  game.bricks.createBricks();
  game.draw();
}

startButton.click(startGame);
resumeButton.click(resumeGame);
restartButton.click(restartGame);
$(document).keypress(pauseGame);
