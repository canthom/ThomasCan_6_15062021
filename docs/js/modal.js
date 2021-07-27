// DOM
const modalCont = document.querySelector('.modal-container');
const modalBtn = document.querySelectorAll('.cta')[0];
const modalClose = document.querySelector('.modal__close');

const submitModal = document.forms[0];
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const formData = document.querySelectorAll('.form__data');

// Création du Modal
function renderModal(e) {
  const body = document.getElementsByTagName('body')[0];
  const divContainer = document.createElement('div');
  const divModal = document.createElement('div');
  const divModalBody = document.createElement('div');
  const h1 = document.createElement('h1');
  const spanClose = document.createElement('span');
  const spanName = document.createElement('span');
  const form = document.createElement('form');
  const divFormDataFirst = document.createElement('div');
  const labelFirst = document.createElement('label');
  const inputFirst = document.createElement('input');

  const divFormDataLast = document.createElement('div');
  const labelLast = document.createElement('label');
  const inputLast = document.createElement('input');

  const divFormDataMail = document.createElement('div');
  const labelMail = document.createElement('label');
  const inputMail = document.createElement('input');

  const divFormDataMessage = document.createElement('div');
  const labelMessage = document.createElement('label');
  const textArea = document.createElement('textarea');

  const inputBtn = document.createElement('input');

  // CLASS
  divContainer.classList.add('modal-container');
  divModal.classList.add('modal');
  h1.classList.add('heading-1', 'heading-1--form');
  spanClose.classList.add('modal__close');
  divModalBody.classList.add('modal__body');
  form.classList.add('form');
  divFormDataFirst.classList.add('form__data');
  labelFirst.classList.add('form__label');
  inputFirst.classList.add('form__input');
  divFormDataLast.classList.add('form__data');
  labelLast.classList.add('form__label');
  inputLast.classList.add('form__input');
  divFormDataMail.classList.add('form__data');
  labelMail.classList.add('form__label');
  inputMail.classList.add('form__input');

  divFormDataMessage.classList.add('form__data');
  labelMessage.classList.add('form__label');
  textArea.classList.add('form__text');
  inputBtn.classList.add('btn', 'btn--form');


  // SET ATTRIBUTE
  labelFirst.setAttribute('for', 'first');
  inputFirst.setAttribute('type', 'text');
  inputFirst.setAttribute('id', 'first');
  inputFirst.setAttribute('name', 'first');
  labelLast.setAttribute('for', 'last');
  inputLast.setAttribute('type', 'text');
  inputLast.setAttribute('id', 'last');
  inputLast.setAttribute('name', 'last');
  labelMail.setAttribute('for', 'email');
  inputMail.setAttribute('type', 'email');
  inputMail.setAttribute('id', 'email');
  inputMail.setAttribute('name', 'email');
  labelMessage.setAttribute('for', 'message');
  textArea.setAttribute('name', 'message');
  textArea.setAttribute('id', 'message');
  textArea.setAttribute('cols', '30');
  textArea.setAttribute('rows', '5');
  inputBtn.setAttribute('type', 'submit');
  inputBtn.setAttribute('value', 'Envoyer');

  // INNER HTML
  h1.innerHTML = 'Contactez moi';
  spanName.innerHTML = `${e}`;
  labelFirst.innerHTML = 'Prénom';
  labelLast.innerHTML = 'Nom';
  labelMail.innerHTML = 'Email';
  labelMessage.innerHTML = 'Votre message';
  
  // APPEND
  body.append(divContainer);
  divContainer.append(divModal);
  divModal.append(h1, spanClose, divModalBody);
  h1.append(spanName);
  divModalBody.append(form);
  form.append(divFormDataFirst, divFormDataLast, divFormDataMail, divFormDataMessage, inputBtn);
  divFormDataFirst.append(labelFirst, inputFirst);
  divFormDataLast.append(labelLast, inputLast);
  divFormDataMail.append(labelMail, inputMail);
  divFormDataMessage.append(labelMessage, textArea);
} 

// OPEN
modalBtn.addEventListener('click', launchModal);

function launchModal() {
  modalCont.style.display = "grid";
}

// CLOSE
modalClose.addEventListener('click', closeModal);

function closeModal() {
  modalCont.style.display = "none";
  submitModal.reset();
}

// VALIDATION
submitModal.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nameFormat = /^[a-zA-Z]{2,10}$/;
  const mailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,63})$/;

  if (!nameFormat.test(firstName.value)) {
    formData[0].dataset.error = 'Veuillez entrer un prénom valide.';
    formData[0].dataset.errorVisible = 'true';
  } else {
    formData[0].removeAttribute('data-error');
    formData[0].removeAttribute('data-error-visible');
  }

  if (!nameFormat.test(lastName.value)) {
    formData[1].dataset.error = 'Veuillez entrer un nom de famille valide.';
    formData[1].dataset.errorVisible = 'true';
  } else {
    formData[1].removeAttribute('data-error');
    formData[1].removeAttribute('data-error-visible');
  }

  if (!mailFormat.test(email.value)) {
    formData[2].dataset.error = 'Veuillez entrer une adresse email valide.';
    formData[2].dataset.errorVisible = 'true';
  } else {
    formData[2].removeAttribute('data-error');
    formData[2].removeAttribute('data-error-visible');
  }

  if (message.value < 10) {
    formData[3].dataset.error = 'Veuillez détailler davantage votre message.';
    formData[3].dataset.errorVisible = 'true';
  } else {
    formData[3].removeAttribute('data-error');
    formData[3].removeAttribute('data-error-visible');
  }

  let hasError;
  for (var i = 0; i < formData.length; i++) {
    if (formData[i].hasAttribute('data-error')) {
      hasError = 1;
      break;
    }
  }

  if (!(hasError === 1)) {
    closeModal();
  }
});

export default renderModal;
