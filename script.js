document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
        if (currentRound >= maxRound) return;

        const playerChoice = button.dataset.choice;
        const computerChoice = getComputerChoice();

        // show fists 👊 first
        document.getElementById("player-hand").innerText = "👊";
        document.getElementById("computer-hand").innerText = "👊";

        // add shaking animation
        document.getElementById("player-hand").classList.add("hand");
        document.getElementById("computer-hand").classList.add("hand");

        // after shake, reveal real choices
        setTimeout(() => {
            document.getElementById("player-hand").classList.remove("hand");
            document.getElementById("computer-hand").classList.remove("hand");

            document.getElementById("player-hand").innerText = choiceEmojis[playerChoice];
            document.getElementById("computer-hand").innerText = choiceEmojis[computerChoice];

            const result = playRound(playerChoice, computerChoice);
            currentRound++;
            updateScore(result, playerChoice, computerChoice);

            if (currentRound >= maxRound) {
                let finalMessage = "";
                if (playerScore > computerScore) finalMessage = "🎉 You are the Champion!";
                else if (playerScore < computerScore) finalMessage = "🤖 Computer Wins the Match!";
                else finalMessage = "😐 It's a Tie Overall!";

                setTimeout(() => alert(finalMessage), 300);
            }
        }, 1200); // delay to match shake duration
    });
});