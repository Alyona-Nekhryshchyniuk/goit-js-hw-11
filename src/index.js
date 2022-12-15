import imagesTemplate from './images.hbs';

const gallery = document.querySelector('.gallery');
// const button = document.querySelecto'r('button');
const form = document.querySelector('form');
const input = form.searchQuery;

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '32103047-74f71fbf2b590f3c03f09df5a';

const pixabayFetch = item => {
  return fetch(
    `${BASE_URL}${API_KEY}&q=${item}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5`
  ).then(resp => {
    return resp.json();
  });
};

const render = () => {};

const handleFormSubmit = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  let searchTerm = input.value.trim();
  pixabayFetch(searchTerm).then(({ hits }) => {
    for (const imgObj of hits) {
      gallery.insertAdjacentHTML('beforeend', imagesTemplate(imgObj));

      //   render(
      //     ({
      //       webformatURL,
      //       largeImageURL,
      //       tags,
      //       likes,
      //       views,
      //       comments,
      //       downloads,
      //     } = imgObj)
      //   );
    }
  });
};
form.addEventListener('submit', handleFormSubmit);
