class User {
  nickname: String = '';
  id: Number = 0;
  secure_password: String = '';
  problem_since: String = '';
  bedtime: Date = new Date();
  wakeup_time: Date = new Date();
  sleep_duration: Number = 0;
  efficiency: Number = 1.0;

  constructor(
    nickname: String,
    id,
    secure_password: String,
    problem_since: String,
    bedtime: Date,
    wakeuptime: Date,
    sleep_duration: Number,
    efficiency: Number
  ) {
    this.nickname = nickname;
    this.id = id;
    this.secure_password = secure_password;
    this.problem_since = problem_since;
    this.bedtime = bedtime;
    this.wakeup_time = wakeuptime;
    this.sleep_duration = sleep_duration;
    this.efficiency = efficiency;
  }
}
