// ES6 Classes
class Photographer {
  constructor(id, portrait, name, city, country, tagline, price, tags){
    this.id = id;
    this.portrait = portrait;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline; 
    this.price = price;
    this.tags = tags;
  }

  // PROTOTYPES
  // Création de la carte Photographe
  render() {
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
      

      div.classList.add('photographer');
      // Link : Image & name
      link.classList.add('photographer__link');
      link.setAttribute('href', `#${this.name}`);
      image.classList.add('photographer__img');
      image.setAttribute('src', `./img/Photographers ID Photos/`+this.portrait);
      image.setAttribute('alt', this.name);

      h2.classList.add('heading-2', 'heading-2--home');
      h2.innerHTML = this.name;

      // Span : Location, tagline, Price
      span1.classList.add('photographer__location');
      span1.innerHTML = this.city + ', ' + this.country;

      span2.classList.add('photographer__tagline');
      span2.innerHTML = this.tagline;

      span3.classList.add('photographer__price');
      span3.innerHTML = this.price + '€/jour';

      // Tag List
      ul.classList.add('tags');
      this.tags.forEach(element => {
        const li = document.createElement('li');
        const liLink = document.createElement('a');
      
        li.classList.add('tags__item');
        liLink.classList.add('tags__link');
        liLink.setAttribute('href', '#');
        liLink.innerHTML = `#${element}`;

        ul.append(li);
        li.append(liLink);
      });

      // Append 
      link.append(image, h2);
      div.append(link, span1, span2, span3, ul);
      container.append(div);
    }
  }
}

// Récupérer les données depuis le fichier JSON
fetch('FishEyeData.json').then( (data) => {
  return data.json();
}).then( (result) => {

  for (let photographerData of result.photographers) {
    const photographer = new Photographer(photographerData.id, photographerData.portrait, photographerData.name, photographerData.city, photographerData.country, photographerData.tagline, photographerData.price, photographerData.tags);
    photographer.render();
  }
}).catch( (err) => {
  alert(err);
});


// URL
const fishEye = new URL('https://canthom.github.io/ThomasCan_6_15062021/');
console.log(fishEye);