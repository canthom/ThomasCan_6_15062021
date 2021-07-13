class Video {
  constructor(imageId, photographerId, title, video, tags, likes, date, price) {
    this.imageId = imageId;
    this.photographerId = photographerId;
    this.title = title;
    this.video = video;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  render(){
    const container = document.getElementsByClassName('work-container')[0];

    if (container) {
      // Création d'éléments
      const videoWork = document.createElement('video');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const figure = document.createElement('figure');
      const figcaption = document.createElement('figcaption');
      
      // Class List
      figure.classList.add('work');
      videoWork.classList.add('work__img');
      figcaption.classList.add('work__caption');
      span1.classList.add('work__title');
      span2.classList.add('work__likes');

      // Attributes
      videoWork.setAttribute('src', `./img/Ellie Rose/`+this.video);
      videoWork.setAttribute('controls', '');

      // INNER HTML
      span1.innerHTML = this.title;
      span2.innerHTML = this.likes;

      // Append Works
      container.append(figure);
      figure.append(videoWork, figcaption);
      figcaption.append(span1, span2);
    }
  }
}

export{Video};