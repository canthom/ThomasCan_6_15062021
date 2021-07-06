// ES6 Classes
class Photographer {
  constructor(id, portrait, name, city, country, tagline, price, tags){
    this.id = id;
    this.portrait = portrait;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline; 
    this.price = price;
    this.tags = tags;
  }

  // PROTOTYPES
  // Création de la carte Photographe
  render() {
    const container = document.getElementsByTagName('main')[0];
    if (container) {
      const header = document.createElement('header');
      const divProfile = document.createElement('div');
      const divInfo = document.createElement('div');
      const image = document.createElement('img');
      const h1 = document.createElement('h1');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const ul = document.createElement('ul');
      const btn = document.createElement('button');
      const sectionWork = document.getElementsByClassName('section-work')[0];
      

      // Class List
      header.classList.add('photographer-header');
      divProfile.classList.add('photographer-header__profile');
      h1.classList.add('heading-1', 'photographer-header__title');
      divInfo.classList.add('photographer-header__info');
      span1.classList.add('photographer-header__location');
      span2.classList.add('photographer-header__quote');
      image.classList.add('photographer-header__img');
      btn.classList.add('btn', 'btn-cta--desktop');

      // Attributes
      image.setAttribute('src', `./img/Photographers ID Photos/`+this.portrait);
      image.setAttribute('alt', this.name);


      // INNER HTML
      h1.innerHTML = this.name;
      span1.innerHTML = this.city + ', ' + this.country;
      span2.innerHTML = this.tagline;
      btn.innerHTML = 'Contactez-moi';

      // Tags
      ul.classList.add('tags', 'tags--page');
      this.tags.forEach(element => {
        const li = document.createElement('li');
        const liLink = document.createElement('a');
      
        li.classList.add('tags__item');
        liLink.classList.add('tags__link');
        liLink.setAttribute('href', '#');
        liLink.innerHTML = `#${element}`;

        ul.append(li);
        li.append(liLink);
      });

      // Append 
      container.insertBefore(header, sectionWork);
      header.append(divProfile, image);
      divProfile.append(h1);
      divProfile.append(divInfo);
      divProfile.append(ul);
      divInfo.append(span1);
      divInfo.append(span2);
      divProfile.append(btn);
    }
  }
}

// Récupérer les données depuis le fichier JSON
fetch('FishEyeData.json').then( (data) => {
  return data.json();
}).then( (result) => {

  for (let photographerData of result.photographers) {
    const photographer = new Photographer(photographerData.id, photographerData.portrait, photographerData.name, photographerData.city, photographerData.country, photographerData.tagline, photographerData.price, photographerData.tags);
    photographer.render();
  }
}).catch( (err) => {
  alert(err);
});


/////////////////////////////
///////// MODAL
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