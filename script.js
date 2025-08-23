let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let maxRound = 5;

// map choices to emojis
const choiceEmojis = {
    rock: "🪨",
    paper: "📄",
    scissor: "✂️"
};

// get computer choice
function getComputerChoice() {
    const choice = ["rock", "paper", "scissor"];
    return choice[Math.floor(Math.random() * choice.length)];
}

// play one round
function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "draw";

    if (
        (playerChoice === "rock" && computerChoice === "scissor") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissor" && computerChoice === "paper")
    ) return "player";

    return "computer";
}

// update score and show result
function updateScore(result, playerChoice, computerChoice) {
    let message = `You chose ${choiceEmojis[playerChoice]}, Computer chose ${choiceEmojis[computerChoice]} →` ;

    if (result === "player") {
        playerScore++;
        message += "You Won 🎉";
        document.getElementById("result").style.color = "green";
    } else if (result === "computer") {
        computerScore++;
        message += "Computer Won 🤖";
        document.getElementById("result").style.color = "red";
    } else {
        message += "It's a Draw 😐";
        document.getElementById("result").style.color = "orange";
    }

    document.getElementById("player-score").innerText = playerScore;
    document.getElementById("computer-score").innerText = computerScore;
    document.getElementById("current-round").innerText = currentRound;
    document.getElementById("result").innerText = message;
}

// restart game
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;
    document.getElementById("player-score").innerText = playerScore;
    document.getElementById("computer-score").innerText = computerScore;
    document.getElementById("current-round").innerText = currentRound;
    document.getElementById("result").innerText = "";
    document.getElementById("player-hand").innerText = "👊";
    document.getElementById("computer-hand").innerText = "👊";
}

// button click events
document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
        if (currentRound >= maxRound) return;

        const playerChoice = button.dataset.choice;
        const computerChoice = getComputerChoice();

        // show fists first
        document.getElementById("player-hand").innerText = "👊";
        document.getElementById("computer-hand").innerText = "👊";
        document.getElementById("player-hand").classList.add("hand");
        document.getElementById("computer-hand").classList.add("hand");

        // reveal choices after shake
        setTimeout(() => {
            document.getElementById("player-hand").classList.remove("hand");
            document.getElementById("computer-hand").classList.remove("hand");

            document.getElementById("player-hand").innerText = choiceEmojis[playerChoice];
            document.getElementById("computer-hand").innerText = choiceEmojis[computerChoice];

            currentRound++;
            updateScore(playRound(playerChoice, computerChoice), playerChoice, computerChoice);

            if (currentRound >= maxRound) {
                let finalMessage = "";
                if (playerScore > computerScore) finalMessage = "🎉 You are the Champion!";
                else if (playerScore < computerScore) finalMessage = "🤖 Computer Wins the Match!";
                else finalMessage = "😐 It's a Tie Overall!";

                setTimeout(() => alert(finalMessage), 300);
            }
        }, 1200);
    });
});

// round selection
document.getElementById("round5").addEventListener("click", () => (maxRound = 5));
document.getElementById("round7").addEventListener("click", () => (maxRound = 7));

// restart button
document.getElementById("restart").addEventListener("click", restartGame);
const infoBtn=document.getElementById("info-btn");
const infoPopUp=document.getElementById("info-popup");
const closeInfo=document.getElementById("close-info");
infoBtn.addEventListener("click",()=>{
    infoPopUp.classList.remove("hidden");
});
closeInfo.addEventListener("click",()=>{
    infoPopUp.classList.add("hidden");
});