// -------------------------
// Word Lists with Clues
// -------------------------
const WORD_LISTS = [
  { word: "jumped", clue: "Past tense of jump" },
  { word: "walked", clue: "Past tense of walk" },
  { word: "looked", clue: "Past tense of look" },
  { word: "planned", clue: "Past tense of plan" },
  { word: "typed", clue: "Past tense of type" },
  { word: "smiled", clue: "Past tense of smile" },
  { word: "chatted", clue: "Past tense of chat" },
  { word: "dropped", clue: "Past tense of drop" },
  { word: "owned", clue: "Past tense of own" },
  { word: "dosed", clue: "Past tense of dose" },

  { word: "went", clue: "Past tense of go" },
  { word: "came", clue: "Past tense of come" },
  { word: "built", clue: "Past tense of build" },
  { word: "thought", clue: "Past tense of think" },
  { word: "ran", clue: "Past tense of run" },
  { word: "saw", clue: "Past tense of see" },
  { word: "wrote", clue: "Past tense of write" },
  { word: "took", clue: "Past tense of take" },
  { word: "ate", clue: "Past tense of eat" },
  { word: "spoke", clue: "Past tense of speak" }
  // (add more with clues if you like)
];

// -------------------------
// Game State
// -------------------------
let coins = parseInt(localStorage.getItem("coins")) || 0;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let currentWord = "";
let mode = ""; // "clue" or "audio"

// -------------------------
// DOM Elements
// -------------------------
const coinsEl = document.getElementById("coins");
const streakEl = document.getElementById("streak");
const streakProgress = document.getElementById("streak-progress");
const clueText = document.getElementById("clue-text");
const audioBtn = document.getElementById("audio-btn");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const gameContainer = document.querySelector(".game-container");

// -------------------------
// Init
// -------------------------
updateUI();
newRound();

// -------------------------
// Functions
// -------------------------
function updateUI() {
  coinsEl.textContent = coins;
  streakEl.textContent = streak;
  streakProgress.style.width = Math.min(streak * 10, 100) + "%";
  localStorage.setItem("coins", coins);
  localStorage.setItem("streak", streak);
}

function newRound() {
  feedbackEl.textContent = "";
  guessInput.value = "";
  nextBtn.style.display = "none";

  // Pick a random word
  const item = WORD_LISTS[Math.floor(Math.random() * WORD_LISTS.length)];
  currentWord = item.word.toLowerCase();

  // Random mode
  mode = Math.random() < 0.5 ? "clue" : "audio";

  if (mode === "clue") {
    clueText.textContent = "Clue: " + item.clue;
    audioBtn.style.display = "none";
  } else {
    clueText.textContent = "Listen to the word!";
    audioBtn.style.display = "inline-block";
  }
}

function checkAnswer() {
  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) return;

  if (guess === currentWord) {
    feedbackEl.textContent = "✅ Correct!";
    coins += 10;
    streak++;
    gameContainer.classList.add("correct");
    setTimeout(() => gameContainer.classList.remove("correct"), 1000);
  } else {
    feedbackEl.textContent = "❌ Try again!";
    streak = 0;
    gameContainer.classList.add("wrong");
    setTimeout(() => gameContainer.classList.remove("wrong"), 500);
  }
  updateUI();
  nextBtn.style.display = "inline-block";
}

function speakWord() {
  const utterance = new SpeechSynthesisUtterance(currentWord);
  speechSynthesis.speak(utterance);
}

// -------------------------
// Event Listeners
// -------------------------
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", newRound);
audioBtn.addEventListener("click", speakWord);

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkAnswer();
});
