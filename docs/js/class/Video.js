import{Media} from './Media.js';

class Video extends Media {
  constructor(imageId, photographerId, title, video, tags, likes, date, price) {
    super(imageId, photographerId, title, tags, likes, date, price);

    this.video = video;
  }

  render(){
    const container = document.getElementsByClassName('work-container')[0];
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
      const icon = document.createElement('i');
      const linkMedia = document.createElement('a');
      
      // Class List
      figure.classList.add('work');
      videoWork.classList.add('work__img');
      figcaption.classList.add('work__caption');
      span1.classList.add('work__title');
      span2.classList.add('work__likes');
      icon.classList.add('fas', 'fa-heart');

      // Attributes
      videoWork.setAttribute('src', `./img/${name}/`+this.video);
      videoWork.setAttribute('controls', '');
      linkMedia.setAttribute('href', `./img/${name}/`+this.video);

      // INNER HTML
      span1.innerHTML = this.title;
      span2.innerHTML = this.likes;

      // Append Works
      container.append(figure);
      figure.append(linkMedia, figcaption);
      linkMedia.append(videoWork);      
      figcaption.append(span1, span2);
      span2.append(icon);
    }
  }
}

export{Video};