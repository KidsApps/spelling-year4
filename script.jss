// ---------------------------
// Spelling Game — script.js
// ---------------------------


// WORD LISTS (grouped by difficulty)
const WORD_LISTS = {
easy: [
'went','came','ran','saw','ate','took','wrote','spoke','built','thought'
],
medium: [
'jumped','walked','looked','planned','typed','smiled','chatted','dropped','owned','dosed'
],
ing: [
'jumping','walking','cooking','baking','moving','hoping','smiling','chatting','planning','closing',
'running','swimming','sitting','dropping','stopping','beginning','forgetting','admitting','traveling','cancelling'
],
ateify: [
'generate','activate','celebrate','illustrate','navigate','dominate','create','vibrate','radiate','imitate'
],
enify: [
'darken','sharpen','loosen','strengthen','shorten','frighten','flatten','widen','fasten','moisten'
],
ify: [
'terrify','beautify','liquefy','clarify','simplify','magnify','horrify','notify','pacify'
]
};


// Points by difficulty
const POINTS = { easy:5, medium:10, ing:12, ateify:15, enify:12, ify:18 };
const STREAK_BONUS = 5; // extra points per streak milestone


// DOM elements
const playerNameEl = document.getElementById('playerName');
const difficultyEl = document.getElementById('difficultySelect');
const newWordBtn = document.getElementById('newWordBtn');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const wordMask = document.getElementById('wordMask');
const feedbackEl = document.getElementById('feedback');
const pointsEl = document.getElementById('points');
const streakEl = document.getElementById('streak');
const bestStreakEl = document.getElementById('bestStreak');
const solvedCountEl = document.getElementById('solvedCount');
const displayNameEl = document.getElementById('displayName');
const resetBtn = document.getElementById('resetBtn');
const confettiEl = document.getElementById('confetti');


// Game state
let currentWord = '';
p.textContent = emojis[Math.flo