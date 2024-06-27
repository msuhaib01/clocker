// what data do i actually need?
// miliseconds on count up clock
// milisecods left on count down clock
//
class Time {
  timer;
  constructor() {
    this.start = 0;
  }
  start_timer() {
    let initial = Date.now();
    const timerInterval = setInterval(() => {
      this.start = Date.now() - initial;
      document.getElementById("goal_time").textContent = this.display_time();
    }, 10);
    this.timer = timerInterval;
  }

  stop_timer() {
    clearInterval(this.timer);
  }
  display_time() {
    const mili = this.start;
    const second = Math.floor(mili / 1000);
    const minute = Math.floor(second / 60);
    const hour = Math.floor(minute / 60);
    const print_mili = (mili % 1000).toString().padStart(3, "0");
    const print_second = (second % 60).toString().padStart(2, "0");
    const print_minute = (minute % 60).toString().padStart(2, "0");
    const print_hour = (hour % 24).toString().padStart(2, "0");
    return `${print_hour}:${print_minute}:${print_second}:${print_mili}`;
  }
}

class AppState {
  paused_or_running = "paused";
  previous_data = false;

  constructor() {
    const app_data = JSON.parse(window.localStorage.getItem("data"));
    if (app_data == null) {
      this.previous_data = false;
    } else {
      this.previous_data = true;
    }
  }
}

function handleCounterUpButtonClick() {
  input_field = document.querySelector("counterUpInputId");
  input_field_value = input_field.value;
  if (input_field == "") {
  }
}

function handle_main_button_click() {
  if (appState.previous_data == false) {
    if (appState.paused_or_running == "paused") {
      console.log("HELLO BUTTON");
      time.start_timer();
      appState.paused_or_running = "running";
    } else if (appState.paused_or_running == "running") {
      time.stop_timer();
      appState.paused_or_running = "paused";
    }
  }
}

function startUp() {}

const appState = new AppState();
const time = new Time();
console.log("hello world");
console.log(appState.previous_data);
const main_button = document.querySelector("#main_button");
main_button.addEventListener("click", handle_main_button_click);
