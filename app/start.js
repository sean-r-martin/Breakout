'use strict';
import Game from './game.js';
let game = new Game();

function pauseGame() {
  if ($('#start-button').text()) {
    return null;
  }
  game.status = 'paused';
  if($('#resume-button').text() !== 'Resume Game') {
    createResumeButton();
    createRestartButton();
  }
}

function startGame() {
  game.bricks.createBricks();
  game.draw();
  $('#start-button').remove();
}

function createResumeButton() {
  const resumeButton = $('<p id="resume-button" class="button"></p>').text('Resume Game');
  $('#buttons').append(resumeButton);
  resumeListener(resumeButton);
}

function resumeListener(button) {
  button.click(function () {
    $('#resume-button').remove();
    $('#restart-button').remove();
    game.status = 'active';
    game.draw();
  })
}

function createRestartButton() {
  const restartButton = $('<p id="restart-button" class="button"></p>').text('Restart Game');
  $('#buttons').append(restartButton);
  restartListener(restartButton);
}

function restartListener(button) {
  button.click(function () {
    $('#resume-button').remove();
    $('#restart-button').remove();
    game = new Game();
    game.bricks.createBricks();
    game.draw();
  })
}

$('#start-button').click(startGame);
$(document).keypress(pauseGame);
