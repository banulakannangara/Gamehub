// ============================================
// CLICK SPEED TEST - GAMEHUB
// ============================================

let timeLeft = 10;
let clicks = 0;
let bestScore = localStorage.getItem('clickBest') || 0;
let isRunning = false;
let startTime = 0;
let timerInterval = null;

const clickZone = document.getElementById('clickZone');
const startBtn = document.getElementById('startBtn');
const retryBtn = document.getElementById('retryBtn');
const timer = document.getElementById('timer');
const clicksDisplay = document.getElementById('clicks');
const bestDisplay = document.getElementById('best');
const cpsDisplay = document.getElementById('cps');
const gameOverModal = document.getElementById('gameOver');
const finalClicksDisplay = document.getElementById('finalClicks');

bestDisplay.textContent = bestScore;

function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'complete') {
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {}
}

function startTest() {
  if (isRunning) return;
  
  isRunning = true;
  timeLeft = 10;
  clicks = 0;
  startTime = Date.now();
  clicksDisplay.textContent = '0';
  cpsDisplay.textContent = '0';
  startBtn.disabled = true;
  startBtn.style.opacity = '0.5';
  clickZone.style.pointerEvents = 'auto';

  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

function endTest() {
  isRunning = false;
  clearInterval(timerInterval);
  clickZone.style.pointerEvents = 'none';
  
  playSound('complete');

  if (clicks > bestScore) {
    bestScore = clicks;
    localStorage.setItem('clickBest', bestScore);
    bestDisplay.textContent = bestScore;
  }

  finalClicksDisplay.textContent = clicks;
  gameOverModal.classList.add('active');
  startBtn.disabled = false;
  startBtn.style.opacity = '1';
}

clickZone.addEventListener('click', () => {
  if (!isRunning) return;
  
  clicks++;
  clicksDisplay.textContent = clicks;
  
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  const cpsValue = (clicks / elapsedSeconds).toFixed(2);
  cpsDisplay.textContent = cpsValue;

  playSound('click');

  // Visual feedback
  clickZone.classList.add('active');
  setTimeout(() => clickZone.classList.remove('active'), 100);
});

startBtn.addEventListener('click', startTest);
retryBtn.addEventListener('click', () => {
  gameOverModal.classList.remove('active');
  startTest();
});
