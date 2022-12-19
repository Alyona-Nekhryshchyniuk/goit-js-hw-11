const body = document.querySelector('body');

export const bodyScrollBan = lightbox => {
  lightbox.on('shown.simplelightbox', function () {
    body.classList.add('scroll-forbidden');
  });

  lightbox.on('closed.simplelightbox', function () {
    body.classList.remove('scroll-forbidden');
  });
};
