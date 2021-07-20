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
  // Création de la carte Photographe HOMEPAGE
  renderHomepage() {
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
      
      // Class List
      div.classList.add('photographer');
      link.classList.add('photographer__link');
      image.classList.add('photographer__img');
      h2.classList.add('heading-2', 'heading-2--home');
      span1.classList.add('photographer__location');
      span2.classList.add('photographer__tagline');
      span3.classList.add('photographer__price');
      ul.classList.add('tags');

      // Set Attribute
      const nameSplit = this.name.split(' ');
      link.setAttribute('href', `page.html?id=${this.id}&name=${nameSplit[0]}`);
      image.setAttribute('src', `./img/Photographers ID Photos/`+this.portrait);
      image.setAttribute('alt', this.name);

      // INNER HTML
      h2.innerHTML = this.name;
      span1.innerHTML = this.city + ', ' + this.country;
      span2.innerHTML = this.tagline;
      span3.innerHTML = this.price + '€/jour';

      // Tag List
      this.tags.forEach(element => {
        const li = document.createElement('li');
        const liLink = document.createElement('a');
      
        li.classList.add('tags__item');
        liLink.classList.add('tags__link');
        liLink.setAttribute('href', `?tag=${element}`);
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

  // Création de la carte Photographe PORTFOLIO
  renderPortfolio() {
    const container = document.getElementsByTagName('main')[0];
    if (container) {
      // récupération du DOM
      const price = document.getElementsByClassName('cta__prices')[0];
      price.innerHTML = `${this.price}€/jour`

      // Création d'éléments
      const header = document.createElement('header');
      const divProfile = document.createElement('div');
      const divInfo = document.createElement('div');
      const imageProfile = document.createElement('img');
      const h1 = document.createElement('h1');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const ul = document.createElement('ul');
      const btn = document.createElement('button');

      // TEST
      const modalCont = document.querySelector('.modal-container');
      const spanName = document.querySelector('h1 > span');
      spanName.innerHTML = this.name;
      btn.addEventListener('click', launchModal);
      function launchModal() {
        modalCont.style.display = "grid";
      }
      // TEST
 
      // Class List
      header.classList.add('photographer-header');
      divProfile.classList.add('photographer-header__profile');
      h1.classList.add('heading-1', 'photographer-header__title');
      divInfo.classList.add('photographer-header__info');
      span1.classList.add('photographer-header__location');
      span2.classList.add('photographer-header__quote');
      imageProfile.classList.add('photographer-header__img');
      btn.classList.add('btn', 'btn-cta--desktop');

      // Attributes
      imageProfile.setAttribute('src', `./img/Photographers ID Photos/`+this.portrait);
      imageProfile.setAttribute('alt', this.name);

      // INNER HTML
      h1.innerHTML = this.name;
      span1.innerHTML = this.city + ', ' + this.country;
      span2.innerHTML = this.tagline;
      btn.innerHTML = 'Contactez-moi';

      // Tags
      ul.classList.add('tags', 'tags--page');
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

      // Append Header
      const section = document.getElementsByTagName('section')[0];
      container.insertBefore(header, section);
      header.append(divProfile, imageProfile);
      divProfile.append(h1);
      divProfile.append(divInfo);
      divProfile.append(ul);
      divInfo.append(span1);
      divInfo.append(span2);
      divProfile.append(btn);
    }
  }
}

export{Photographer};