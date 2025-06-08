// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', generatePromise);

// const fields = form.querySelectorAll('input');
const delay = form.querySelector('input[name="delay"]');
const state = form.querySelector('input[value="fulfilled"]');

function generatePromise(evt) {
  evt.preventDefault();
  // const [delay, fulfil, reject] = fields;
  // console.log(delay, fulfil, reject);

  const promise = new Promise((resolve, reject) =>
    setTimeout(
      () =>
        state.checked
          ? resolve(`✅ Fulfilled promise in ${delay.value}ms`)
          : reject(`❌ Rejected promise in ${delay.value}ms`),
      delay.value
    )
  );

  promise
    .then(result => {
      iziToast.success({
        message: result,
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
      });
    });

  form.reset();
}
