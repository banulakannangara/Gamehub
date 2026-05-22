// ============================================
// GUESS THE NUMBER - JAVASCRIPT
// ============================================

let secretNumber = 0;
let attempts = 0;
let gameActive = true;
let low = 1;
let high = 100;
let bestScore = parseInt(localStorage.getItem('guessNumberBestScore')) || Infinity;

// Display initial best score
if (bestScore === Infinity) {
  document.getElementById('bestScoreDisplay').textContent = '∞';
} else {
  document.getElementById('bestScoreDisplay').textContent = bestScore;
}

// Initialize game
function startNewGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameActive = true;
  low = 1;
  high = 100;

  document.getElementById('attemptsDisplay').textContent = attempts;
  document.getElementById('rangeDisplay').textContent = low + '-' + high;
  document.getElementById('feedbackMessage').textContent = 'Make a guess to start!';
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').focus();
}

// Guess button click
document.getElementById('guessBtn').addEventListener('click', function() {
  if (!gameActive) return;

  const guess = parseInt(document.getElementById('guessInput').value);
  document.getElementById('guessInput').value = '';

  if (isNaN(guess) || guess < low || guess > high) {
    document.getElementById('feedbackMessage').textContent = `❌ Please enter a number between ${low} and ${high}!`;
    return;
  }

  attempts++;
  document.getElementById('attemptsDisplay').textContent = attempts;

  if (guess === secretNumber) {
    document.getElementById('feedbackMessage').textContent = `🎉 CORRECT! You found it in ${attempts} attempts!`;
    gameActive = false;

    // Update best score
    if (attempts < bestScore) {
      bestScore = attempts;
      localStorage.setItem('guessNumberBestScore', bestScore);
      document.getElementById('bestScoreDisplay').textContent = bestScore;
      document.getElementById('feedbackMessage').textContent += `\n✨ NEW BEST SCORE! ✨`;
    }
  } else if (guess < secretNumber) {
    low = Math.max(low, guess + 1);
    document.getElementById('feedbackMessage').textContent = `📈 Too Low! Try Higher (Range: ${low}-${high})`;
    document.getElementById('rangeDisplay').textContent = low + '-' + high;
  } else {
    high = Math.min(high, guess - 1);
    document.getElementById('feedbackMessage').textContent = `📉 Too High! Try Lower (Range: ${low}-${high})`;
    document.getElementById('rangeDisplay').textContent = low + '-' + high;
  }

  document.getElementById('guessInput').focus();
});

// New game button
document.getElementById('newGameBtn').addEventListener('click', function() {
  startNewGame();
});

// Show answer button
document.getElementById('showAnswerBtn').addEventListener('click', function() {
  if (gameActive) {
    document.getElementById('feedbackMessage').textContent = `The answer was ${secretNumber}. Game Over!`;
    gameActive = false;
  }
});

// Allow Enter key to submit guess
document.getElementById('guessInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('guessBtn').click();
  }
});

// Start the game on page load
startNewGame();
