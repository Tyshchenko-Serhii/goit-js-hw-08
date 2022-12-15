import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

formElement.addEventListener('submit', onFormSubmit);
formElement.addEventListener('input', throttle(onFormInput, 500));

onFormFull();

function onFormFull() {
  const formValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (formValue === null) {
    return;
  }
  setFormValueOnLoad(formValue);
}

function setFormValueOnLoad({ email, message }) {
  formElement.elements.email.value = email;
  formElement.elements.message.value = message;
}

function onFormInput() {
  const formValue = getFormValue();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValue));
}

function getFormValue() {
  const email = formElement.elements.email.value;
  const message = formElement.elements.message.value;
  return { email, message };
}

function onFormSubmit(event) {
  event.preventDefault();
  const formValue = getFormValue();
  console.log(formValue);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
