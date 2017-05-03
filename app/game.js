const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;



function draw() {
  checkBallPosition();
  checkPaddlePosition();
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;
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
      alert("Game Over");
      document.location.reload();
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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);
