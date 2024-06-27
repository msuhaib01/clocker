localStorage = window.localStorage;

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
    localStorage.setItem("data", JSON.stringify(data));
  }

  overwrite_state_with_local_data() {
    data = JSON.parse(localStorage.getItem("data"));
    this.time_goal = data.time_goal;
    this.time_to_goal = data.time_to_goal;
    this.time_wasteable = data.time_wasteable;
    this.time_wasted = data.time_wasteable;
    this.time_wasted_remaining = data.time_wasted_remaining;
  }

  delete_local_storage() {
    localStorage.removeItem("data");
  }
}

function main() {
  console.log("hello world");
}

main();
