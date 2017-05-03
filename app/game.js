'use strict';
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



let x = canvas.width / 2;
let y = canvas.height - 30;

let score = 0;
let lives = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false)

function draw() {
  checkBallPosition();
  checkPaddlePosition();
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

function checkBallPosition() {
  if ((x + dx) < ballRadius || (x + dx) > (canvas.width - ballRadius)) {
    dx = -dx;
  }
  if ((y + dy) < ballRadius) {
    dy = -dy;
  } else if ((y + dy) > (canvas.height - ballRadius)) {
    if((x > paddleX) && x < (paddleX + paddleWidth)) {
      dy = -dy;
    } else {
      lives--;
      if(lives) {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      } else {
        alert("Game Over");
        document.location.reload();
      }
    }
  }
}

function checkPaddlePosition() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

//ball
const ballRadius = 10;
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}



// paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "0095DD";
  ctx.fill()
  ctx.closePath();
}

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(event) {
  const relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

//bricks

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let row = 0; row < brickColumnCount; row++) {
  bricks[row] = [];
  for (let col = 0; col < brickRowCount; col++) {
    bricks[row][col] = { x: 0, y: 0, destroyed: false};
  }
}

function drawBricks() {
  bricks.forEach((row, rowIndex) => {
    row.forEach((brick, colIndex) => {
      if(!brick.destroyed) {
        const brickX = (rowIndex * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (colIndex * (brickHeight + brickPadding)) + brickOffsetTop;
        brick.x = brickX;
        brick.y = brickY;
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    })
  })
}

// collision detection
function collisionDetection() {
  bricks.forEach((row, rowIndex) => {
    row.forEach((brick, colIndex) => {
      if (!brick.destroyed) {
        if(x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
          dy = -dy;
          brick.destroyed = true;
          score++;
          if(score == brickRowCount*brickColumnCount) {
          alert("YOU WIN, CONGRATULATIONS!");
          document.location.reload();
          }
        }
      }
    })
  })
}

// score keeping
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

// keeping track of lives
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

draw();
