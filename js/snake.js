// ============================================
// SNAKE GAME - JAVASCRIPT
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let level = 1;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 100;
let gameLoopId = null;

// Display initial high score
document.getElementById('highScoreDisplay').textContent = highScore;

// Game loop
function gameLoop() {
  update();
  draw();
}

// Update game state
function update() {
  direction = nextDirection;

  // Calculate new head position
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  // Check wall collision
  if (newHead.x < 0 || newHead.x >= tileCount || newHead.y < 0 || newHead.y >= tileCount) {
    gameOver();
    return;
  }

  // Check self collision
  if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    gameOver();
    return;
  }

  snake.unshift(newHead);

  // Check food collision
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    level = Math.floor(score / 50) + 1;
    gameSpeed = Math.max(50, 100 - level * 5);

    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('levelDisplay').textContent = level;

    generateFood();
  } else {
    snake.pop();
  }
}

// Draw game
function draw() {
  // Clear canvas
  ctx.fillStyle = 'rgba(5, 8, 18, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= tileCount; i++) {
    const pos = i * gridSize;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(canvas.width, pos);
    ctx.stroke();
  }

  // Draw snake
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Head
      ctx.fillStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10;
    } else {
      ctx.fillStyle = '#00d4ff';
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 5;
    }
    ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
  });

  ctx.shadowColor = 'transparent';

  // Draw food
  ctx.fillStyle = '#ff006e';
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowColor = 'transparent';
}

// Generate food
function generateFood() {
  let newFood;
  let collision;

  do {
    collision = false;
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };

    for (let segment of snake) {
      if (segment.x === newFood.x && segment.y === newFood.y) {
        collision = true;
        break;
      }
    }
  } while (collision);

  food = newFood;
}

// Game over
function gameOver() {
  gameRunning = false;
  clearInterval(gameLoopId);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
    document.getElementById('highScoreDisplay').textContent = highScore;
  }

  alert(`Game Over! Your Score: ${score}\nHigh Score: ${highScore}`);
  document.getElementById('startBtn').textContent = 'START GAME';
}

// Start game
document.getElementById('startBtn').addEventListener('click', function() {
  if (!gameRunning) {
    gameRunning = true;
    gamePaused = false;
    this.textContent = 'RESUME';
    document.getElementById('pauseBtn').textContent = 'PAUSE';

    gameLoopId = setInterval(() => {
      if (!gamePaused) {
        gameLoop();
      }
    }, gameSpeed);
  }
});

// Pause game
document.getElementById('pauseBtn').addEventListener('click', function() {
  if (gameRunning) {
    gamePaused = !gamePaused;
    this.textContent = gamePaused ? 'RESUME' : 'PAUSE';
  }
});

// Restart game
document.getElementById('restartBtn').addEventListener('click', function() {
  clearInterval(gameLoopId);
  snake = [{ x: 10, y: 10 }];
  food = { x: 15, y: 15 };
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  level = 1;
  gameRunning = false;
  gamePaused = false;
  gameSpeed = 100;

  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('levelDisplay').textContent = level;
  document.getElementById('startBtn').textContent = 'START GAME';
  document.getElementById('pauseBtn').textContent = 'PAUSE';

  draw();
});

// Keyboard controls
document.addEventListener('keydown', function(e) {
  if (!gameRunning) return;

  switch(e.key) {
    case 'ArrowUp':
      if (direction.y === 0) nextDirection = { x: 0, y: -1 };
      e.preventDefault();
      break;
    case 'ArrowDown':
      if (direction.y === 0) nextDirection = { x: 0, y: 1 };
      e.preventDefault();
      break;
    case 'ArrowLeft':
      if (direction.x === 0) nextDirection = { x: -1, y: 0 };
      e.preventDefault();
      break;
    case 'ArrowRight':
      if (direction.x === 0) nextDirection = { x: 1, y: 0 };
      e.preventDefault();
      break;
  }
});

// Initial draw
draw();
