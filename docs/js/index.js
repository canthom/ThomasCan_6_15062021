import{Photographer} from './class/Photographer.js';

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

  let tagsList = [];

  for (let photographerData of photographersList) {
    const photographer = new Photographer(photographerData.id, photographerData.portrait, photographerData.name, photographerData.city, photographerData.country, photographerData.tagline, photographerData.price, photographerData.tags);
    photographer.renderHomepage();

    photographerData.tags.forEach(element => {
      tagsList.push(element);
    });
  }

  const tagsListUnique = new Set(tagsList);

  console.log(tagsListUnique);

  // Tag Nav
  tagsListUnique.forEach(element => {
    // Création d'éléments
    const ulTag = document.querySelector('.tags');
    const liTag = document.createElement('li');
    const aTag = document.createElement('a');

    liTag.classList.add('tags__item');
    aTag.classList.add('tags__link');

    aTag.setAttribute('href', `?tag=${element}`);
    aTag.innerHTML = `#${element}`;

    ulTag.append(liTag);
    liTag.append(aTag);
    
    // Tag en surbrillance
    const url = new URL(window.location);
    const searchParams = new URLSearchParams(url.search);
    const tag = searchParams.get('tag');
    
    if (aTag.textContent.includes(tag)) {
      liTag.style.backgroundColor = '#D3573C';
      liTag.style.color = '#000';
      liTag.setAttribute('aria-current', 'true');
    }
  });

}).catch( (err) => {
  alert(err);
});


