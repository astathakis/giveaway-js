const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');

const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2022, 5, 24, 20, 30, 0);
//always set offer from current plus 10 days
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
// let futureDate = new Date();
// console.log(futureDate);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
// const secs = futureDate.getSeconds();
let month = futureDate.getMonth();
// console.log(months[month]);
month = months[month];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${mins}am `;
//future time in ms
const futureTime = futureDate.getTime();
//console.log(futureTime);

function getRemainingTime() {
  const today = new Date().getTime();
  //console.log(today);
  const t = futureTime - today;
  // console.log(t);
  //1 sec is 1000ms
  //1min is 60s
  //1hour is 60mins and 1 day 24hours
  //values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  //calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);
  // console.log(hours);

  //set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  //current>future end of offer
  //important call F() after setting countdown
  // clear time interval
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class='expired'>sorry, this giveaway has expired</h4>`;
  }
}
//countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
