// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', generatePromise);

// const fields = form.querySelectorAll('input');
const delay = form.querySelector('input[name="delay"]');
const state = form.querySelectorAll('input[name="state"]');

function generatePromise(evt) {
  evt.preventDefault();
  // const [delay, fulfil, reject] = fields;
  // console.log(delay, fulfil, reject);

  const { delay, state } = evt.target.elements;
  const delayValue = Number(delay.value);
  const stateValue = state.value;

  // iziToast.settings({
  //   e,
  // });

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (stateValue === 'fulfilled') {
        resolve(`Fulfilled promise in ${delayValue}ms`);
      } else {
        reject(`Rejected promise in ${delayValue}ms`);
      }
    })
      .then(result => {
        iziToast.success({
          title: 'OK',
          message: result,
          position: 'topRight',
        });
      })
      .catch(err => {
        iziToast.error({
          title: 'Error',
          message: err,
          position: 'topRight',
        });
      });
  }, delayValue);
  form.reset();
}
