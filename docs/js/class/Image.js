class Image {
  constructor(imageId, photographerId, title, image, tags, likes, date, price) {
    this.imageId = imageId;
    this.photographerId = photographerId;
    this.title = title;
    this.image = image;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  render(){
    const container = document.getElementsByClassName('work-container')[0];

    if (container) {
      // Création d'éléments
      const imageWork = document.createElement('img');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const figure = document.createElement('figure');
      const figcaption = document.createElement('figcaption');
      
      // Class List
      figure.classList.add('work');
      imageWork.classList.add('work__img');
      figcaption.classList.add('work__caption');
      span1.classList.add('work__title');
      span2.classList.add('work__likes');

      // Attributes
      imageWork.setAttribute('src', `./img/Ellie Rose/`+this.image);

      // INNER HTML
      span1.innerHTML = this.title;
      span2.innerHTML = this.likes;

      // Append Works
      container.append(figure);
      figure.append(imageWork, figcaption);
      figcaption.append(span1, span2);
    }
  }
}

export{Image};