let pageEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight;

export const EndPageHandle = (notRenederedImgsYet, loadMoreBut, page) => {
  let alreadyRendered = page * 40;
  if (pageEnd && notRenederedImgsYet > alreadyRendered) {
    loadMoreBut.classList.add('visible');
  } else if (pageEnd) {
    console.log('jj');
    // Notify.info("We're sorry, but you've reached the end of search results.");
  }
};
