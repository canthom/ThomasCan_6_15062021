import{Media} from './Media.js';
import{updateLike} from '../functions/like.js';


class Image extends Media {
  constructor(imageId, photographerId, title, image, tags, likes, date, price) {
    super(imageId, photographerId, title, tags, likes, date, price);

    this.image = image;
  }

  render(){
    const container = document.getElementsByClassName('work-container')[0];
    let likeScore = Number(this.likes);

    // TEST NAME
    const getPhotographerName = document.querySelector('h1').textContent;
    const splitPhotographerName = getPhotographerName.split(' ');
    const name = splitPhotographerName[0];
    // TEST NAME

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
      imageWork.setAttribute('role', 'img');
      linkMedia.setAttribute('href', `./img/${name}/`+this.image);
      linkMedia.setAttribute('data-title', `${this.title}`);

      // INNER HTML
      span1.innerHTML = this.title;
      span2.innerHTML = likeScore + ` <i class="fas fa-heart"></i>`;

      // Append Works
      container.append(figure);
      figure.append(linkMedia, figcaption);
      linkMedia.append(imageWork);
      figcaption.append(span1, span2);

      // EVENTS
      // LIKE BUTTON 
      let clicked = false;
      span2.addEventListener('click', () => {
        if (clicked === false) {
          clicked = !clicked;
          likeScore+= 1;
          span2.innerHTML = likeScore + ` <i class="fas fa-heart"></i>`;
          span2.style.fontWeight = '700';
          span2.style.color = '#d3573c';
        } else if (clicked === true) {
          clicked = !clicked;
          likeScore-= 1;
          span2.innerHTML = likeScore + ` <i class="fas fa-heart"></i>`;
          span2.style.fontWeight = '';
          span2.style.color = '';
        }
        updateLike();
      });
    }
  }
}

export{Image};