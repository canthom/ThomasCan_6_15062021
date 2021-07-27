class Lightbox {
    static init() {
        const medias = Array.from(document.querySelectorAll('a[href$="jpg"], a[href$="mp4"]'));
        const gallery = medias.map(media => media.getAttribute('href'));
        medias.forEach(media => media.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('href'), gallery);
        }));
    }

    constructor(url, gallery) {
        this.element = this.render(url);
        this.gallery = gallery;
        
        this.onKeyUp = this.onKeyUp.bind(this);
        document.addEventListener('keyup', this.onKeyUp);
    }

    close(e) {
        e.preventDefault();
        const divCont = document.querySelector('.lightbox-container');
        divCont.parentElement.removeChild(divCont);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    next (e) {
        e.preventDefault();
    }

    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    prev (e) {
        e.preventDefault();
    }

    render(url) {
        // Création des éléments
        const divCont = document.createElement('div');
        const divBox = document.createElement('div');
        const btnPrev = document.createElement('button');
        const fig = document.createElement('fig');
        const figCaption = document.createElement('figcaption');
        const btnNext = document.createElement('button');
        const btnClose = document.createElement('button');
        
        // Ajout des Classes
        divCont.classList.add('lightbox-container');
        divBox.classList.add('lightbox');
        btnPrev.classList.add('lightbox__previous', 'lightbox__btn');
        fig.classList.add('lightbox__figure');
        figCaption.classList.add('lightbox__caption');
        btnNext.classList.add('lightbox__next', 'lightbox__btn');
        btnClose.classList.add('lightbox__close', 'lightbox__btn');

        // INNER HTML
        figCaption.innerHTML = this.title;

        // APPEND
        document.body.append(divCont);
        divCont.append(divBox);
        divBox.append(btnPrev, fig, btnNext, btnClose);
        fig.append(figCaption);

        if (url.includes('jpg')) {
            const mediaFig = document.createElement('img');
            mediaFig.classList.add('lightbox__img');
            mediaFig.setAttribute('src', `${url}`);
            mediaFig.setAttribute('alt', `${this.title}`);
            fig.append(mediaFig);
        }

        if (url.includes('mp4')) {
            const mediaFig = document.createElement('video');
            mediaFig.classList.add('lightbox__img');
            mediaFig.setAttribute('src', `${url}`);
            mediaFig.setAttribute('alt', `${this.title}`);
            mediaFig.setAttribute('controls', '');
            fig.append(mediaFig);
        }

        // EVENTS
        btnClose.addEventListener('click', this.close.bind(this));
        btnNext.addEventListener('click', this.next.bind(this));
        btnPrev.addEventListener('click', this.prev.bind(this));
    }
}

export{Lightbox};