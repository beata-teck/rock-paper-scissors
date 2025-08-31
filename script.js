// Game state
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let maxRound = 5;
let playerName = "Player"; // default

const choiceEmojis = { rock: "🪨", paper: "📄", scissor: "✂️" };

// Get computer choice
function getComputerChoice() {
  const choice = ["rock", "paper", "scissor"];
  return choice[Math.floor(Math.random() * choice.length)];
}

// Play one round
function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";
  if (
    (playerChoice === "rock" && computerChoice === "scissor") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissor" && computerChoice === "paper")
  ) return "player";
  return "computer";
}

// Update score and result
function updateScore(result, playerChoice, computerChoice) {
  let message = `${playerName} chose ${choiceEmojis[playerChoice]}, Computer chose ${choiceEmojis[computerChoice]} → `;
  const popup = document.getElementById("round-result-popup");
  const popupMessage = document.getElementById("round-result-message");

  if (result === "player") {
    playerScore++;
    message += `${playerName} Won 🎉`;
    document.getElementById("result").style.color = "green";
    popup.style.background = "#d1fae5";
  } else if (result === "computer") {
    computerScore++;
    message += "Computer Won 🤖";
    document.getElementById("result").style.color = "red";
    popup.style.background = "#fee2e2";
  } else {
    message += "It's a Draw 😐";
    document.getElementById("result").style.color = "orange";
    popup.style.background = "#fef3c7";
  }

  // Update scoreboard
  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("computer-score").innerText = computerScore;
  document.getElementById("current-round").innerText = currentRound;
  document.getElementById("result").innerText = message;

  // Update player label
  document.getElementById("player-score-label").childNodes[0].textContent = playerName + ": ";

  // Show round result popup
  popupMessage.innerText = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

// Restart game
function restartGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 0;
  document.getElementById("player-score").innerText = 0;
  document.getElementById("computer-score").innerText = 0;
  document.getElementById("current-round").innerText = 0;
  document.getElementById("result").innerText = "";
  document.getElementById("player-hand").innerText = "👊";
  document.getElementById("computer-hand").innerText = "👊";

  // Enable choice buttons
  document.querySelectorAll(".choice").forEach(btn => btn.disabled = false);

  // Show name input again
  document.getElementById("player-name-input").style.display = "block";
  playerName = "Player";
}

// Choice button clicks
document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    if (currentRound >= maxRound) return;

    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();

    // show fists first
    document.getElementById("player-hand").innerText = "👊";
    document.getElementById("computer-hand").innerText = "👊";
    document.getElementById("player-hand").classList.add("shake");
    document.getElementById("computer-hand").classList.add("shake");

    setTimeout(() => {
      document.getElementById("player-hand").classList.remove("shake");
      document.getElementById("computer-hand").classList.remove("shake");

      document.getElementById("player-hand").innerText = choiceEmojis[playerChoice];
      document.getElementById("computer-hand").innerText = choiceEmojis[computerChoice];

      currentRound++;
      const result = playRound(playerChoice, computerChoice);
      updateScore(result, playerChoice, computerChoice);

      // If last round, show alert with final winner
      if (currentRound >= maxRound) {
        document.querySelectorAll(".choice").forEach(btn => btn.disabled = true);

        setTimeout(() => {
          let finalMessage = "";
          if (playerScore > computerScore) {
            finalMessage = `${playerName}, you won! 🎉`;
          }
          else if (playerScore < computerScore) {
            finalMessage = "Computer won! 🤖";
          }
          else {
            finalMessage = "It's a draw! 😐";
          }

          alert(finalMessage);

        }, 200);
      }
    }, 1200); // fists shake duration
  });
});

// Round selection
const round5Btn = document.getElementById("round5");
if (round5Btn) round5Btn.addEventListener("click", () => maxRound = 5);

const round7Btn = document.getElementById("round7");
if (round7Btn) round7Btn.addEventListener("click", () => maxRound = 7);

// Restart button
const restartBtn = document.getElementById("restart");
if (restartBtn) restartBtn.addEventListener("click", restartGame);

// Set player name
const setNameBtn = document.getElementById("setName");
if (setNameBtn) setNameBtn.addEventListener("click", () => {
  const input = document.getElementById("playerName").value.trim();
  if (input) playerName = input;
  document.getElementById("player-name-input").style.display = "none";
  document.getElementById("player-score-label").childNodes[0].textContent = playerName + ": ";
});

// Info popup
const infoPopup = document.getElementById("info-popup");
const infoBtn = document.getElementById("info-btn");
const closeInfoBtn = document.getElementById("close-info");

if (infoBtn) infoBtn.addEventListener("click", () => infoPopup.classList.remove("hidden"));
if (closeInfoBtn) closeInfoBtn.addEventListener("click", () => infoPopup.classList.add("hidden"));