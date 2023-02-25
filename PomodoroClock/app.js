const progressCircle = document.querySelector(".progress-circle");
const start = document.querySelector(".start");
const settings = document.querySelector(".settings");
const ring = document.querySelector(".ring");
const inputs = document.querySelectorAll("input");
let minutes = document.querySelector(".minutes > input");
let seconds = document.querySelector(".seconds > input");
const audio = new Audio("alert.wav");
let isDisabled = true;
let intervalID;

// Toggling on/off state of the countdown timer
start.addEventListener("click", (e) => {
  if (e.target.textContent === "start") {
    e.target.textContent = "pause";
    intervalID = setInterval(timer, 1000);
  } else {
    e.target.textContent = "start";
    clearInterval(intervalID);
  }
});

// Start of the timer function
function timer() {
  // set the min and sec equal to the current pomodoro time values
  let min = +minutes.value;
  let sec = +seconds.value;

  // convert the time to seconds and decrement the time by one
  let time = min * 60 + sec - 1;

  min = Math.floor(time / 60);
  sec = time % 60;

  // if sec or min are less than 10 add an extra zero
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  if (time < 0) {
    time = 0;
    return alertUser();
  }

  minutes.value = min;
  seconds.value = sec;
}

function alertUser() {
  ring.classList.add("ending");
  start.textContent = "start";
  audio.play();
  setTimeout(() => {
    //Alert Box would appear before changing circle color so set it in a setTimout
    alert("Time");
    minutes.value = "15";
    seconds.value = "00";
    ring.classList.remove("ending");
  }, 1000);
  clearInterval(intervalID);
}

// Enabling user input when gear icon is toggled
settings.addEventListener("click", () => {
  isDisabled = !isDisabled;
  inputs.forEach((input) => {
    input.disabled = isDisabled;
  });
});
