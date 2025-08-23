// Game state
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let maxRound = 5;

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
  let message = `You chose ${choiceEmojis[playerChoice]}, Computer chose ${choiceEmojis[computerChoice]} → `;
  if(result==="player"){ playerScore++; message+="You Won 🎉"; document.getElementById("result").style.color="green"; }
  else if(result==="computer"){ computerScore++; message+="Computer Won 🤖"; document.getElementById("result").style.color="red"; }
  else { message+="It's a Draw 😐"; document.getElementById("result").style.color="orange"; }

  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("computer-score").innerText = computerScore;
  document.getElementById("current-round").innerText = currentRound;
  document.getElementById("result").innerText = message;
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

      // Show final winner
      if(currentRound>=maxRound){
        let finalMessage="";
        if(playerScore>computerScore) finalMessage="🎉 You are the Champion!";
        else if(playerScore<computerScore) finalMessage="🤖 Computer Wins the Match!";
        else finalMessage="😐 It's a Tie Overall!";
        showRoundResult(finalMessage);
      }
    },1200);
  });
});

// Round selection
document.getElementById("round5").addEventListener("click", ()=>maxRound=5);
document.getElementById("round7").addEventListener("click", ()=>maxRound=7);

// Restart button
document.getElementById("restart").addEventListener("click",restartGame);
// Info popup
const infoPopup = document.getElementById("info-popup");
document.getElementById("info-btn").addEventListener("click", ()=> infoPopup.classList.remove("hidden"));
document.getElementById("close-info").addEventListener("click", ()=> infoPopup.classList.add("hidden"));