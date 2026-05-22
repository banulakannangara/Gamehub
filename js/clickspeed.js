// ============================================
// CLICK SPEED TEST - JAVASCRIPT
// ============================================

let clickCount = 0;
let timeRemaining = 10;
let gameActive = false;
let highScore = parseInt(localStorage.getItem('clickSpeedHighScore')) || 0;
let gameTimer = null;

// Display initial high score
document.getElementById('highScore').textContent = highScore;

// Start test
document.getElementById('startBtn').addEventListener('click', function() {
  if (gameActive) return;

  clickCount = 0;
  timeRemaining = 10;
  gameActive = true;

  document.getElementById('clickCount').textContent = clickCount;
  document.getElementById('timerDisplay').textContent = timeRemaining;
  document.getElementById('resultMessage').textContent = '';
  this.disabled = true;

  gameTimer = setInterval(() => {
    timeRemaining--;
    document.getElementById('timerDisplay').textContent = timeRemaining;

    if (timeRemaining <= 0) {
      endTest();
    }
  }, 1000);
});

// Click zone click
document.getElementById('clickZone').addEventListener('click', function(e) {
  if (!gameActive) return;

  clickCount++;
  document.getElementById('clickCount').textContent = clickCount;

  // Visual feedback
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 100);
});

// End test
function endTest() {
  gameActive = false;
  clearInterval(gameTimer);

  // Update high score
  if (clickCount > highScore) {
    highScore = clickCount;
    localStorage.setItem('clickSpeedHighScore', highScore);
    document.getElementById('highScore').textContent = highScore;
    document.getElementById('resultMessage').textContent = `✨ NEW HIGH SCORE! ✨\nYou clicked ${clickCount} times!`;
  } else {
    document.getElementById('resultMessage').textContent = `You clicked ${clickCount} times!\nHigh Score: ${highScore}`;
  }

  document.getElementById('startBtn').disabled = false;
  document.getElementById('startBtn').textContent = 'PLAY AGAIN';
}

// Reset
document.getElementById('resetBtn').addEventListener('click', function() {
  clearInterval(gameTimer);
  gameActive = false;
  clickCount = 0;
  timeRemaining = 10;

  document.getElementById('clickCount').textContent = clickCount;
  document.getElementById('timerDisplay').textContent = timeRemaining;
  document.getElementById('resultMessage').textContent = '';
  document.getElementById('startBtn').disabled = false;
  document.getElementById('startBtn').textContent = 'START TEST';
});
