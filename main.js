// ============================================
// GAMEHUB - LANDING PAGE
// ============================================

// ============================================
// PARTICLE SYSTEM
// ============================================

class Particle {
  constructor(x, y, vx, vy, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.vy += 0.1; // gravity
  }

  draw(ctx, opacity) {
    ctx.globalAlpha = (this.life / this.maxLife) * opacity;
    ctx.fillStyle = Math.random() > 0.5 ? '#00d4ff' : '#8b00ff';
    ctx.fillRect(this.x, this.y, 2, 2);
    ctx.globalAlpha = 1;
  }
}

let particles = [];

function createParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.random() * Math.PI * 2);
    const speed = Math.random() * 3 + 1;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 2;
    const life = Math.random() * 40 + 30;
    particles.push(new Particle(x, y, vx, vy, life));
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// ============================================
// NINJA ANIMATION
// ============================================

const canvas = document.getElementById('ninja-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Ninja state
let ninjaState = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  slashing: false,
  slashProgress: 0,
  breathe: 0
};

function drawNinja() {
  const x = ninjaState.x;
  const y = ninjaState.y;
  const breatheAmount = Math.sin(ninjaState.breathe) * 5;

  // Draw ninja silhouette
  ctx.save();
  ctx.fillStyle = '#1a0a2e';
  ctx.globalShadow = '0 0 40px rgba(139, 0, 255, 0.5)';

  // Head
  ctx.beginPath();
  ctx.ellipse(x, y - 40 + breatheAmount, 20, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face mask (red accent)
  ctx.fillStyle = '#ff0050';
  ctx.beginPath();
  ctx.rect(x - 12, y - 35 + breatheAmount, 24, 15);
  ctx.fill();

  // Eyes (glowing)
  ctx.fillStyle = '#00ffff';
  ctx.beginPath();
  ctx.ellipse(x - 6, y - 35 + breatheAmount, 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + 6, y - 35 + breatheAmount, 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = '#1a0a2e';
  ctx.beginPath();
  ctx.rect(x - 18, y - 10 + breatheAmount, 36, 50);
  ctx.fill();

  // Arms
  ctx.beginPath();
  ctx.moveTo(x - 18, y + 10 + breatheAmount);
  ctx.lineTo(x - 35, y + 25 + breatheAmount);
  ctx.strokeStyle = '#4a0080';
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 18, y + 10 + breatheAmount);
  ctx.lineTo(x + 35, y + 25 + breatheAmount);
  ctx.stroke();

  // Legs
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 40 + breatheAmount);
  ctx.lineTo(x - 10, y + 70 + breatheAmount);
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 10, y + 40 + breatheAmount);
  ctx.lineTo(x + 10, y + 70 + breatheAmount);
  ctx.stroke();

  ctx.restore();
}

function drawKatana() {
  const x = ninjaState.x;
  const y = ninjaState.y;
  const breatheAmount = Math.sin(ninjaState.breathe) * 5;

  ctx.save();

  if (ninjaState.slashing) {
    // Slashing animation
    const progress = ninjaState.slashProgress;
    const angle = (progress * Math.PI * 1.5) - (Math.PI * 0.75);

    ctx.translate(x + 25, y + 10 + breatheAmount);
    ctx.rotate(angle);

    // Sword trail (slash effect)
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.lineTo(0, 80);
    ctx.stroke();

    // Sword glow
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 30;
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.lineTo(0, 80);
    ctx.stroke();

    // Main sword blade
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 50;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.lineTo(0, 80);
    ctx.stroke();
  } else {
    // Idle position - right side
    ctx.translate(x + 30, y + 5 + breatheAmount);
    ctx.rotate(Math.PI / 4);

    // Sword trail
    ctx.strokeStyle = 'rgba(139, 0, 255, 0.2)';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.lineTo(0, 80);
    ctx.stroke();

    // Main sword
    ctx.shadowColor = '#8b00ff';
    ctx.shadowBlur = 30;
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.lineTo(0, 80);
    ctx.stroke();

    // Glow
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(-8, -80);
    ctx.lineTo(-8, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(8, -80);
    ctx.lineTo(8, 80);
    ctx.stroke();
  }

  ctx.restore();
}

// ============================================
// ANIMATION LOOP
// ============================================

function animate() {
  // Clear canvas with fade effect (motion blur)
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#050812';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  // Update particles
  updateParticles();
  for (let particle of particles) {
    particle.draw(ctx, 0.8);
  }

  // Breathing animation
  ninjaState.breathe += 0.02;

  // Draw ninja and katana
  drawNinja();
  drawKatana();

  // Update slash animation
  if (ninjaState.slashing) {
    ninjaState.slashProgress += 0.1;
    if (ninjaState.slashProgress >= 1) {
      ninjaState.slashing = false;
      ninjaState.slashProgress = 0;
    }
  }

  requestAnimationFrame(animate);
}

animate();

// ============================================
// SOUND EFFECTS
// ============================================

function playSwordSlashSound() {
  try {
    const now = audioContext.currentTime;
    const duration = 0.3;

    // Create multiple oscillators for complex sword sound
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const osc3 = audioContext.createOscillator();
    const noise = audioContext.createBufferSource();
    
    const gainNode = audioContext.createGain();
    const gainNode2 = audioContext.createGain();
    const gainNode3 = audioContext.createGain();
    
    const filter = audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    // Sword swing sound (high pitch sweep)
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + duration);
    osc1.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // Secondary harmonic
    osc2.frequency.setValueAtTime(400, now);
    osc2.frequency.exponentialRampToValueAtTime(600, now + duration);
    osc2.type = 'triangle';
    
    gainNode2.gain.setValueAtTime(0.1, now);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // Impact sound
    osc3.frequency.setValueAtTime(2000, now);
    osc3.frequency.exponentialRampToValueAtTime(400, now + duration * 0.5);
    osc3.type = 'sawtooth';
    
    gainNode3.gain.setValueAtTime(0.15, now);
    gainNode3.gain.exponentialRampToValueAtTime(0, now + duration * 0.5);

    // Connect nodes
    osc1.connect(gainNode);
    gainNode.connect(filter);
    
    osc2.connect(gainNode2);
    gainNode2.connect(filter);
    
    osc3.connect(gainNode3);
    gainNode3.connect(filter);
    
    filter.connect(audioContext.destination);

    // Start and stop
    osc1.start(now);
    osc1.stop(now + duration);
    
    osc2.start(now);
    osc2.stop(now + duration);
    
    osc3.start(now);
    osc3.stop(now + duration * 0.5);

  } catch (e) {
    console.log('Audio context error:', e);
  }
}

// ============================================
// SCREEN EFFECTS
// ============================================

function screenShake() {
  const flashElement = document.getElementById('flash-effect');
  const container = document.querySelector('.landing-content');

  // Flash effect
  flashElement.style.animation = 'none';
  setTimeout(() => {
    flashElement.style.animation = 'screenFlash 0.4s ease-out';
  }, 10);

  // Shake effect
  const shakeStrength = 15;
  const shakeDuration = 0.4;
  const shakeFrequency = 30;
  const startTime = Date.now();

  function shake() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / (shakeDuration * 1000), 1);

    if (progress < 1) {
      const x = (Math.random() - 0.5) * shakeStrength * (1 - progress);
      const y = (Math.random() - 0.5) * shakeStrength * (1 - progress);
      container.style.transform = `translate(${x}px, ${y}px)`;
      setTimeout(shake, 1000 / shakeFrequency);
    } else {
      container.style.transform = 'translate(0, 0)';
    }
  }

  shake();
}

// ============================================
// BUTTON INTERACTION
// ============================================

const enterBtn = document.getElementById('enter-btn');
const loadingMsg = document.getElementById('loading-msg');

enterBtn.addEventListener('click', function() {
  // Start ninja slash
  ninjaState.slashing = true;
  ninjaState.slashProgress = 0;

  // Play sound
  playSwordSlashSound();

  // Screen effects
  screenShake();

  // Show loading message
  loadingMsg.style.opacity = '1';

  // Transition after animation completes
  setTimeout(() => {
    window.location.href = 'gamecenter.html';
  }, 1000);
});

// ============================================
// MOUSE TRACKING (Optional visual effect)
// ============================================

document.addEventListener('mousemove', (e) => {
  // Subtle mouse-following glow
  const x = e.clientX;
  const y = e.clientY;

  // Randomly create particles near mouse
  if (Math.random() > 0.95) {
    createParticles(x, y, 2);
  }
});

// ============================================
// PAGE ANIMATIONS
// ============================================

window.addEventListener('load', () => {
  const letters = document.querySelectorAll('.letter');
  letters.forEach((letter, index) => {
    letter.style.animation = `glow 2s ease-in-out ${index * 0.1}s infinite`;
  });

  // Animate button
  enterBtn.style.animation = 'pulseGlow 2s ease-in-out infinite';
});
