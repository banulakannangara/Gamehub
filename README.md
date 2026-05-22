# GameHub - Cyberpunk Arcade Gaming Platform

A complete arcade gaming website featuring 5 fully playable mini games with a cyberpunk neon UI design.

## 📁 Project Structure

```
GameHub/
├── index.html              # Main homepage
├── main.js                 # Homepage interactions
├── style.css               # Global cyberpunk styling
├── games/                  # Game pages folder
│   ├── snake.html         # Snake Game
│   ├── tictactoe.html     # Tic Tac Toe
│   ├── clickspeed.html    # Click Speed Test
│   ├── guessnum.html      # Guess the Number
│   └── memory.html        # Memory Card Game
├── js/                     # Game logic files
│   ├── snake.js
│   ├── tictactoe.js
│   ├── clickspeed.js
│   ├── guessnum.js
│   └── memory.js
└── assets/                 # Optional assets folder
```

## 🎮 Games Included

### 1. **Snake Game** 🐍
- Classic snake gameplay with cyberpunk styling
- **Controls**: Arrow keys to move
- **Features**:
  - Food system with collision detection
  - Score counter and level progression
  - Speed increases with difficulty
  - Restart button
  - High score saved to localStorage
- **File**: `games/snake.html` + `js/snake.js`

### 2. **Tic Tac Toe** ⭕
- Two-player strategy game
- **Features**:
  - Win detection for both players
  - Draw detection
  - Score tracking (wins saved)
  - Reset game and score buttons
  - Alternative: Can be modified for AI opponent
- **File**: `games/tictactoe.html` + `js/tictactoe.js`

### 3. **Click Speed Test** ⚡
- Test your reflexes in 10 seconds
- **Features**:
  - 10-second countdown timer
  - Click counter
  - Visual feedback on clicks
  - High score tracking
  - Result screen with performance stats
- **File**: `games/clickspeed.html` + `js/clickspeed.js`

### 4. **Guess the Number** 🎲
- Guess a hidden number between 1-100
- **Features**:
  - Hint system (too high / too low)
  - Attempt counter
  - Dynamic range narrowing
  - Best score tracking
  - Show answer button
  - Enter key support
- **File**: `games/guessnum.html` + `js/guessnum.js`

### 5. **Memory Card Game** 🧠
- Flip cards and match pairs
- **Features**:
  - 16 cards (8 matching pairs)
  - Move counter
  - Matched pairs counter
  - Best score tracking
  - Smooth flip animations
  - Green highlight for matched pairs
- **File**: `games/memory.html` + `js/memory.js`

## 🎨 Design Features

### Cyberpunk UI
- **Color Scheme**:
  - Primary Purple: `#8b00ff`
  - Cyan Glow: `#00d4ff`
  - Neon Blue: `#0066ff`
  - Dark Background: `#0a0e27`

### Visual Effects
- ✨ Glitch text animation on titles
- 📺 Animated scanlines overlay
- 🌟 Neon glow box shadows
- ⚡ Smooth hover transitions
- 💥 Ripple effects on buttons
- 🎬 Card animations on load

### Responsive Design
- ✅ Desktop optimized (full responsive)
- ✅ Tablet friendly (768px breakpoint)
- ✅ Mobile optimized (480px breakpoint)
- ✅ Touch-friendly buttons

## 🚀 How to Use

### Getting Started
1. Open `index.html` in a web browser
2. Browse the game cards on the homepage
3. Click "Play Now" on any game card
4. Start playing!

### Navigation
- **Back to Home**: Click the "← Back Home" button on any game page
- **Smooth Scrolling**: Navigation links use smooth scroll behavior
- **Link Navigation**: Use header buttons to navigate between sections

## 💾 Local Storage Features

Games save scores to browser's localStorage:
- **Snake Game**: `snakeHighScore`
- **Tic Tac Toe**: `tictactoeXWins`, `tictactoeOWins`
- **Click Speed Test**: `clickSpeedHighScore`
- **Guess the Number**: `guessNumberBestScore`
- **Memory Card Game**: `memoryBestScore`

Clear browser cache or use "Reset Score" buttons to reset scores.

## ⚙️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Animations, gradients, flexbox, grid
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Score persistence

### Browser Compatibility
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

### Performance
- Lightweight: All games use vanilla JS (no dependencies)
- Fast loading: No external libraries
- Smooth animations: CSS3 + requestAnimationFrame
- Optimized canvas rendering for Snake game

## 🎯 Code Quality

### Features
- ✅ Clean, readable code with comments
- ✅ Beginner-friendly JavaScript
- ✅ Consistent naming conventions
- ✅ Modular file structure
- ✅ DRY principles applied
- ✅ Proper error handling

### File Organization
- Central CSS file for all styling
- Separate JS files for each game
- Common style classes for reusability
- Logical folder structure

## 🔧 Customization Guide

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
  --primary-purple: #8b00ff;
  --secondary-purple: #d946ef;
  --cyan-glow: #00d4ff;
  /* ... other variables ... */
}
```

### Modify Game Speed
- **Snake Game**: Change `gameSpeed` variable in `js/snake.js`
- **Click Speed Test**: Change timer value (currently 10 seconds)
- **Memory Game**: Adjust flip animation timing in CSS

### Add More Games
1. Create new HTML file in `games/` folder
2. Create corresponding JS file in `js/` folder
3. Add game card to `index.html`
4. Link to your new game page

## 🐛 Troubleshooting

### Games not loading
- Check browser console for errors (F12)
- Verify file paths are correct
- Ensure relative paths start with `../`

### Scores not saving
- Check if localStorage is enabled in browser
- Try clearing browser cache
- Use private/incognito mode to test

### Animations not working
- Verify CSS file is loaded
- Check browser supports CSS3 animations
- Try different browser

## 📝 Future Enhancement Ideas

- Add AI opponent for Tic Tac Toe
- Add sound effects using Web Audio API
- Create leaderboard system
- Add difficulty settings
- Implement game timers
- Add achievement system
- Create more game variations
- Add tutorial/help system

## 📄 License

Free to use and modify for personal and educational projects.

---

**Built with ❤️ using vanilla HTML, CSS & JavaScript**

Enjoy the games! 🎮⚡
