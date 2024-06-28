// what data do i actually need?
// miliseconds on count up clock
// milisecods left on count down clock
//
const elementGoalTimer = document.getElementById("goal_time");
const elementCountDown = document.getElementById("count_down_time");
const main_button = document.querySelector("#main_button");
const reset_button = document.querySelector("#reset_button");
const counterUpInputIdButton = document.querySelector(
  "#counterUpInputIdButton"
);
const counterDownIdButton = document.querySelector("#counterDownIdButton");

const input_field = document.querySelector("#counterUpInputId");
const counterUpGoalValue = document.querySelector("#counterUpGoalValue");

const input_field_count_down = document.querySelector("#counterDownInputId");
const counterDownTextValue = document.querySelector("#counterDownTextValue");

// constants
class Time {
  constructor() {
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
  update_to_lose(to_lose) {
    this.to_lose = to_lose * 3600000;
    this.updateGoalTimer();
  }

  start_timer() {
    let initial = Date.now() - this.elapsed;
    this.timer = setInterval(() => {
      this.start = Date.now() - initial;
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
    let disp_time = this.to_lose - this.start;
    if (disp_time < 0) {
      disp_time = 0 - disp_time;
      const mili = disp_time;
      const second = Math.floor(mili / 1000);
      const minute = Math.floor(second / 60);
      const hour = Math.floor(minute / 60);
      const print_mili = (mili % 1000).toString().padStart(3, "0");
      const print_second = (second % 60).toString().padStart(2, "0");
      const print_minute = (minute % 60).toString().padStart(2, "0");
      const print_hour = (hour % 24).toString().padStart(2, "0");
      return `-${print_hour}:${print_minute}:${print_second}:${print_mili}`;
    }
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
  const input_field_value = input_field.value;
  const input_field_val_int = parseInt(input_field_value);
  if (input_field_value == "") {
    console.log("empty no go");
  } else if (isNaN(input_field_val_int)) {
    console.log("its not a number");
  } else {
    console.log("we good");
    counterUpGoalValue.textContent = `${input_field_val_int} hours`;
    input_field.value = "";
  }
}

function handleCounterDownButtonClick() {
  const input_field_value = input_field_count_down.value;
  const input_field_val_int = parseInt(input_field_value);
  if (input_field_value == "") {
    console.log("empty no go");
  } else if (isNaN(input_field_val_int)) {
    console.log("its not a number");
  } else {
    console.log("we good");
    counterDownTextValue.textContent = `${input_field_val_int} hours`;
    input_field_count_down.value = "";
    countDown.update_to_lose(input_field_val_int);
  }
}

function handle_reset_button_click() {
  time.reset_timer();
  countDown.reset_timer();
  counterUpGoalValue.textContent = `${12} hours`;
  counterDownTextValue.textContent = `${4} hours`;
  countDown.update_to_lose(4);
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
counterUpInputIdButton.addEventListener("click", handleCounterUpButtonClick);
counterDownIdButton.addEventListener("click", handleCounterDownButtonClick);
