'use strict';

class Ball {
  constructor(canvas, ctx, placement) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = (this.canvas.width / 2) + placement;
    this.y = this.canvas.height - 30;
    this.xSpeed = 3;
    this.ySpeed = -3;
    this.radius = 10;
  }

  draw() {
    const redOrange = "#fd2c03"
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = redOrange;
    this.ctx.fill();
    this.ctx.closePath();
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

}

module.exports = Ball;
