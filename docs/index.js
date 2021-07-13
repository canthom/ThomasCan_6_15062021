import{Photographer} from './js/class/Photographer.js';


// Récupérer les données depuis le fichier JSON
fetch('FishEyeData.json').then( (data) => {
  return data.json();
}).then( (result) => {

  for (let photographerData of result.photographers) {
    const photographer = new Photographer(photographerData.id, photographerData.portrait, photographerData.name, photographerData.city, photographerData.country, photographerData.tagline, photographerData.price, photographerData.tags);
    photographer.renderHomepage();
  }
}).catch( (err) => {
  alert(err);
});


