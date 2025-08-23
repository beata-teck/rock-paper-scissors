// Game state
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let maxRound = 5;
let playerName = "Player"; // default

const choiceEmojis = { rock:"🪨", paper:"📄", scissor:"✂️" };

// Get computer choice
function getComputerChoice() {
  const choice = ["rock","paper","scissor"];
  return choice[Math.floor(Math.random()*choice.length)];
}

// Play one round
function playRound(playerChoice, computerChoice) {
  if(playerChoice === computerChoice) return "draw";
  if(
    (playerChoice==="rock" && computerChoice==="scissor") ||
    (playerChoice==="paper" && computerChoice==="rock") ||
    (playerChoice==="scissor" && computerChoice==="paper")
  ) return "player";
  return "computer";
}

// Update score and result
function updateScore(result, playerChoice, computerChoice){
  let message = `${playerName} chose ${choiceEmojis[playerChoice]}, Computer chose ${choiceEmojis[computerChoice]} →` ;
  if(result==="player"){ playerScore++; message+=`${playerName} Won 🎉`; document.getElementById("result").style.color="green"; }
  else if(result==="computer"){ computerScore++; message+="Computer Won 🤖"; document.getElementById("result").style.color="red"; }
  else { message+="It's a Draw 😐"; document.getElementById("result").style.color="orange"; }

  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("computer-score").innerText = computerScore;
  document.getElementById("current-round").innerText = currentRound;
  document.getElementById("result").innerText = message;

  // Update player label in scoreboard
  document.getElementById("player-score-label").childNodes[0].textContent = playerName + ": ";
}

// Show round popup
function showRoundResult(message){
  const popup = document.getElementById("round-result-popup");
  const msg = document.getElementById("round-result-message");
  msg.innerText = message;
  popup.classList.add("show");
  setTimeout(()=> popup.classList.remove("show"),1500);
}

// Restart game
function restartGame(){
  playerScore=0; computerScore=0; currentRound=0;
  document.getElementById("player-score").innerText=0;
  document.getElementById("computer-score").innerText=0;
  document.getElementById("current-round").innerText=0;
  document.getElementById("result").innerText="";
  document.getElementById("player-hand").innerText="👊";
  document.getElementById("computer-hand").innerText="👊";

  // Enable choice buttons
  document.querySelectorAll(".choice").forEach(btn => btn.disabled = false);

  // Show name input again
  document.getElementById("player-name-input").style.display = "block";
  playerName = "Player";
}

// Choice button clicks
document.querySelectorAll(".choice").forEach(button=>{
  button.addEventListener("click", ()=>{
    if(currentRound>=maxRound) return;

    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();

    // show fists first
    document.getElementById("player-hand").innerText="👊";
    document.getElementById("computer-hand").innerText="👊";
    document.getElementById("player-hand").classList.add("shake");
    document.getElementById("computer-hand").classList.add("shake");

    setTimeout(()=>{
      document.getElementById("player-hand").classList.remove("shake");
      document.getElementById("computer-hand").classList.remove("shake");

      document.getElementById("player-hand").innerText = choiceEmojis[playerChoice];
      document.getElementById("computer-hand").innerText = choiceEmojis[computerChoice];

      currentRound++;
      const result = playRound(playerChoice, computerChoice);
      updateScore(result, playerChoice, computerChoice);

      // Show round result popup
      let roundMessage = "";
      if(result === "player") roundMessage = `🎉 ${playerName} won this round!`;
      else if(result === "computer") roundMessage = `🤖 Computer won this round!`;
      else roundMessage = "😐 It's a draw!";
      showRoundResult(roundMessage);
      // Show final winner after last round
      if(currentRound >= maxRound){
        // Disable choice buttons
        document.querySelectorAll(".choice").forEach(btn => btn.disabled = true);

        setTimeout(() => {
          let finalMessage = "";
          if(playerScore > computerScore) finalMessage = `🏆 ${playerName} is the Champion!`;
          else if(playerScore < computerScore) finalMessage = "🤖 Computer Wins the Match!";
          else finalMessage = "😐 It's a Tie Overall!";
          showRoundResult(finalMessage);
        }, 1800);
      }
    }, 1200);
  });
});

// Round selection
document.getElementById("round5").addEventListener("click", ()=>maxRound=5);
document.getElementById("round7").addEventListener("click", ()=>maxRound=7);

// Restart button
document.getElementById("restart").addEventListener("click", restartGame);

// Set player name
document.getElementById("setName").addEventListener("click", ()=>{
  const input = document.getElementById("playerName").value.trim();
  if(input) playerName = input;
  document.getElementById("player-name-input").style.display = "none";

  // Update scoreboard label immediately
  document.getElementById("player-score-label").childNodes[0].textContent = playerName + ": ";
});

// Info popup
const infoPopup = document.getElementById("info-popup");
document.getElementById("info-btn").addEventListener("click", ()=> infoPopup.classList.remove("hidden"));
document.getElementById("close-info").addEventListener("click", ()=> infoPopup.classList.add("hidden"));