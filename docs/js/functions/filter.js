import {Photographer} from "../class/Photographer.js";

export function filter(photographerList, tag) {
  const container = document.querySelector("main");
  container.innerHTML = "";
  const filteredPhotographer = photographerList.filter(el => el.tags.includes(tag));

  const url = new URL(window.location);
  url.searchParams.set('tag', tag);
  window.history.pushState({}, '', url);

  for (let photographerData of filteredPhotographer) {
    const photographer = new Photographer(photographerData.id, photographerData.portrait, photographerData.name, photographerData.city, photographerData.country, photographerData.tagline, photographerData.price, photographerData.tags, (tag) => {filter(photographerList, tag)});
    photographer.renderHomepage();
  }
}