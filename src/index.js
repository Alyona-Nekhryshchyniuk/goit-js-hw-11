import imagesTemplate from './images.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('form');
const input = form.searchQuery;
const loadMoreBut = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '32103047-74f71fbf2b590f3c03f09df5a';
let searchTerm;
let page = 1;

const renderImages = images => {
  for (const img of images) {
    gallery.insertAdjacentHTML('beforeend', imagesTemplate(img));
  }
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
  loadMoreBut.classList.add('visible');

  searchTerm = input.value.trim();

  pixabayFetch(searchTerm)
    .then(({ hits }) => {
      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImages(hits);

        // form.reset();
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};
form.addEventListener('submit', handleFormSubmit);

const loadMoreHandle = () => {
  pixabayFetch(searchTerm, (page += 1)).then(({ hits }) => {
    renderImages(hits);
  });
};
loadMoreBut.addEventListener('click', loadMoreHandle);

input.addEventListener('focus', e => {
  console.log(`сработал фокус на ${e.currentTarget}`);

  if (gallery.innerHTML !== '') {
    form.reset();
    page = 1;
    loadMoreBut.classList.remove('visible');
    gallery.innerHTML = '';
  }
});
