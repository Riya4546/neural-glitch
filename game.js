const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

// PLAYER
const player = {
  x: canvas.width / 2 - 10,
  y: canvas.height / 2 - 10,
  size: 20,
  speed: 4
};

// KEY TRACKING
const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// UPDATE LOGIC
function update() {
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;

  // KEEP PLAYER INSIDE CANVAS
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}

// DRAW LOGIC
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffe1";
  ctx.shadowColor = "#00ffe1";
  ctx.shadowBlur = 15;

  ctx.fillRect(player.x, player.y, player.size, player.size);
}

// GAME LOOP
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();