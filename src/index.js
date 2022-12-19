// ESM
import { template } from './template';
import { apiFetch } from './apiFetch';
import { bodyScrollBan } from './bodyScrollBan';
import { endPageHandle } from './endPageHandle';

// Libraries
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('form');
const input = form.searchQuery;
const loadMoreBut = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.link', {
  scrollZoom: false,
  overlayOpacity: 0.9,
});

let searchTerm;
let page = 1;
let notRenederedImgsYet;

const renderImages = images => {
  let r = images.map(img => template(img, searchTerm)).join('');

  gallery.insertAdjacentHTML('beforeend', r);
  lightbox.refresh();
  bodyScrollBan(lightbox);
};

const handleFormSubmit = e => {
  e.preventDefault();
  gallery.innerHTML = '';

  searchTerm = input.value.trim();

  apiFetch(searchTerm)
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.info(`Hooray! We found ${totalHits} images.`);
        renderImages(hits);
        notRenederedImgsYet = totalHits;
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};
form.addEventListener('submit', handleFormSubmit);

const loadMoreHandle = () => {
  loadMoreBut.classList.remove('visible');
  apiFetch(searchTerm, (page += 1)).then(({ hits }) => {
    if (!hits.length) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      renderImages(hits);
    }
  });
};

loadMoreBut.addEventListener('click', loadMoreHandle);

input.addEventListener('focus', () => {
  if (gallery.innerHTML !== '') {
    form.reset();
    page = 1;
    loadMoreBut.classList.remove('visible');
    gallery.innerHTML = '';
  }
});

window.addEventListener(
  'scroll',
  throttle(
    endPageHandle,
    1000,
    (options = { notRenederedImgsYet, loadMoreBut, page })
  )
);
