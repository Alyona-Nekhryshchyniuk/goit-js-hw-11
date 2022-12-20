// ESM
import { template } from './template';
import { apiFetch } from './apiFetch';
import { bodyScrollBanOnOpenLightbox } from './bodyScrollBan';

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

let searchTerm;
let page = 1;
let totalBalance;
let alreadyRendered = 0;

const lightbox = new SimpleLightbox('.link', {
  scrollZoom: false,
  overlayOpacity: 0.9,
});
const renderImages = images => {
  alreadyRendered += images.length;
  let templateForAll = images.map(img => template(img, searchTerm)).join('');

  gallery.insertAdjacentHTML('beforeend', templateForAll);
  lightbox.refresh();
  bodyScrollBanOnOpenLightbox(lightbox);
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
        totalBalance = totalHits;
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};
form.addEventListener('submit', handleFormSubmit);

const loadMoreHandle = () => {
  loadMoreBut.classList.remove('visible');
  console.log('removed visible');
  apiFetch(searchTerm, (page += 1)).then(({ hits }) => {
    if (!hits.length) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      renderImages(hits);
    }
  });
};

loadMoreBut.addEventListener('click', loadMoreHandle);

input.addEventListener('focus', () => {
  if (gallery.innerHTML !== '') {
    alreadyRendered = 0;
    form.reset();
    page = 1;
    loadMoreBut.classList.remove('visible');
    console.log('removed visible');
    gallery.innerHTML = '';
  }
});

const endPageHandle = () => {
  let pageEnd =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (pageEnd && totalBalance > alreadyRendered) {
    loadMoreBut.classList.add('visible');
    console.log('added visible');
  } else if (pageEnd) {
    Notify.info("We're sorry.");
    // Notify.info("We're sorry, but you've reached the end of search results.");
  }
};

window.addEventListener('scroll', throttle(endPageHandle, 1250));
