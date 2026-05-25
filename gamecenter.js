// ============================================
// GAMEHUB - GAME CENTER PAGE
// ============================================

// ============================================
// PARTICLE BACKGROUND ANIMATION
// ============================================

class BackgroundParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 1.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = Math.random() > 0.5 ? '#00d4ff' : '#8b00ff';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1;
  }
}

// ============================================
// PARTICLE SYSTEM SETUP
// ============================================

const particlesContainer = document.getElementById('particles-container');

// Create canvas for particle system
const particleCanvas = document.createElement('canvas');
particleCanvas.style.position = 'fixed';
particleCanvas.style.top = '0';
particleCanvas.style.left = '0';
particleCanvas.style.zIndex = '1';
particleCanvas.style.pointerEvents = 'none';
particlesContainer.appendChild(particleCanvas);

const pCtx = particleCanvas.getContext('2d');
let particles = [];

function resizeParticleCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

resizeParticleCanvas();
window.addEventListener('resize', resizeParticleCanvas);

// Create particles
for (let i = 0; i < 100; i++) {
  particles.push(new BackgroundParticle(particleCanvas));
}

function animateParticles() {
  pCtx.globalAlpha = 0.1;
  pCtx.fillStyle = '#050812';
  pCtx.fillRect(0, 0, particleCanvas.width, particleCanvas.height);
  pCtx.globalAlpha = 1;

  particles.forEach(particle => {
    particle.update();
    particle.draw(pCtx);
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ============================================
// GAME CARD ANIMATIONS
// ============================================

function playGame(path) {
  window.location.href = path;
}

document.addEventListener('DOMContentLoaded', () => {
  const gameCards = document.querySelectorAll('.game-card');

  // Animate cards on page load
  gameCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `slideInCard 0.6s ease-out ${index * 0.1}s forwards`;
  });

  // Add hover glow effect
  gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('card-active');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('card-active');
    });
  });

  // Animate title
  const centerTitle = document.querySelector('.center-title');
  if (centerTitle) {
    centerTitle.style.animation = 'slideInUp 0.8s ease-out';
  }
});

// ============================================
// INTERACTIVE EFFECTS
// ============================================

document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    this.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================
// BACK BUTTON ANIMATION
// ============================================

const backBtn = document.querySelector('.back-button');
if (backBtn) {
  backBtn.addEventListener('mouseenter', () => {
    backBtn.style.textShadow = '0 0 20px #00d4ff';
  });

  backBtn.addEventListener('mouseleave', () => {
    backBtn.style.textShadow = '0 0 10px rgba(139, 0, 255, 0.5)';
  });
}
