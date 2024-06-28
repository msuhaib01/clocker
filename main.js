// what data do i actually need?
// miliseconds on count up clock
// milisecods left on count down clock
//
const elementGoalTimer = document.getElementById("goal_time");
const elementCountDown = document.getElementById("count_down_time");
const main_button = document.querySelector("#main_button");
const reset_button = document.querySelector("#reset_button");

// constants
class Time {
  constructor(to_lose) {
    this.start = 0;
    this.elapsed = 0;
  }
  start_timer() {
    let initial = Date.now() - this.elapsed;
    this.timer = setInterval(() => {
      this.start = Date.now() - initial;

      // console.log("this.elapsed");
      // console.log(this.elapsed);
      // console.log("Date.now()");
      // console.log(Date.now());
      // console.log("initial = Date.nowOG() - this.elapsed");
      // console.log(initial);
      // console.log("this.start = Date.now() - initial");
      // console.log(this.start);

      this.updateGoalTimer();
    }, 1);
  }

  stop_timer() {
    this.elapsed = this.start;
    clearInterval(this.timer);
  }

  reset_timer() {
    this.elapsed = 0;
    this.start = 0;
    clearInterval(this.timer);
    this.updateGoalTimer();
  }

  updateGoalTimer() {
    elementGoalTimer.textContent = this.display_time();
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

class TimeCountDown {
  constructor(to_lose = 4) {
    this.start = 0;
    this.elapsed = 0;
    this.to_lose = to_lose * 3600000;
  }
  start_timer() {
    let initial = Date.now() - this.elapsed;
    this.timer = setInterval(() => {
      this.start = Date.now() - initial;

      // console.log("this.elapsed");
      // console.log(this.elapsed);
      // console.log("Date.now()");
      // console.log(Date.now());
      // console.log("initial = Date.nowOG() - this.elapsed");
      // console.log(initial);
      // console.log("this.start = Date.now() - initial");
      // console.log(this.start);

      this.updateGoalTimer();
    }, 1);
  }

  stop_timer() {
    this.elapsed = this.start;
    clearInterval(this.timer);
  }

  reset_timer() {
    this.elapsed = 0;
    this.start = 0;
    clearInterval(this.timer);
    this.updateGoalTimer();
  }

  updateGoalTimer() {
    elementCountDown.textContent = this.display_time();
  }

  display_time() {
    const disp_time = this.to_lose - this.start;
    const mili = disp_time;
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
  constructor() {
    this.switchAB = "A";
    this.running = false;
    this.previous_data = false;

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

function handle_reset_button_click() {
  time.reset_timer();
  countDown.reset_timer();
  appState.switchAB = "A";
}

function handle_main_button_click() {
  if (appState.previous_data == false) {
    if (appState.running == false) {
      appState.running = true;
      appState.switchAB = "B";
      time.start_timer();
    } else if (appState.running == true) {
      if (appState.switchAB == "A") {
        appState.switchAB = "B";
        time.start_timer();
        countDown.stop_timer();
      } else if (appState.switchAB == "B") {
        appState.switchAB = "A";
        countDown.start_timer();
        time.stop_timer();
      }
      // time.stop_timer();
      // appState.paused_or_running = "paused";
    }
  }
}

function startUp() {}

const appState = new AppState();
const time = new Time();
const countDown = new TimeCountDown();
console.log("hello world");
console.log(appState.previous_data);
main_button.addEventListener("click", handle_main_button_click);
reset_button.addEventListener("click", handle_reset_button_click);
