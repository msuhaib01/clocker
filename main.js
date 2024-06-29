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
  // constructor() {
  //   this.start = +localStorage.getItem("start") || 0;
  //   this.elapsed = +localStorage.getItem("elapsed") || 0;
  // }
  start_timer() {
    const elapsed_temp = +localStorage.getItem("elapsed");
    let initial = Date.now() - elapsed_temp;
    this.timer = setInterval(() => {
      const temp = Date.now() - initial;
      localStorage.setItem("start", temp);
      localStorage.setItem("elapsed", temp);
      this.updateGoalTimer();
    }, 1);
  }

  stop_timer() {
    const elapsed_temp = +localStorage.getItem("start");
    localStorage.setItem("elapsed", elapsed_temp);

    clearInterval(this.timer);
  }

  reset_timer() {
    localStorage.setItem("elapsed", 0);
    localStorage.setItem("start", 0);
    localStorage.setItem("counterUpGoalVal", 12);

    clearInterval(this.timer);
    this.updateGoalTimer();
  }

  updateGoalTimer() {
    elementGoalTimer.textContent = this.display_time();
  }

  display_time() {
    const mili = +localStorage.getItem("start");
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
  // constructor(to_lose = 4) {
  //   this.to_lose = to_lose * 3600000;
  // }
  update_to_lose(to_lose) {
    localStorage.setItem("to_lose_ms", to_lose * 3600000);
    this.updateGoalTimer();
  }

  start_timer() {
    let initial = Date.now() - localStorage.getItem("elapsed_count_downer");
    this.timer = setInterval(() => {
      const start_count_downer_temp = Date.now() - initial;
      localStorage.setItem("start_count_downer", start_count_downer_temp);
      localStorage.setItem("elapsed_count_downer", start_count_downer_temp);
      this.updateGoalTimer();
    }, 1);
  }

  stop_timer() {
    localStorage.setItem(
      "elapsed_count_downer",
      +localStorage.getItem("start_count_downer")
    );
    clearInterval(this.timer);
  }

  reset_timer() {
    localStorage.setItem("elapsed_count_downer", 0);
    localStorage.setItem("start_count_downer", 0);
    localStorage.setItem("to_lose_ms", 4 * 3600000);
    localStorage.setItem("counterDownGoalVal", 4);
    clearInterval(this.timer);
    this.updateGoalTimer();
  }

  updateGoalTimer() {
    elementCountDown.textContent = this.display_time();
  }

  display_time() {
    const to_lose = +localStorage.getItem("to_lose_ms");
    const start_count_downer = +localStorage.getItem("start_count_downer");
    let disp_time = to_lose - start_count_downer;
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
    const app_data = JSON.parse(window.localStorage.getItem("data"));
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
    localStorage.setItem("counterUpGoalVal", input_field_val_int);
    counterUpGoalValue.textContent = `${+localStorage.getItem(
      "counterUpGoalVal"
    )} hours`;
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
    localStorage.setItem("counterDownGoalVal", input_field_val_int);
    counterDownTextValue.textContent = `${localStorage.getItem(
      "counterDownGoalVal"
    )} hours`;
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
  if (appState.running == false) {
    appState.running = true;
    appState.switchAB = "B";
    time.start_timer();
    document.querySelector("#main_button").textContent = "Switch";
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

const appState = new AppState();
const time = new Time();
const countDown = new TimeCountDown();
main_button.addEventListener("click", handle_main_button_click);
reset_button.addEventListener("click", handle_reset_button_click);
counterUpInputIdButton.addEventListener("click", handleCounterUpButtonClick);
counterDownIdButton.addEventListener("click", handleCounterDownButtonClick);

localStorage.setItem("test", 1);
+localStorage.getItem("test");

if (localStorage.getItem("start") === null) {
  localStorage.setItem("elapsed", 0);
  localStorage.setItem("start", 0);
  localStorage.setItem("counterUpGoalVal", 12);

  localStorage.setItem("elapsed_count_downer", 0);
  localStorage.setItem("start_count_downer", 0);
  localStorage.setItem("to_lose_ms", 4 * 3600000);
  localStorage.setItem("counterDownGoalVal", 4);
}

time.updateGoalTimer();
counterUpGoalValue.textContent = `${+localStorage.getItem(
  "counterUpGoalVal"
)} hours`;

countDown.updateGoalTimer();
counterDownTextValue.textContent = `${+localStorage.getItem(
  "counterDownGoalVal"
)} hours`;
