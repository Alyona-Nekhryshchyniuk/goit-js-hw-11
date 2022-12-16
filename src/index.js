import imagesTemplate from './images.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('form');
const input = form.searchQuery;

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '32103047-74f71fbf2b590f3c03f09df5a';

const fetch = item => {
  return fetch(
    `${BASE_URL}${API_KEY}&q=${item}&image_type=photo&orientation=horizontal&safesearch=true&per_page=25`
  ).then(resp => {
    return resp.json();
  });
};

const handleFormSubmit = e => {
  e.preventDefault();
  gallery.innerHTML = '';

  let searchTerm = input.value.trim();

  fetch(searchTerm)
    .then(({ hits }) => {
      console.log(hits);
      // if (hits === []) {
      //   Notify.failure('hhhh');
      // } else {
      for (const imgObj of hits) {
        gallery.insertAdjacentHTML('beforeend', imagesTemplate(imgObj));
      }
      // }
    })
    .catch(error => {
      console.log(error.message);
    });
};
form.addEventListener('submit', handleFormSubmit);
