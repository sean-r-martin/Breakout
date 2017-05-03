'use strict';

import Ball from './ball.js';
import Paddle from './paddle.js';
import Bricks from './bricks.js';

class Game {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.lives = 3;
    this.paddle = new Paddle(this.canvas, this.ctx);
    this.ball = new Ball(this.canvas, this.ctx);
    this.bricks = new Bricks(this.canvas, this.ctx);
  }
  draw() {
    this.wallCollision(this.ball, this.paddle, this.lives);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.bricks.draw();
    this.ball.draw();
    this.paddle.draw();
    this.paddle.checkPosition();
    this.drawScore(this.score, this.ctx);
    this.drawLives(this.lives, this.ctx, this.canvas);
    this.brickCollision(this.bricks, this.ball);
    requestAnimationFrame(this.draw.bind(this));
  }

  brickCollision(bricks, ball) {
    const brickGrid = bricks.brickGrid;
    const width = bricks.width;
    const height = bricks.height;
    const rowCount = bricks.rowCount;
    const columnCount = bricks.columnCount;
    brickGrid.forEach((row, rowIndex) => {
      row.forEach((brick, colIndex) => {
        if (!brick.destroyed) {
          if(ball.x > brick.x && ball.x < brick.x + width && ball.y > brick.y && ball.y < brick.y + height) {
            ball.yStep = -ball.yStep;
            brick.destroyed = true;
            this.score++;
            if(this.score === (rowCount * columnCount)) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            }
          }
        }
      })
    })
  }

  wallCollision(ball, paddle) {
    if ((ball.x + ball.xStep) < ball.radius || (ball.x + ball.xStep) > (this.canvas.width - ball.radius)) {
      ball.xStep = -ball.xStep;
    }
    if ((ball.y + ball.yStep) < ball.radius) {
      ball.yStep = -ball.yStep;
    } else if ((ball.y + ball.yStep) > (this.canvas.height - ball.radius)) {
      if((ball.x > paddle.xAxis) && ball.x < (paddle.xAxis + paddle.width)) {
        ball.yStep = -ball.yStep;
      } else {
        this.lives--;
        if(this.lives) {
          ball.x = this.canvas.width / 2;
          ball.y = this.canvas.height - 30;
          ball.xStep = 2;
          ball.yStep = -2;
          paddle.xAxis = (this.canvas.width - this.width) / 2;
        } else {
          alert("Game Over");
          document.location.reload();
        }
      }
    }
  }

  drawScore(score, ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }

  drawLives(lives, ctx, canvas) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
  }

}

module.exports = Game;
