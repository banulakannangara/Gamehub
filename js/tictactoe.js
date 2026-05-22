// ============================================
// TIC TAC TOE GAME - JAVASCRIPT
// ============================================

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let xWins = parseInt(localStorage.getItem('tictactoeXWins')) || 0;
let oWins = parseInt(localStorage.getItem('tictactoeOWins')) || 0;

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

// Display initial scores
document.getElementById('xWins').textContent = xWins;
document.getElementById('oWins').textContent = oWins;

// Get all cells
const cells = document.querySelectorAll('.cell');

// Add click event to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

// Handle cell click
function handleCellClick(index) {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  // Check for winner
  const winner = checkWinner();
  if (winner) {
    document.getElementById('statusMessage').textContent = `Player ${winner} Wins! 🎉`;
    gameActive = false;

    if (winner === 'X') {
      xWins++;
    } else {
      oWins++;
    }

    document.getElementById('xWins').textContent = xWins;
    document.getElementById('oWins').textContent = oWins;

    localStorage.setItem('tictactoeXWins', xWins);
    localStorage.setItem('tictactoeOWins', oWins);

    return;
  }

  // Check for draw
  if (board.every(cell => cell !== '')) {
    document.getElementById('statusMessage').textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById('currentPlayer').textContent = currentPlayer;
  document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;
}

// Check winner
function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === '' || board[b] === '' || board[c] === '') continue;
    if (board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Reset game
document.getElementById('resetBtn').addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => cell.textContent = '');
  document.getElementById('currentPlayer').textContent = currentPlayer;
  document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;
});

// Reset score
document.getElementById('resetScoreBtn').addEventListener('click', () => {
  xWins = 0;
  oWins = 0;

  document.getElementById('xWins').textContent = xWins;
  document.getElementById('oWins').textContent = oWins;

  localStorage.setItem('tictactoeXWins', xWins);
  localStorage.setItem('tictactoeOWins', oWins);
});
