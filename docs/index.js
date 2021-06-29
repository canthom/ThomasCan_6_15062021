// ES6 Classes
class Photographer {
  constructor(userId, imgSrc, name, city, country, tagline, price, tags){
    this.userId = userId;
    this.imgSrc = imgSrc;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline; 
    this.price = price;
    this.tags = tags;
  }

  // Création de la carte Photographe
 renderPhotographer() {

  const container = document.getElementsByTagName('main')[0];
  if (container) {
    const div = document.createElement('div');
    const link = document.createElement('a');
    const image = document.createElement('img');
    const h2 = document.createElement('h2');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    const ul = document.createElement('ul');

    container.append(div);
    document.querySelector('main > div').classList.add('photographer');

    document.querySelector('.photographer').append(link, span1, span2, span3, ul);

    // Link : Image & name
    document.querySelector('.photographer > a').classList.add('photographer__link');

    document.getElementsByClassName('photographer__link')[0].append(image, h2);

    document.querySelector('.photographer__link > img').classList.add('photographer__img');
    document.querySelector('.photographer__link > img').setAttribute('src', this.imgSrc);

    document.querySelector('.photographer__link > h2').classList.add('heading-2', 'heading-2--home');
    document.querySelector('.photographer__link > h2').innerHTML = this.name;

    // Span : Location, tagline, Price
    document.querySelectorAll('.photographer > span')[0].classList.add('photographer__location');
    document.querySelectorAll('.photographer > span')[0].innerHTML = this.city + ', ' + this.country;

    document.querySelectorAll('.photographer > span')[1].classList.add('photographer__tagline');
    document.querySelectorAll('.photographer > span')[1].innerHTML = this.tagline;

    document.querySelectorAll('.photographer > span')[2].classList.add('photographer__price');
    document.querySelectorAll('.photographer > span')[2].innerHTML = this.price + '€/jour';

    // Tag List
    document.querySelector('.photographer > ul').classList.add('tags');
  }
}
}

const photographerMimi = new Photographer(1, './img/Mimi/Portrait_Nora.jpg', 'Mimi Keel', 'London', 'UK', 'Voir le beau dans le quotidien', 400, 'test');

const photographerEllie = new Photographer(2, './img/Ellie Rose/Architecture_Horseshoe.jpg', 'Ellie-Rose Wilkens', 'Paris', 'France', 'Travaille sur des compositions complexes', 250, 'test');

let photographers = [photographerMimi, photographerEllie];

for (let photographer of photographers) {
  photographer.renderPhotographer();
}