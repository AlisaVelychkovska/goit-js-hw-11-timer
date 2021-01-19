function pad(value) {
  return String(value).padStart(2, "0");
}
function format(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}
function moment(time) {
  return format(time);
}
class CountDownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.refs = {
      $days: document.querySelector(`${selector} [data-value="days"]`),
      $hours: document.querySelector(`${selector} [data-value="hours"]`),
      $mins: document.querySelector(`${selector} [data-value="mins"]`),
      $secs: document.querySelector(`${selector} [data-value="secs"]`),
    };
    this.timerId = null;
  }
  start() {
    this.timerId = setInterval(() => {}, 1000);
    const deltaTime = this.targetDate - Date.now();
    const time = moment(deltaTime);
    this.updateInterface(time);
  }
  updateInterface({ days, hours, mins, secs }) {
    const { $days, $hours, $mins, $secs } = this.refs;
    $days.textContent = days;
    $hours.textContent = hours;
    $mins.textContent = mins;
    $secs.textContent = secs;
  }
}
function initTimer(selector, targetDate) {
  const myTimer = new CountDownTimer({ selector, targetDate });
  myTimer.start();
}
initTimer("#timer-1", new Date("Jul 17, 2019"));
