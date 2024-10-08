// ROCK PAPER SCISSORS

let playerScore = 0;
let computerScore = 0;

const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const resultDisplay = document.getElementById("resultDisplay");

function playGame(playerChoice) {
  if (playerScore < 10 && computerScore < 10) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    document.getElementById(
      "playerDisplay"
    ).textContent = `PLAYER:${playerChoice}`;
    document.getElementById(
      "computerDisplay"
    ).textContent = `COMPUTER:${computerChoice}`;

    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      playerScore++;
      playerScoreDisplay.textContent = playerScore;
      resultDisplay.textContent = "You Win!";
    } else if (playerChoice === computerChoice) {
      resultDisplay.textContent = "It's a Draw!";
    } else {
      computerScore++;
      computerScoreDisplay.textContent = computerScore;
      resultDisplay.textContent = "Computer Wins!";
    }

    // Checks to see if either score is 10
    if (playerScore === 10 || computerScore === 10) {
      setTimeout(gameOver, 100);
    }
  }
}

function gameOver() {
  const winner = playerScore === 10 ? "Player" : "Computer";
  const gameOverMessage = `Game Over! ${winner} Wins!`;
  resultDisplay.textContent = gameOverMessage;

  const playAgainDiv = document.createElement("div");
  playAgainDiv.innerHTML = `<p>Do you want to play again?</p>
    <button onclick= "resetGame(true)">Yes</button>
    <button onclick= "resetGame(false)">No</button>
    `;
  document.body.appendChild(playAgainDiv);
}

function resetGame(playAgain) {
  if (playAgain) {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = "";

    document.body.removeChild(document.body.lastChild);
  } else {
    resultDisplay.textContent = "Thank you for playing";
  }
}
