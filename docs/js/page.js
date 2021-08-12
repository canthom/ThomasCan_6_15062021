import{Photographer} from './class/Photographer.js';
import{Image} from './class/Image.js';
import{Video} from './class/Video.js';
import{Lightbox} from './class/Lightbox.js';
import{updateLike} from './functions/like.js';

// URL
const url = new URL(window.location);
const searchParams = new URLSearchParams(url.search);
const id = searchParams.get('id');

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
  }

  // Tri par défaut des Médias (par Popularité)
  filteredMedia.sort(function (a, b) {
    return b.likes - a.likes;
  });
 
  filteredMedia.forEach(element => {
    const newMedia = factoryMedia(element);
    newMedia.render();
  });

  // TRI
  const selector = document.getElementById('order-select');

  let selectPopular = 0;
  let selectDate = 1;
  let selectTitle = 2;
  
  selector.addEventListener('change', () => {
    let index = selector.selectedIndex;
    document.querySelector('.work-container').innerHTML = '';

    switch (index) {
      case selectPopular :
        filteredMedia.sort(function (a, b) {
          return b.likes - a.likes;
        });
      break;

      case selectDate : 
        filteredMedia.sort(function (a, b) {
          a = (new Date(a.date)).getTime();
          b = (new Date(b.date)).getTime();

          return a - b;
        });
      break;

      case selectTitle :
        filteredMedia.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          } else {
            return 1;
          }
        });
      break;
    }

    filteredMedia.forEach(element => {
      const newMedia = factoryMedia(element);
      newMedia.render();
    }); 
  })
  
  // Total des Likes
  updateLike();

  // Initiation des Lighbtox
  Lightbox.init();

}).catch( (err) => {
  // Affichage du message d'erreur
  alert(err);
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
