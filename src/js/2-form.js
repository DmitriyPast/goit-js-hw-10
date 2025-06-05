const formData = {
  email: '',
  message: '',
  save(name, value) {
    this[name] = value;
    window.localStorage['feedback-form-state'] = JSON.stringify(this);
    // console.log('saved:', window.localStorage['feedback-form-state']);
  },
  load() {
    const local = JSON.parse(window.localStorage['feedback-form-state'] || 0);
    if (!local) return undefined;
    this.email = local.email;
    this.message = local.message;
    return local;
  },
  clear() {
    window.localStorage.removeItem('feedback-form-state');
    this.email = '';
    this.message = ';';
  },
};
// window.localStorage.removeItem('feedback-form-state');
// window.localStorage['feedback-form-state'] = undefined;
// console.log('Initialstate:', window.localStorage['feedback-form-state']);

const form = document.querySelector('.feedback-form');
// console.log(formData.load());
if (formData.load()) {
  // console.log(form.querySelectorAll('label > *'));
  const fields = form.querySelectorAll('label > *');
  fields[0].value = formData.email;
  fields[1].value = formData.message;
}

form.addEventListener('input', handleFormInput);

function handleFormInput(iev) {
  //   console.log(iev.target.name, iev.target.value);
  const { name, value } = iev.target;

  if (name === 'email' || name === 'message') {
    formData.save(name, value);
    // console.log(formData);
    return;
  }
}

form.addEventListener('submit', submitHandleFunc);

function submitHandleFunc(sbEv) {
  sbEv.preventDefault();
  const fmIn = sbEv.target;
  // console.log(fmIn[0].value);
  // console.log(`object "${sbEv.target[0].name}" && "${sbEv.target[1].name}"`);
  if (fmIn[0].value.trim() && fmIn[1].value.trim()) {
    // const login =
    console.log(formData);
    formData.clear();
    fmIn.reset();
  } else {
    alert('Fill please all fields');
  }
}
