let countdownTime1, countdownTime2;
let timer1, timer2;
let isPaused1 = true;
let isPaused2 = true;
let selectedTime;

const winner = document.querySelector(".winner-display");
const winnerBtn = document.querySelector(".btn-restart");
const winnerText = document.querySelector(".winner");
const timerElement1 = document.getElementById("Timer1");
const timerElement2 = document.getElementById("Timer2");
const gamePage = document.querySelector(".game-page");

function startGame() {
  gamePage.style.display = "none";
  console.log(gamePage.style.display);
  selectedTime = parseInt(document.getElementById("countdownTime").value, 10);
  countdownTime1 = countdownTime2 = selectedTime;
  restartTimer();
  startTimer1();
}

function updateTimer(countdownTime, timerElement, timer, player) {
  let minutes = Math.floor(countdownTime / 60);
  let seconds = countdownTime % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerElement.textContent = `${minutes}:${seconds}`;

  if (countdownTime <= 0) {
    clearInterval(timer);
    timerElement.textContent = "Time's up!";
    winner.style.display = "flex";
    winnerText.textContent = `Player ${player} Wins!`;
    return;
  }

  return countdownTime - 1; // Decrement and return the new time
}

function setCSSVariable(isPlayer1Active) {
  if (isPlayer1Active) {
    document.documentElement.style.setProperty("--current-player", "red"); // Player 1 is active
    document.documentElement.style.setProperty("--waiting-player", "green"); // Player 2 is paused
  } else {
    document.documentElement.style.setProperty("--current-player", "green"); // Player 1 is paused
    document.documentElement.style.setProperty("--waiting-player", "red"); // Player 2 is active
  }
}

// Function to start Player 1's timer and pause Player 2's timer
function startTimer1() {
  if (isPaused2) {
    clearInterval(timer1);
    isPaused2 = false;
    isPaused1 = true;
    setCSSVariable(false);
    timer2 = setInterval(() => {
      countdownTime2 = updateTimer(countdownTime2, timerElement2, timer2, 1);
    }, 1000);
  }
}

function startTimer2() {
  if (isPaused1) {
    clearInterval(timer2);
    isPaused2 = true;
    isPaused1 = false;
    setCSSVariable(true);
    timer1 = setInterval(() => {
      countdownTime1 = updateTimer(countdownTime1, timerElement1, timer1, 2);
    }, 1000);
  }
}

function restartTimer() {
  winner.style.display = "none";
  countdownTime1 = countdownTime2 = selectedTime;
  isPaused1 = true;
  isPaused2 = true;
  clearInterval(timer1);
  clearInterval(timer2);
  setCSSVariable(false);

  // Update timers to initial state
  updateTimer(countdownTime1, timerElement1, timer1, 1);
  updateTimer(countdownTime2, timerElement2, timer2, 2);
}
