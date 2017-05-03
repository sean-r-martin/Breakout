'use strict';

class Bricks {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.brickGrid = [];
    this.rowCount = 3;
    this.columnCount = 5;
    this.width = 75;
    this.height = 20;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;

    for (let row = 0; row < this.columnCount; row++) {
      this.brickGrid[row] = [];
      for (let col = 0; col < this.rowCount; col++) {
        this.brickGrid[row][col] = { x: 0, y: 0, destroyed: false};
      }
    }

  }

  draw() {
    this.brickGrid.forEach((row, rowIndex) => {
      row.forEach((brick, colIndex) => {
        if(!brick.destroyed) {
          const brickX = (rowIndex * (this.width + this.padding)) + this.offsetLeft;
          const brickY = (colIndex * (this.height + this.padding)) + this.offsetTop;
          brick.x = brickX;
          brick.y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brick.x, brick.y, this.width, this.height);
          this.ctx.fillStyle = "#0095DD";
          this.ctx.fill();
          this.ctx.closePath();
        }
      })
    })
  }
}

module.exports = Bricks;
