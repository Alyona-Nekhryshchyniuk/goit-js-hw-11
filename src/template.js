export const template = (
  { largeImageURL, webformatURL, likes, views, comments, downloads },
  searchTerm
) => {
  return `<a href='${largeImageURL}' class='link'>
  <div class='photo-card'>
    <img src='${webformatURL}' alt='picture of ${searchTerm}' loading='lazy' />
    <div class='info'>
      <p class='info-item'>
        <b>Likes<br>${likes}</b>
      </p>
      <p class='info-item'>
        <b>Views<br>${views}</b>
      </p>
      <p class='info-item'>
        <b>Comments<br>${comments}</b>
      </p>
      <p class='info-item'>
        <b>Downloads<br>${downloads}</b>
      </p>
    </div>
  </div>
</a>`;
};
