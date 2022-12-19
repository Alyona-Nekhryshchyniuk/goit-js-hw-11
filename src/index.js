import { template } from './template.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('form');

const input = form.searchQuery;
const loadMoreBut = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '32103047-74f71fbf2b590f3c03f09df5a';
let searchTerm;
let page = 1;
let allAvailableImgs;

const renderImages = images => {
  let img = images
    .map(img => {
      return template(img);
    })
    .join();

  gallery.insertAdjacentHTML('beforeend', img);

  new SimpleLightbox('.link', {
    captionDelay: '250',
  });
};

const pixabayFetch = (item, page = 1) => {
  return fetch(
    `${BASE_URL}${API_KEY}&q=${item}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  ).then(resp => {
    return resp.json();
  });
};

const handleFormSubmit = e => {
  e.preventDefault();
  gallery.innerHTML = '';

  searchTerm = input.value.trim();

  pixabayFetch(searchTerm)
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.info(`Hooray! We found ${totalHits} images.`);
        renderImages(hits);
        allAvailableImgs = totalHits;
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};
form.addEventListener('submit', handleFormSubmit);

const loadMoreHandle = () => {
  loadMoreBut.classList.remove('visible');
  pixabayFetch(searchTerm, (page += 1)).then(({ hits }) => {
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

const EndPageCheck = () => {
  let pageEnd =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  let alreadyRendered = page * 40;

  if (pageEnd && allAvailableImgs > alreadyRendered) {
    console.log(`alreadyRendered ${alreadyRendered}`);
    console.log('yellow but must appear');
    loadMoreBut.classList.add('visible');
  } else if (pageEnd) {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
};

window.addEventListener('scroll', throttle(EndPageCheck, 1000));
