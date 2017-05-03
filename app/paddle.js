'use strict';

class Paddle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.height = 10;
    this.width = 75;
    this.xAxis = (this.canvas.width - this.width) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
    document.addEventListener("mousemove", this.mouseMoveHandler, false)
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.xAxis, this.canvas.height - this.height, this.width, this.height);
    this.ctx.fillStyle = "0095DD";
    this.ctx.fill()
    this.ctx.closePath();
  }

  keyDownHandler(event) {
    if(event.keyCode == 39) {
      this.rightPressed = true;
    } else if (event.keyCode == 37) {
      this.leftPressed = true;
    }
  }

  keyUpHandler(event) {
    if(event.keyCode == 39) {
      this.rightPressed = false;
    }
    else if (event.keyCode == 37) {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(event) {
    const relativeX = event.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.xAxis = relativeX - this.width / 2;
    }
  }

  checkPosition() {
    if (this.rightPressed && this.xAxis < this.canvas.width - this.width) {
      this.xAxis += 7;
    } else if (this.leftPressed && this.xAxis > 0) {
      this.xAxis -= 7;
    }
  }

}


module.exports = Paddle;
