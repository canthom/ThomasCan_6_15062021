import{Media} from './Media.js';

class Image extends Media {
  constructor(imageId, photographerId, title, image, tags, likes, date, price) {
    super(imageId, photographerId, title, tags, likes, date, price);

    this.image = image;
  }

  render(){
    const container = document.getElementsByClassName('work-container')[0];
    // URL
    const url = new URL(window.location);
    const searchParams = new URLSearchParams(url.search);
    const name = searchParams.get('name');
    let likeScore = Number(this.likes);

    if (container) {
      // Création d'éléments
      const imageWork = document.createElement('img');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const figure = document.createElement('figure');
      const figcaption = document.createElement('figcaption');
      const linkMedia = document.createElement('a');
      
      // Class List
      figure.classList.add('work');
      imageWork.classList.add('work__img');
      figcaption.classList.add('work__caption');
      span1.classList.add('work__title');
      span2.classList.add('work__likes');

      // Attributes
      imageWork.setAttribute('src', `./img/${name}/`+this.image);
      linkMedia.setAttribute('href', `./img/${name}/`+this.image);

      // INNER HTML
      span1.innerHTML = this.title;
      span2.innerHTML = likeScore + ` <i class="fas fa-heart"></i>`;

      // Append Works
      container.append(figure);
      figure.append(linkMedia, figcaption);
      linkMedia.append(imageWork);
      figcaption.append(span1, span2);

      // EVENTS
      span2.addEventListener('click', () => {
        likeScore++;
        span2.innerHTML = likeScore + ` <i class="fas fa-heart"></i>`;
      });
    }
  }
}

export{Image};