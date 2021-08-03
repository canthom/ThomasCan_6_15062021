import{Photographer} from './js/class/Photographer.js';
import{Image} from './js/class/Image.js';
import{Video} from './js/class/Video.js';
import{Lightbox} from './js/class/Lightbox.js';
import{updateLike} from './js/like.js';

// URL
const url = new URL(window.location);
const searchParams = new URLSearchParams(url.search);
const id = searchParams.get('id');
const tag = searchParams.get('tag');

// Récupérer les données depuis le fichier JSON
fetch('FishEyeData.json').then( (data) => {
  return data.json();
}).then( (result) => {
  const filteredPhotographers = result.photographers.filter(photographerData => photographerData.id === Number(id));
  const photographer = new Photographer(filteredPhotographers[0].id, filteredPhotographers[0].portrait, filteredPhotographers[0].name, filteredPhotographers[0].city,filteredPhotographers[0].country, filteredPhotographers[0].tagline, filteredPhotographers[0].price, filteredPhotographers[0].tags);
  photographer.renderPortfolio();

  let filteredMedia = result.media.filter(mediaData => mediaData.photographerId === Number(id));

  function factoryMedia(element) {
    if (element.image) {
      return new Image(element.id, element.photographerId, element.title, element.image, element.tags, element.likes, element.date, element.price);
    }

    if (element.video) {
      return new Video(element.id, element.photographerId, element.title, element.video, element.tags, element.likes, element.date, element.price);
    }
  };
 
  filteredMedia.forEach(element => {
    const newMedia = factoryMedia(element);
    newMedia.render();
  }); 

  
  ////////// TRI TEST
  // Cibler le sélecteur
  const selector = document.getElementById('order-select');

  let selectPopular = 0;
  let selectDate = 1;
  let selectTitle = 2;
  
  selector.addEventListener('change', () => {
    let index = selector.selectedIndex;
    document.querySelector('.work-container').innerHTML = '';

    if (selectPopular === index) {
      filteredMedia.sort(function (a, b) {
        return a.likes - b.likes;
      });
      // Inversion du tableau
      filteredMedia.reverse();
    } 

    if (selectDate === index) {
      filteredMedia.sort(function (a, b) {
        a = (new Date(a.date)).getTime();
        b = (new Date(b.date)).getTime();

        return a - b;
      });
      console.log(filteredMedia);
    }

    if (selectTitle === index) {
      filteredMedia.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        };
      });
    }

    filteredMedia.forEach(element => {
      const newMedia = factoryMedia(element);
      newMedia.render();
    }); 
  })
  ////////// FIN TRI TEST
  
  // Total des Likes
  updateLike();

  /// TEST LIGHTBOX
  Lightbox.init();

}).catch( (err) => {
  // Affichage du message d'erreur
  const header = document.querySelector('header');
  const divError = document.createElement('div');
  const btnError = document.createElement('a');
  divError.classList.add('error');
  btnError.classList.add('btn', 'btn--error');
  btnError.setAttribute('href', 'index.html');
  divError.innerHTML = 'Erreur: aucun media trouvé.';
  btnError.innerHTML = "Retournez à l'accueil";
  document.body.insertBefore(divError, header);
  divError.append(btnError);
});

//////////////////////////////////////// MODAL
// DOM
const modalCont = document.querySelector('.modal-container');
const modalBtn = document.getElementsByClassName('btn')[0];
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


