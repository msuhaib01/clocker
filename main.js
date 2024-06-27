// class UserData {
//   time_goal = 0;
//   time_to_goal = 0;
//   time_wasteable = 0;
//   time_wasted = 0;
//   time_wasteable_remaining = 0;
//   constructor(goal, wasteable) {
//     this.time_goal = goal;
//     this.time_wasteable = wasteable;
//     this.time_wasteable_remaining = wasteable;
//   }
//   save_data_to_local() {
//     data = {
//       time_goal: this.time_goal,
//       time_to_goal: this.time_to_goal,
//       time_wasteable: this.time_wasteable,
//       time_wasted: this.time_wasted,
//       time_wasted_remaining: this.time_wasted_remaining,
//     };
//     window.localStorage.setItem("data", JSON.stringify(data));
//   }

//   overwrite_state_with_local_data() {
//     data = JSON.parse(window.localStorage.getItem("data"));
//     this.time_goal = data.time_goal;
//     this.time_to_goal = data.time_to_goal;
//     this.time_wasteable = data.time_wasteable;
//     this.time_wasted = data.time_wasteable;
//     this.time_wasted_remaining = data.time_wasted_remaining;
//   }

//   delete_local_storage() {
//     window.localStorage.removeItem("data");
//   }
// }

class Storage {
  constructor() {}
}

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

const appState = new AppState();
const time = new Time();
console.log("hello world");
console.log(appState.previous_data);
const main_button = document.querySelector("#main_button");
main_button.addEventListener("click", handle_main_button_click);
