const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;
let gameOver = false;
// PLAYER BEHAVIOR TRACKING
let moveLeftCount = 0;
let moveRightCount = 0;
// PLAYER
const player = {
  x: canvas.width / 2 - 10,
  y: canvas.height / 2 - 10,
  size: 20,
  speed: 4
};
// OBSTACLES
const obstacles = [];

// KEY TRACKING
const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});
function spawnObstacle() {
  const size = 20;
  const side = Math.floor(Math.random() * 4);
  let x, y, vx, vy;

  if (side === 0) { x = 0; y = Math.random() * 500; vx = 2; vy = 0; }
  if (side === 1) { x = 480; y = Math.random() * 500; vx = -2; vy = 0; }
  if (side === 2) { x = Math.random() * 500; y = 0; vx = 0; vy = 2; }
  if (side === 3) { x = Math.random() * 500; y = 480; vx = 0; vy = -2; }

  obstacles.push({ x, y, size, vx, vy });
}

// Spawn every second
setInterval(spawnObstacle, 1000);

// UPDATE LOGIC
function update() {
 if (keys["ArrowLeft"]) {
  player.x -= player.speed;
  moveLeftCount++;
}

if (keys["ArrowRight"]) {
  player.x += player.speed;
  moveRightCount++;
}
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;

  // KEEP PLAYER INSIDE CANVAS
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
  obstacles.forEach(o => {
  o.x += o.vx;
  o.y += o.vy;
});
obstacles.forEach(o => {
  if (
  !gameOver &&
  player.x < o.x + o.size &&
  player.x + player.size > o.x &&
  player.y < o.y + o.size &&
  player.y + player.size > o.y
) {
  gameOver = true;
  alert("GAME OVER");
  location.reload();
}
});
}

// DRAW LOGIC
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffe1";
  ctx.shadowColor = "#00ffe1";
  ctx.shadowBlur = 15;

  ctx.fillRect(player.x, player.y, player.size, player.size);
  ctx.shadowColor = "#ff0055";
ctx.shadowBlur = 10;
ctx.fillStyle = "#ff0055";

obstacles.forEach(o => {
  ctx.fillRect(o.x, o.y, o.size, o.size);
});
}

// GAME LOOP
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();