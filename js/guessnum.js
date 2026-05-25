// ============================================
// GUESS THE NUMBER - GAMEHUB
// ============================================

let secretNumber = 0;
let attempts = 0;
let gameActive = true;
let bestAttempts = localStorage.getItem('guessBest') || 0;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const newGameBtn = document.getElementById('newGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const hintDisplay = document.getElementById('hint');
const attemptsDisplay = document.getElementById('attempts');
const bestDisplay = document.getElementById('bestAttempts');
const gameOverModal = document.getElementById('gameOver');
const finalAttemptsDisplay = document.getElementById('finalAttempts');

bestDisplay.textContent = bestAttempts;

function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'close') {
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'win') {
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {}
}

function startNewGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameActive = true;
  attemptsDisplay.textContent = '0';
  hintDisplay.textContent = 'Start guessing!';
  guessInput.value = '';
  guessInput.focus();
  gameOverModal.classList.remove('active');
}

guessBtn.addEventListener('click', () => {
  if (!gameActive) return;

  const guess = parseInt(guessInput.value);
  guessInput.value = '';

  if (isNaN(guess) || guess < 1 || guess > 100) {
    hintDisplay.textContent = '❌ Enter a number between 1-100';
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {
    gameActive = false;
    playSound('win');
    
    if (bestAttempts === 0 || attempts < bestAttempts) {
      bestAttempts = attempts;
      localStorage.setItem('guessBest', bestAttempts);
      bestDisplay.textContent = bestAttempts;
      hintDisplay.textContent = '🌟 NEW RECORD! 🌟';
    } else {
      hintDisplay.textContent = '🎉 CORRECT!';
    }

    finalAttemptsDisplay.textContent = attempts;
    setTimeout(() => gameOverModal.classList.add('active'), 500);
  } else if (guess < secretNumber) {
    playSound('close');
    hintDisplay.textContent = `📈 TOO LOW! Try higher.`;
  } else {
    playSound('close');
    hintDisplay.textContent = `📉 TOO HIGH! Try lower.`;
  }
});

guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') guessBtn.click();
});

newGameBtn.addEventListener('click', startNewGame);
playAgainBtn.addEventListener('click', startNewGame);

startNewGame();
