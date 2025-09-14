document.addEventListener("DOMContentLoaded", () => {

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
    { word: "dosed", clue: "Past tense of dose" }
  ];

  let coins = parseInt(localStorage.getItem("coins")) || 0;
  let streak = parseInt(localStorage.getItem("streak")) || 0;
  let currentWord = "";
  let mode = "";

  const coinsEl = document.getElementById("coins");
  const streakEl = document.getElementById("streak");
  const streakProgress = document.getElementById("streak-progress");
  const clueText = document.getElementById("clue-text");
  const guessInput = document.getElementById("guess-input");
  const submitBtn = document.getElementById("submit-btn");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const gameContainer = document.querySelector(".game-container");

  function updateUI() {
    coinsEl.textContent = coins;
    streakEl.textContent = streak;
    streakProgress.style.width = Math.min(streak * 10, 100) + "%";
    localStorage.setItem("coins", coins);
    localStorage.setItem("streak", streak);
  }

  function hideLetters(word) {
    let letters = word.split("");
    const numToHide = Math.ceil(word.length / 2);
    let indices = [];
    while (indices.length < numToHide) {
      let idx = Math.floor(Math.random() * word.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    for (let i of indices) letters[i] = "_";
    return letters.join(" ");
  }

  function newRound() {
    feedbackEl.textContent = "";
    guessInput.value = "";
    nextBtn.style.display = "none";
    submitBtn.disabled = false;
    guessInput.disabled = false;
    
    const item = WORD_LISTS[Math.floor(Math.random() * WORD_LISTS.length)];
    currentWord = item.word.toLowerCase();

    mode = Math.random() < 0.5 ? "clue" : "missing";

    if (mode === "clue") {
      clueText.textContent = "Clue: " + item.clue;
    } else {
      clueText.textContent = "Complete the word: " + hideLetters(item.word);
    }
    
    guessInput.focus();
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
      submitBtn.disabled = true;
      guessInput.disabled = true;
      nextBtn.style.display = "inline-block";
    } else {
      feedbackEl.textContent = "❌ Incorrect. The correct word was: " + currentWord;
      streak = 0;
      gameContainer.classList.add("wrong");
      setTimeout(() => gameContainer.classList.remove("wrong"), 500);
      submitBtn.disabled = true;
      guessInput.disabled = true;
      nextBtn.style.display = "inline-block";
    }
    updateUI();
  }

  submitBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", newRound);
  guessInput.addEventListener("keydown", (e) => { 
    if (e.key === "Enter") {
      checkAnswer();
    } 
  });

  // Initialize
  updateUI();
  newRound();

});
