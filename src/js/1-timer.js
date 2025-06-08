// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0] - Date.now());
    if (selectedDates[0] <= Date.now()) {
      // alert('Please choose a date in the future');
      iziToast.info({
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      startBtn.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    startBtn.disabled = false;
  },
};

const picker = document.querySelector('#datetime-picker');
// console.log(pickerInput);
flatpickr('#datetime-picker', options);
let userSelectedDate;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', startTimer);
const dayLbl = document.querySelector('[data-days]');
const hrLbl = document.querySelector('[data-hours]');
const minLbl = document.querySelector('[data-minutes]');
const secLbl = document.querySelector('[data-seconds]');

function startTimer() {
  picker.disabled = true;
  startBtn.disabled = true;
  const timer = setInterval(() => {
    // console.log(convertMs(userSelectedDate - Date.now()));
    if (userSelectedDate <= Date.now()) {
      clearInterval(timer);
      picker.disabled = false;
      return;
    }
    // timerTick();
    const time = convertMs(userSelectedDate - Date.now());
    dayLbl.textContent = addLeadingZero(time.days);
    hrLbl.textContent = addLeadingZero(time.hours);
    minLbl.textContent = addLeadingZero(time.minutes);
    secLbl.textContent = addLeadingZero(time.seconds);
  }, 1000);
  // console.log('object');
}

// function timerTick() {

// }
