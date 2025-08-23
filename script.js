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
    console.log("player chose :", playerChoice);
    console.log("computer chose :", computerChoice);
    if(playerChoice === computerChoice)
        console.log("Result: Draw");
        return "draw!";
    if(
        (playerChoice === "rock" && computerChoice === "scissor" ) || (playerChoice === "paper" && computerChoice === "rock") || (playerChoice === "scissor" && computerChoice === "paper")
    ){ console.log("Result:player win");
        return "player";
    }
    console.log("Result:computer win");
    return "computer";
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
    //event listener
    document.querySelectorAll(".choice").forEach( button=>{
        button.addEventListener("click", ()=>{
            if(currentRound >= maxRound)
                return;
            const playerChoice=button.dataset.choice;
            const computerChoice=getComputerChoice();
            const result=playRound(playerChoice , computerChoice);
            currentRound++;
            updateScore(result);
            if(currentRound>= maxRound)
                setTimeout(()=>alert("Game Over") , 50);
        });
    });
    //round selection
    document.getElementById("round5" ).addEventListener("click" , ()=> (maxRound=5));
    document.getElementById("round7" ).addEventListener("click" , ()=> (maxRound=7));
    document.getElementById("restart").addEventListener("click" , restartGame);