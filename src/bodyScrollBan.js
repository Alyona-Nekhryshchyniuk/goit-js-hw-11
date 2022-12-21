export const bodyScrollBanOnOpenLightbox = lightbox => {
  lightbox.on('show.simplelightbox', function () {
    let pagePosition = window.scrollY;
    document.body.dataset.position = pagePosition;
    document.body.classList.add('scroll-forbidden');
    document.body.style.top = -pagePosition + 'px';
  });

  lightbox.on('closed.simplelightbox', function () {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.classList.remove('scroll-forbidden');
    document.body.style.top = '';
    window.scrollTo(0, pagePosition);
    document.body.removeAttribute('data-position');
  });
};
