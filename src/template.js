export const template = obj => {
  return `<a href='${obj.largeImageURL}' class='link'>
  <div class='photo-card'>
    <img src='${obj.webformatURL}' alt='' loading='lazy' />
    <div class='info'>
      <p class='info-item'>
        <b>Likes ${obj.likes}</b>
      </p>
      <p class='info-item'>
        <b>Views ${obj.views}</b>
      </p>
      <p class='info-item'>
        <b>Comments ${obj.comments}</b>
      </p>
      <p class='info-item'>
        <b>Downloads ${obj.downloads}</b>
      </p>
    </div>
  </div>
</a>`;
};
