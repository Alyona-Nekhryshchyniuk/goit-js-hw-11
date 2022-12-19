const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '32103047-74f71fbf2b590f3c03f09df5a';

export const apiFetch = (item, page = 1) => {
  return fetch(
    `${BASE_URL}${API_KEY}&q=${item}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  ).then(resp => {
    return resp.json();
  });
};
