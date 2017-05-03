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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.bricks.draw();
    this.ball.draw();
    this.paddle.draw();
    this.paddle.move();
    this.drawScore(this.score, this.ctx);
    this.drawLives(this.lives, this.ctx, this.canvas);
    this.wallCollisionDetection(this.ball, this.paddle, this.canvas);
    this.brickCollisionDetection(this.bricks, this.ball);
    requestAnimationFrame(this.draw.bind(this));
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

  brickCollisionDetection(bricks, ball) {
    const brickGrid = bricks.brickGrid;
    brickGrid.forEach((row, rowIndex) => {
      row.forEach((brick, colIndex) => {
        if (!brick.destroyed) {
          if(this._ballHitBrick(brick, ball)) {
            this._destroyBrick(brick, ball);
          }
        }
      })
    })
  }

  wallCollisionDetection(ball, paddle, canvas) {
    if (this._ballHitSideWall(ball, canvas)) {
      ball.xStep = -ball.xStep;
    }
    if (this._ballHitCeiling(ball)) {
      ball.yStep = -ball.yStep;
    } else if (this._ballHitFloor(ball, canvas)) {
      if(this._ballHitPaddle(ball, paddle)) {
        ball.yStep = -ball.yStep;
      } else {
        this.lives--;
        if(this.lives) {
          this._resetPaddle(ball, paddle, canvas);
        } else {
          alert("Game Over");
          document.location.reload();
        }
      }
    }
  }

  _ballHitBrick(brick, ball) {
    const width = this.bricks.width;
    const height = this.bricks.height;
    return ball.x > brick.x && ball.x < brick.x + width && ball.y > brick.y && ball.y < brick.y + height;
  }

  _destroyBrick(brick, ball) {
    const rowCount = this.bricks.rowCount;
    const columnCount = this.bricks.columnCount;

    ball.yStep = -ball.yStep;
    brick.destroyed = true;
    this.score++;
    if(this.score === (rowCount * columnCount)) {
      alert("YOU WIN, CONGRATULATIONS!");
      document.location.reload();
    }
  }

  _ballHitSideWall(ball, canvas) {
    return (ball.x + ball.xStep) < ball.radius || (ball.x + ball.xStep) > (canvas.width - ball.radius)
  }

  _ballHitCeiling(ball) {
    return (ball.y + ball.yStep) < ball.radius;
  }

  _ballHitFloor(ball, canvas) {
    return (ball.y + ball.yStep) > (canvas.height - ball.radius);
  }

  _ballHitPaddle(ball, paddle) {
    return (ball.x > paddle.xAxis) && ball.x < (paddle.xAxis + paddle.width);
  }

  _resetPaddle(ball, paddle, canvas) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.xStep = 2;
    ball.yStep = -2;
    paddle.xAxis = (canvas.width - paddle.width) / 2;
  }

}

module.exports = Game;
