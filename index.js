let countdownTime1, countdownTime2;
let timer1, timer2;
let isPaused1 = true;
let isPaused2 = true;
let isMuted = false;
let selectedTime;
let gameStarted = false;

const winner = document.querySelector(".winner-display");
const winnerBtn = document.querySelector(".btn-restart");
const winnerText = document.querySelector(".winner");
const timerElement1 = document.getElementById("Timer1");
const timerElement2 = document.getElementById("Timer2");
const gamePage = document.querySelector(".game-page");
const pause_btn = document.querySelector(".pause-btn");

const clock_sound = new Audio("clock-tick-sound.mp3");
const clock_switch_sound = new Audio("clock-switch-sound.mp3");
const theme_sound = new Audio("interstellar.mp3");
clock_sound.volume = 0.4;
theme_sound.loop = true;
theme_sound.volume = 0.5;
theme_sound.autoplay = true;

function startGame() {
  gameStarted = true;
  gamePage.style.display = "none";
  selectedTime = parseInt(document.getElementById("countdownTime").value, 10);
  countdownTime1 = countdownTime2 = selectedTime;
  restartTimer();
  startTimer1();
  theme_sound.volume = 0.2;
  if (gameStarted) {
    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        toggleTimer();
      }
    });
  }
}

function updateTimer(countdownTime, timerElement, timer, player) {
  let minutes = Math.floor(countdownTime / 60);
  let seconds = countdownTime % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerElement.textContent = `${minutes}:${seconds}`;
  clock_sound.play();

  if (countdownTime <= 0) {
    clearInterval(timer);
    timerElement.textContent = "Time's up!";
    winner.style.display = "flex";
    winnerText.textContent = `Player ${player} Wins!`;
    clock_sound.pause();
    gameStarted = false;
    return;
  }

  return countdownTime - 1; // Decrement and return the new time
}

function setCSSVariable(isPlayerActive) {
  if (isPlayerActive) {
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
    clock_switch_sound.play();
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
    clock_switch_sound.play();
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
  clock_sound.pause();
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
  startTimer1();
}

function pauseTimer() {
  isPaused1 = true;
  isPaused2 = true;
  clearInterval(timer1);
  clearInterval(timer2);
  clock_sound.pause();
}

function toggleTheme(event) {
  event.preventDefault();
  const muteButton = document.querySelector(".mute-theme");
  if (isMuted) {
    theme_sound.play();
    muteButton.innerHTML = "&#128266;";
  } else {
    theme_sound.pause();
    muteButton.innerHTML = "&#128263;";
  }
  isMuted = !isMuted;
}

function toggleTimer() {
  if (isPaused2) {
    startTimer1();
  } else if (isPaused1) {
    startTimer2();
  }
}

document.querySelector(".mute-theme").addEventListener("click", toggleTheme);
