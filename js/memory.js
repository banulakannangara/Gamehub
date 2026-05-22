// ============================================
// MEMORY CARD GAME - JAVASCRIPT
// ============================================

const emojis = ['🎮', '🎮', '🎯', '🎯', '⭐', '⭐', '🎪', '🎪', '🎨', '🎨', '🎭', '🎭', '🎸', '🎸', '🎲', '🎲'];
let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let gameActive = true;
let bestScore = parseInt(localStorage.getItem('memoryBestScore')) || Infinity;
let matchedPairs = 0;

// Display initial best score
if (bestScore === Infinity) {
  document.getElementById('bestScoreDisplay').textContent = '∞';
} else {
  document.getElementById('bestScoreDisplay').textContent = bestScore;
}

// Initialize game
function initGame() {
  cards = [...emojis].sort(() => Math.random() - 0.5);
  flipped = [];
  matched = [];
  moves = 0;
  gameActive = true;
  matchedPairs = 0;

  document.getElementById('movesDisplay').textContent = moves;
  document.getElementById('matchedDisplay').textContent = matchedPairs + '/8';
  document.getElementById('resultMessage').textContent = '';

  renderCards();
}

// Render cards
function renderCards() {
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = '';

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.index = index;

    if (flipped.includes(index) || matched.includes(index)) {
      card.classList.add('flipped');
      card.textContent = emoji;
    }

    if (matched.includes(index)) {
      card.classList.add('matched');
    }

    card.addEventListener('click', () => flipCard(index));
    grid.appendChild(card);
  });
}

// Flip card
function flipCard(index) {
  if (!gameActive || flipped.includes(index) || matched.includes(index)) return;

  flipped.push(index);
  renderCards();

  if (flipped.length === 2) {
    checkMatch();
  }
}

// Check match
function checkMatch() {
  moves++;
  document.getElementById('movesDisplay').textContent = moves;

  const [first, second] = flipped;

  if (cards[first] === cards[second]) {
    matched.push(first, second);
    matchedPairs++;
    document.getElementById('matchedDisplay').textContent = matchedPairs + '/8';

    flipped = [];
    renderCards();

    // Check if game won
    if (matchedPairs === 8) {
      gameActive = false;
      document.getElementById('resultMessage').textContent = `🎉 YOU WON! 🎉\nCompleted in ${moves} moves!`;

      // Update best score
      if (moves < bestScore) {
        bestScore = moves;
        localStorage.setItem('memoryBestScore', bestScore);
        document.getElementById('bestScoreDisplay').textContent = bestScore;
        document.getElementById('resultMessage').textContent += `\n✨ NEW BEST SCORE! ✨`;
      }
    }
  } else {
    setTimeout(() => {
      flipped = [];
      renderCards();
    }, 1000);
  }
}

// New game button
document.getElementById('newGameBtn').addEventListener('click', function() {
  initGame();
});

// Reset score button
document.getElementById('resetScoreBtn').addEventListener('click', function() {
  bestScore = Infinity;
  localStorage.removeItem('memoryBestScore');
  document.getElementById('bestScoreDisplay').textContent = '∞';
  initGame();
});

// Start the game on page load
initGame();
