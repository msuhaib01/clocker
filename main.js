class UserData {
  time_goal = 0;
  time_to_goal = 0;
  time_wasteable = 0;
  time_wasted = 0;
  time_wasteable_remaining = 0;
  constructor(goal, wasteable) {
    this.time_goal = goal;
    this.time_wasteable = wasteable;
    this.time_wasteable_remaining = wasteable;
  }
  save_data_to_local() {
    data = {
      time_goal: this.time_goal,
      time_to_goal: this.time_to_goal,
      time_wasteable: this.time_wasteable,
      time_wasted: this.time_wasted,
      time_wasted_remaining: this.time_wasted_remaining,
    };
    window.localStorage.setItem("data", JSON.stringify(data));
  }

  overwrite_state_with_local_data() {
    data = JSON.parse(window.localStorage.getItem("data"));
    this.time_goal = data.time_goal;
    this.time_to_goal = data.time_to_goal;
    this.time_wasteable = data.time_wasteable;
    this.time_wasted = data.time_wasteable;
    this.time_wasted_remaining = data.time_wasted_remaining;
  }

  delete_local_storage() {
    window.localStorage.removeItem("data");
  }
}

class Time {
  start;
  simple_timer() {
    this.start = 0;
    const d = new Date();
    let initial = d.getTime();
    const timerInterval = setInterval(() => {
      this.start = Date.now() - initial;
      document.getElementById("goal_time").textContent = this.display_time();
    }, 10);
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

function handle_main_button_click() {
  console.log("HELLO BUTTON");
  const time = new Time();
  time.simple_timer();
}
function main() {
  console.log("hello world");
  const main_button = document.querySelector("#main_button");
  main_button.addEventListener("click", handle_main_button_click);
}

main();
