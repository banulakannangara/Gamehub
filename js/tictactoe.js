// ============================================
// TIC TAC TOE GAME - GAMEHUB
// ============================================

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const gameOverModal = document.getElementById('gameOverModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const playAgainBtn = document.getElementById('playAgainBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xWins = parseInt(localStorage.getItem('tictacXWins')) || 0;
let oWins = parseInt(localStorage.getItem('tictacOWins')) || 0;
let draws = parseInt(localStorage.getItem('tictacDraws')) || 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize display
updateScoreDisplay();
statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;

function updateScoreDisplay() {
  document.getElementById('xWins').textContent = xWins;
  document.getElementById('oWins').textContent = oWins;
  document.getElementById('draws').textContent = draws;
}

function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'move') {
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'win') {
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    // Audio context error
  }
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.color = currentPlayer === 'X' ? '#00ff00' : '#ff00ff';
  
  playSound('move');

  checkResult();
}

function checkResult() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') continue;
    if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      declareWinner(gameBoard[a]);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    declareDraw();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function declareWinner(player) {
  gameActive = false;
  playSound('win');
  
  if (player === 'X') {
    xWins++;
    localStorage.setItem('tictacXWins', xWins);
  } else {
    oWins++;
    localStorage.setItem('tictacOWins', oWins);
  }

  updateScoreDisplay();
  
  modalTitle.textContent = `PLAYER ${player} WINS!`;
  modalMessage.textContent = `🎉 Victory! 🎉`;
  gameOverModal.classList.add('active');
}

function declareDraw() {
  gameActive = false;
  draws++;
  localStorage.setItem('tictacDraws', draws);
  updateScoreDisplay();
  
  modalTitle.textContent = 'DRAW!';
  modalMessage.textContent = 'It\'s a Tie!';
  gameOverModal.classList.add('active');
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  gameOverModal.classList.remove('active');
  
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'var(--cyan-glow)';
  });
}

function resetScore() {
  if (confirm('Reset all scores?')) {
    xWins = 0;
    oWins = 0;
    draws = 0;
    localStorage.setItem('tictacXWins', 0);
    localStorage.setItem('tictacOWins', 0);
    localStorage.setItem('tictacDraws', 0);
    updateScoreDisplay();
    resetGame();
  }
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
resetScoreBtn.addEventListener('click', resetScore);
playAgainBtn.addEventListener('click', resetGame);
