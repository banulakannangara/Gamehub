// ============================================
// GAMEHUB - MAIN.JS (HOMEPAGE)
// ============================================

// Navigate to game page
function goToGame(path) {
  window.location.href = path;
}

// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add card animation on page load
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
  });

  // Add glow effect on card hover
  gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 50px var(--cyan-glow), 0 0 100px var(--primary-purple)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '0 0 20px rgba(139, 0, 255, 0.3)';
    });
  });

  // Add ripple effect on button click
  const playButtons = document.querySelectorAll('.play-btn');
  playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      createRipple(e, this);
    });
  });
});

// Create ripple effect
function createRipple(e, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');

  ripple.style.position = 'absolute';
  ripple.style.background = 'rgba(0, 212, 255, 0.5)';
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none';
  ripple.style.animation = 'rippleAnimation 0.6s ease-out';
  ripple.style.transform = 'scale(0)';

  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes rippleAnimation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Parallax scroll effect
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollPosition = window.pageYOffset;
    hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
});

// Console message
console.log('%c🎮 Welcome to GameHub Arcade! 🎮', 'color: #00d4ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #8b00ff;');
console.log('%cChoose a game and start playing!', 'color: #d946ef; font-size: 14px;');
