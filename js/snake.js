// ============================================
// SNAKE GAME - GAMEHUB
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = canvas.width / GRID_SIZE;

// Game variables
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let bestScore = localStorage.getItem('snakeBestScore') || 0;
let gameRunning = true;
let isPaused = false;
let level = 1;
let gameSpeed = 100;
let soundEnabled = true;

// Update best score display
document.getElementById('bestScore').textContent = bestScore;

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateFood() {
  while (true) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    
    if (!snake.some(segment => segment.x === x && segment.y === y)) {
      return { x, y };
    }
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'eat') {
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'gameOver') {
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // Audio context error
  }
}

// ============================================
// GAME LOGIC
// ============================================

function update() {
  if (!gameRunning || isPaused) return;

  direction = nextDirection;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    endGame();
    return;
  }

  // Check self collision
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    endGame();
    return;
  }

  snake.unshift(head);

  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    playSound('eat');
    document.getElementById('score').textContent = score;
    
    // Increase level every 50 points
    const newLevel = Math.floor(score / 50) + 1;
    if (newLevel > level) {
      level = newLevel;
      gameSpeed = Math.max(50, 100 - (level - 1) * 10);
      document.getElementById('level').textContent = level;
    }

    food = generateFood();
  } else {
    snake.pop();
  }
}

function draw() {
  // Clear canvas with fading effect
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#050812';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  // Draw grid
  ctx.strokeStyle = 'rgba(139, 0, 255, 0.1)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= GRID_SIZE; i++) {
    const pos = i * CELL_SIZE;
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
    const x = segment.x * CELL_SIZE;
    const y = segment.y * CELL_SIZE;

    if (index === 0) {
      // Head - bright cyan
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#00ffff';
    } else {
      // Body - darker purple
      ctx.shadowColor = 'rgba(139, 0, 255, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#8b00ff';
    }

    ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
  });

  // Draw food
  const foodX = food.x * CELL_SIZE;
  const foodY = food.y * CELL_SIZE;
  ctx.shadowColor = '#ff00ff';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#ff00ff';
  ctx.beginPath();
  ctx.arc(foodX + CELL_SIZE / 2, foodY + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = 'transparent';
}

function endGame() {
  gameRunning = false;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('snakeBestScore', bestScore);
    document.getElementById('bestScore').textContent = bestScore;
  }
  
  playSound('gameOver');
  document.getElementById('finalScore').textContent = score;
  document.getElementById('gameOverModal').classList.add('active');
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, gameSpeed);
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('keydown', (e) => {
  switch (e.key) {
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
    case ' ':
      isPaused = !isPaused;
      document.getElementById('pauseBtn').textContent = isPaused ? 'RESUME' : 'PAUSE';
      e.preventDefault();
      break;
  }
});

// Pause Button
document.getElementById('pauseBtn').addEventListener('click', () => {
  if (!gameRunning) return;
  isPaused = !isPaused;
  document.getElementById('pauseBtn').textContent = isPaused ? 'RESUME' : 'PAUSE';
});

// Restart Button
document.getElementById('restartBtn').addEventListener('click', () => {
  location.reload();
});

// Game Over Modal Buttons
document.getElementById('restartGameBtn').addEventListener('click', () => {
  location.reload();
});

// ============================================
// INITIALIZE GAME
// ============================================

gameLoop();
