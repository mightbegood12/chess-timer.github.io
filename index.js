let countdownTime1 = 20; // 10 minutes for Player 1
let countdownTime2 = 5; // 10 minutes for Player 2
let timer1, timer2; // Store the timer interval IDs for both players
let isPaused1 = true; // Track if Player 1's timer is paused
let isPaused2 = true; // Track if Player 2's timer is paused
const winner = document.querySelector(".winner");

// Function to update Player 1's timer
function updateTimer1() {
  const timerElement1 = document.getElementById("Timer1");
  let minutes = Math.floor(countdownTime1 / 60);
  let seconds = countdownTime1 % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerElement1.textContent = `${minutes}:${seconds}`;

  if (countdownTime1 <= 0) {
    clearInterval(timer1);
    timerElement1.textContent = "Time's up!";
    winner.style.display = "block";
    winner.style.transition = "background 3s";
    winner.textContent = "Player 2 Wins!";
  }

  countdownTime1--; // Decrease time
}

// Function to update Player 2's timer
function updateTimer2() {
  const timerElement2 = document.getElementById("Timer2");
  let minutes = Math.floor(countdownTime2 / 60);
  let seconds = countdownTime2 % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerElement2.textContent = `${minutes}:${seconds}`;

  if (countdownTime2 <= 0) {
    clearInterval(timer2);
    timerElement2.textContent = "Time's up!";
    winner.style.display = "block";
    winner.style.transition = "background 3s";
    winner.textContent = "Player 1 Wins!";
  }

  countdownTime2--; // Decrease time
}

// Helper function to change CSS variable for active/paused states
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
    // Pause Player 2's timer if it's running
    clearInterval(timer1);
    isPaused1 = true;

    // Start Player 1's timer
    isPaused2 = false;
    setCSSVariable(false); // Set CSS for Player 1 active
    timer2 = setInterval(updateTimer2, 1000);
  }
}

// Function to start Player 2's timer and pause Player 1's timer
function startTimer2() {
  if (isPaused1) {
    // Pause Player 1's timer if it's running
    clearInterval(timer2);
    isPaused2 = true;

    // Start Player 2's timer
    isPaused1 = false;
    setCSSVariable(true); // Set CSS for Player 2 active
    timer1 = setInterval(updateTimer1, 1000);
  }
}

// Event listeners for button clicks
document.querySelector(".plyr-1").addEventListener("click", function () {
  if (!isPaused1) {
    startTimer2(); // Switch to Player 2's timer when Player 1's button is clicked
  }
});

document.querySelector(".plyr-2").addEventListener("click", function () {
  if (!isPaused2) {
    startTimer1(); // Switch to Player 1's timer when Player 2's button is clicked
  }
});
