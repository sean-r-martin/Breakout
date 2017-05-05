/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ball = __webpack_require__(1);

var _ball2 = _interopRequireDefault(_ball);

var _paddle = __webpack_require__(3);

var _paddle2 = _interopRequireDefault(_paddle);

var _bricks = __webpack_require__(2);

var _bricks2 = _interopRequireDefault(_bricks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.canvas = $("#myCanvas").get(0);
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.lives = 3;
    this.status = 'active';
    this.paddle = new _paddle2.default(this.canvas, this.ctx);
    this.ball = new _ball2.default(this.canvas, this.ctx);
    this.bricks = new _bricks2.default(this.canvas, this.ctx);
  }

  _createClass(Game, [{
    key: 'draw',
    value: function draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bricks.draw();
      this.ball.draw();
      this.paddle.draw();
      this.paddle.move();
      this.drawScore(this.score, this.ctx);
      this.drawLives(this.lives, this.ctx, this.canvas);
      this.wallCollisionDetection(this.ball, this.paddle, this.canvas);
      this.brickCollisionDetection(this.bricks, this.ball);
      if (this.status === 'active') {
        requestAnimationFrame(this.draw.bind(this));
      }
    }
  }, {
    key: 'drawScore',
    value: function drawScore(score, ctx) {
      ctx.font = "20px wallpoet";
      ctx.fillStyle = "darkblue";
      ctx.fillText("Score: " + score, 8, 20);
    }
  }, {
    key: 'drawLives',
    value: function drawLives(lives, ctx, canvas) {
      ctx.font = "20px wallpoet";
      ctx.fillStyle = "darkblue";
      ctx.fillText("Lives: " + lives, canvas.width - 100, 20);
    }
  }, {
    key: 'brickCollisionDetection',
    value: function brickCollisionDetection(bricks, ball) {
      var _this = this;

      var brickGrid = bricks.brickGrid;
      brickGrid.forEach(function (row, rowIndex) {
        row.forEach(function (brick, colIndex) {
          if (!brick.destroyed) {
            if (_this._ballHitBrick(brick, ball)) {
              _this._destroyBrick(brick, ball);
            }
          }
        });
      });
    }
  }, {
    key: 'wallCollisionDetection',
    value: function wallCollisionDetection(ball, paddle, canvas) {
      if (this._ballHitSideWall(ball, canvas)) {
        ball.xSpeed = -ball.xSpeed;
      }
      if (this._ballHitPaddle(ball, paddle, canvas)) {
        ball.ySpeed = -ball.ySpeed;
      }
      if (this._ballHitCeiling(ball)) {
        ball.ySpeed = -ball.ySpeed;
      } else if (this._ballHitFloor(ball, canvas)) {
        if (this.lives--) {
          this._resetPaddle(ball, paddle, canvas);
        } else {
          alert("Game Over");
          document.location.reload();
        }
      }
    }
  }, {
    key: '_ballHitBrick',
    value: function _ballHitBrick(brick, ball) {
      var width = this.bricks.width;
      var height = this.bricks.height;
      return ball.x > brick.x && ball.x < brick.x + width && ball.y > brick.y && ball.y < brick.y + height;
    }
  }, {
    key: '_destroyBrick',
    value: function _destroyBrick(brick, ball) {
      ball.ySpeed = -ball.ySpeed;
      brick.destroyed = true;
      this.score++;
      this._victoryStatus();
      this._increaseSpeed(ball);
    }
  }, {
    key: '_victoryStatus',
    value: function _victoryStatus() {
      var rowCount = this.bricks.rowCount;
      var columnCount = this.bricks.columnCount;
      if (this.score === rowCount * columnCount) {
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
      }
    }
  }, {
    key: '_increaseSpeed',
    value: function _increaseSpeed(ball) {
      if (this.score % 7 === 0) {
        var increase = 0.5;
        var xIncrease = ball.xSpeed > 0 ? increase : -increase;
        var yIncrease = ball.ySpeed > 0 ? increase : -increase;
        ball.xSpeed += xIncrease;
        ball.ySpeed += yIncrease;
      }
    }
  }, {
    key: '_ballHitSideWall',
    value: function _ballHitSideWall(ball, canvas) {
      return ball.x + ball.xSpeed < ball.radius || ball.x + ball.xSpeed > canvas.width - ball.radius;
    }
  }, {
    key: '_ballHitCeiling',
    value: function _ballHitCeiling(ball) {
      return ball.y + ball.ySpeed < ball.radius;
    }
  }, {
    key: '_ballHitFloor',
    value: function _ballHitFloor(ball, canvas) {
      return ball.y + ball.ySpeed > canvas.height - ball.radius;
    }
  }, {
    key: '_ballHitPaddle',
    value: function _ballHitPaddle(ball, paddle, canvas) {
      var matchYAxis = ball.y + ball.ySpeed > canvas.height - paddle.height * 2 - ball.radius;
      var matchXAxis = ball.x > paddle.xAxis && ball.x < paddle.xAxis + paddle.width;
      return matchXAxis && matchYAxis;
    }
  }, {
    key: '_resetPaddle',
    value: function _resetPaddle(ball, paddle, canvas) {
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 30;
      paddle.xAxis = (canvas.width - paddle.width) / 2;
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
  function Ball(canvas, ctx) {
    _classCallCheck(this, Ball);

    this.canvas = canvas;
    this.ctx = ctx;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.xSpeed = 3;
    this.ySpeed = -3;
    this.radius = 10;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      var redOrange = "#fd2c03";
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = redOrange;
      this.ctx.fill();
      this.ctx.closePath();
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  }]);

  return Ball;
}();

module.exports = Ball;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bricks = function () {
  function Bricks(canvas, ctx) {
    _classCallCheck(this, Bricks);

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

  _createClass(Bricks, [{
    key: "createBricks",
    value: function createBricks() {
      for (var row = 0; row < this.columnCount; row++) {
        this.brickGrid[row] = [];
        for (var col = 0; col < this.rowCount; col++) {
          var color = this._selectColor();
          this.brickGrid[row][col] = { x: 0, y: 0, color: color, destroyed: false };
        }
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this.brickGrid.forEach(function (row, rowIndex) {
        row.forEach(function (brick, colIndex) {
          if (!brick.destroyed) {
            _this._drawBrick(brick, rowIndex, colIndex);
          }
        });
      });
    }
  }, {
    key: "_drawBrick",
    value: function _drawBrick(brick, rowIndex, colIndex) {
      brick.x = rowIndex * (this.width + this.padding) + this.offsetLeft;
      brick.y = colIndex * (this.height + this.padding) + this.offsetTop;
      this.ctx.beginPath();
      this.ctx.rect(brick.x, brick.y, this.width, this.height);
      this.ctx.fillStyle = brick.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "_selectColor",
    value: function _selectColor(rowIndex, colIndex) {
      var lightBrown = "#c75d14";
      var darkBrown = "#4b270f";
      var gray = "#50554e";
      var num = Math.random() * 100 + 1;
      if (num > 45) {
        return lightBrown;
      } else if (num > 15) {
        return darkBrown;
      } else {
        return gray;
      }
    }
  }]);

  return Bricks;
}();

module.exports = Bricks;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paddle = function () {
  function Paddle(canvas, ctx) {
    _classCallCheck(this, Paddle);

    this.canvas = canvas;
    this.ctx = ctx;
    this.height = 10;
    this.width = 70;
    this.xAxis = (this.canvas.width - this.width) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    $(document).keydown(this.keyDownHandler);
    $(document).keyup(this.keyUpHandler);
    $(document).mousemove(this.mouseMoveHandler);
  }

  _createClass(Paddle, [{
    key: "draw",
    value: function draw() {
      this.ctx.beginPath();
      var yAxis = this.canvas.height - this.height * 2;
      this.ctx.rect(this.xAxis, yAxis, this.width, this.height);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "keyDownHandler",
    value: function keyDownHandler(event) {
      if (event.keyCode === 39) {
        this.rightPressed = true;
      } else if (event.keyCode === 37) {
        this.leftPressed = true;
      }
    }
  }, {
    key: "keyUpHandler",
    value: function keyUpHandler(event) {
      if (event.keyCode === 39) {
        this.rightPressed = false;
      } else if (event.keyCode === 37) {
        this.leftPressed = false;
      }
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(event) {
      var relativeX = event.clientX - this.canvas.offsetLeft;
      if (relativeX > 0 && relativeX < this.canvas.width) {
        this.xAxis = relativeX - this.width / 2;
      }
    }
  }, {
    key: "move",
    value: function move() {
      if (this.rightPressed && this.xAxis < this.canvas.width - this.width) {
        this.xAxis += 7;
      } else if (this.leftPressed && this.xAxis > 0) {
        this.xAxis -= 7;
      }
    }
  }]);

  return Paddle;
}();

module.exports = Paddle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game2.default();

function pauseGame() {
  if ($('#start-button').text()) {
    return null;
  }
  game.status = 'paused';
  if ($('#resume-button').text() !== 'Resume Game') {
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
  var resumeButton = $('<p id="resume-button" class="button"></p>').text('Resume Game');
  $('#buttons').append(resumeButton);
  resumeListener(resumeButton);
}

function resumeListener(button) {
  button.click(function () {
    $('#resume-button').remove();
    $('#restart-button').remove();
    game.status = 'active';
    game.draw();
  });
}

function createRestartButton() {
  var restartButton = $('<p id="restart-button" class="button"></p>').text('Restart Game');
  $('#buttons').append(restartButton);
  restartListener(restartButton);
}

function restartListener(button) {
  button.click(function () {
    $('#resume-button').remove();
    $('#restart-button').remove();
    game = new _game2.default();
    game.bricks.createBricks();
    game.draw();
  });
}

$('#start-button').click(startGame);
$(document).keypress(pauseGame);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map