//initialization or current state of the game
let playerScore=0;
let computerScore=0;
let currentRound=0;
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
    //update score
    function updateScore(result){
        if(result === "win") playerScore++;
        else if(result === "lose" ) computerScore++;

        document.getElementById("player-score").innerText=playerScore;
        document.getElementById("computer-score").innerText=computerScore;
        document.getElementById("current-round").innerText=currentRound;
        document.getElementById("result").innerText= 'you $(result)';
    }
    function restartGame(){
        playerScore=0;
        computerScore=0;
        currentRound=0;

        document.getElementById("player-score").innerText=playerScore;
        document.getElementById("computer-score").innerText=computerScore;
        document.getElementById("current-round").innerText=currentRound;

        document.getElementById("result").innerText="";
    }