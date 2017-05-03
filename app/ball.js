'use strict';

class Ball {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.xStep = 2;
    this.yStep = -2;
    this.radius = 10;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
    this.x += this.xStep;
    this.y += this.yStep;
  }

}

module.exports = Ball;
