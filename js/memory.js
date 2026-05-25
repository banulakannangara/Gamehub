// ============================================
// MEMORY CARD GAME - GAMEHUB
// ============================================

const emojis = ['🚀', '🚀', '🎮', '🎮', '⭐', '⭐', '🎨', '🎨', '💎', '💎', '🔥', '🔥', '🎯', '🎯', '✨', '✨'];
let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let gameActive = true;
let bestScore = localStorage.getItem('memoryBest') || 0;
let matchedPairs = 0;

const gameGrid = document.getElementById('gameGrid');
const movesDisplay = document.getElementById('moves');
const matchedDisplay = document.getElementById('matched');
const bestScoreDisplay = document.getElementById('bestScore');
const gameOverModal = document.getElementById('gameOver');
const finalMovesDisplay = document.getElementById('finalMoves');
const newGameBtn = document.getElementById('newGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

bestScoreDisplay.textContent = bestScore;

function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'flip') {
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'match') {
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'complete') {
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {}
}

function initGame() {
  cards = [...emojis].sort(() => Math.random() - 0.5);
  flipped = [];
  matched = [];
  moves = 0;
  gameActive = true;
  matchedPairs = 0;

  movesDisplay.textContent = '0';
  matchedDisplay.textContent = '0/8';
  gameOverModal.classList.remove('active');

  renderCards();
}

function renderCards() {
  gameGrid.innerHTML = '';

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.index = index;

    if (flipped.includes(index) || matched.includes(index)) {
      card.classList.add('flipped');
      card.textContent = emoji;
      if (matched.includes(index)) card.classList.add('matched');
    }

    card.addEventListener('click', () => flipCard(index));
    gameGrid.appendChild(card);
  });
}

function flipCard(index) {
  if (!gameActive || flipped.includes(index) || matched.includes(index) || flipped.length >= 2) return;

  flipped.push(index);
  playSound('flip');
  renderCards();

  if (flipped.length === 2) {
    gameActive = false;
    moves++;
    movesDisplay.textContent = moves;

    const [first, second] = flipped;
    if (cards[first] === cards[second]) {
      playSound('match');
      matched.push(first, second);
      matchedPairs++;
      matchedDisplay.textContent = `${matchedPairs}/8`;
      flipped = [];
      gameActive = true;

      if (matchedPairs === 8) {
        endGame();
      } else {
        renderCards();
      }
    } else {
      setTimeout(() => {
        flipped = [];
        gameActive = true;
        renderCards();
      }, 600);
    }
  }
}

function endGame() {
  playSound('complete');

  if (bestScore === 0 || moves < bestScore) {
    bestScore = moves;
    localStorage.setItem('memoryBest', bestScore);
    bestScoreDisplay.textContent = bestScore;
  }

  finalMovesDisplay.textContent = moves;
  gameOverModal.classList.add('active');
}

newGameBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

initGame();
