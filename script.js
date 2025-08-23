//initialization or current state of the game
let playerScore=0;
let computerScore=0;
let currentRond=0;
let maxRound=5;
// the computer's choice
function getComputerChoice(){
    const choice =["rock","paper","scissor"];
    return
    choice[Math.floor(Math.random()*choice.length)];
}
//playing one round
function playRound(playerChoice,computerChoice){
    if(playerChoice===computerChoice)
        return "draw!";
    if(
        (playerChoice === "rock" && computerChoice === "scissor" ) || (playerChoice === "paper" && computerChoice === "rock") || (playerChoice === "scissor" && computerChoice === "paper")
    ) return "Win!";
    return "lose";
    }