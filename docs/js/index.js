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
  
  // Tag Nav
  const tagsListUnique = [...new Set(tagsList)];

  tagsListUnique.forEach(element => {
    // Création d'éléments
    const ulTag = document.querySelector('.tags');
    const liTag = document.createElement('li');
    const aTag = document.createElement('a');

    liTag.classList.add('tags__item');
    aTag.classList.add('tags__link', 'tags__link--header');

    aTag.setAttribute('href', `?tag=${element}`);
    aTag.innerHTML = `#${element.slice(0, 1).toUpperCase() + element.slice(1)}`;

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

  const btnToTop = document.getElementById('btnToTop');

  btnToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener('scroll', function () {
    
    if (window.scrollY > 0) {
      btnToTop.style.display = 'block';
    } else {
      btnToTop.style.display = 'none';
    }
  });

}).catch( (err) => {
  alert(err);
});


