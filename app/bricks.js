'use strict';

class Bricks {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.brickGrid = [];
    this.rowCount = 5;
    this.columnCount = 7;
    this.width = 70;
    this.height = 20;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
  }

  createBricks() {
    for (let row = 0; row < this.columnCount; row++) {
      this.brickGrid[row] = [];
      for (let col = 0; col < this.rowCount; col++) {
        const color = this._selectColor();
        this.brickGrid[row][col] = { x: 0, y: 0, color: color, destroyed: false};
      }
    }
  }

  draw() {
    this.brickGrid.forEach((row, rowIndex) => {
      row.forEach((brick, colIndex) => {
        if(!brick.destroyed) {
          this._drawBrick(brick, rowIndex, colIndex);
        }
      })
    })
  }

  _drawBrick(brick, rowIndex, colIndex) {
    brick.x = (rowIndex * (this.width + this.padding)) + this.offsetLeft;
    brick.y = (colIndex * (this.height + this.padding)) + this.offsetTop;
    this.ctx.beginPath();
    this.ctx.rect(brick.x, brick.y, this.width, this.height);
    this.ctx.fillStyle = brick.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  _selectColor(rowIndex, colIndex) {
    const lightBrown = "#c75d14";
    const darkBrown = "#4b270f";
    const gray = "#50554e";
    const num = (Math.random() * 100) + 1;
    if (num > 45) {
      return lightBrown;
    } else if (num > 15) {
      return darkBrown;
    } else {
      return gray;
    }
  }

}

module.exports = Bricks;
