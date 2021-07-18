import{Photographer} from './js/class/Photographer.js';

// URL
const url = new URL(window.location);
const searchParams = new URLSearchParams(url.search);
const tag = searchParams.get('tag');

// Récupérer les données depuis le fichier JSON
fetch('FishEyeData.json').then( (data) => {
  return data.json();
}).then( (result) => {
  let photographersList = result.photographers;

  if (tag) {
    photographersList = result.photographers.filter(photographerData => photographerData.tags.includes(tag));
  }

  for (let photographerData of photographersList) {
    const photographer = new Photographer(photographerData.id, photographerData.portrait, photographerData.name, photographerData.city, photographerData.country, photographerData.tagline, photographerData.price, photographerData.tags);
    photographer.renderHomepage();
  }
}).catch( (err) => {
  alert(err);
});


