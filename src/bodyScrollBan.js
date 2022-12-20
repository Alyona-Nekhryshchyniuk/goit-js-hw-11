export const bodyScrollBanOnOpenLightbox = lightbox => {
  lightbox.on('shown.simplelightbox', function () {
    document.body.classList.add('scroll-forbidden');
  });

  lightbox.on('closed.simplelightbox', function () {
    document.body.classList.remove('scroll-forbidden');
  });
};
