import imagesTemplate from './images.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import throttle from 'lodash.throttle';

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
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log('gggg');
    loadMoreBut.classList.add('visible');
  }
};

window.addEventListener('scroll', throttle(EndPageCheck, 1000));

// element.addEventListener('scroll', function(event)
// {
//     var element = event.target;
//     if (element.scrollHeight - element.scrollTop === element.clientHeight)
//     {
//         console.log('scrolled');
//     }
// });

// element.scrollHeight - element.scrollTop === element.clientHeight
