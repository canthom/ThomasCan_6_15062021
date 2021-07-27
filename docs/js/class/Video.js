import{Media} from './Media.js';
import{updateLike} from '../like.js';

class Video extends Media {
  constructor(imageId, photographerId, title, video, tags, likes, date, price) {
    super(imageId, photographerId, title, tags, likes, date, price);

    this.video = video;
  }

  render(){
    const container = document.getElementsByClassName('work-container')[0];
    let likeScore = Number(this.likes);
    // URL
    const url = new URL(window.location);
    const searchParams = new URLSearchParams(url.search);
    const name = searchParams.get('name');

    if (container) {
      // Création d'éléments
      const videoWork = document.createElement('video');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const figure = document.createElement('figure');
      const figcaption = document.createElement('figcaption');
      const linkMedia = document.createElement('a');
      
      // Class List
      figure.classList.add('work');
      videoWork.classList.add('work__img');
      figcaption.classList.add('work__caption');
      span1.classList.add('work__title');
      span2.classList.add('work__likes');

      // Attributes
      videoWork.setAttribute('src', `./img/${name}/`+this.video);
      videoWork.setAttribute('controls', '');
      linkMedia.setAttribute('href', `./img/${name}/`+this.video);

      // INNER HTML
      span1.innerHTML = this.title;
      span2.innerHTML = likeScore + ` <i class="fas fa-heart"></i>`;

      // Append Works
      container.append(figure);
      figure.append(linkMedia, figcaption);
      linkMedia.append(videoWork);      
      figcaption.append(span1, span2);

      ///// EVENTS
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

export{Video};