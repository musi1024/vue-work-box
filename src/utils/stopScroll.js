function stopScroll() {
  document.body.addEventListener(
    'touchmove',
    function(evt) {
      if (!evt._isScroller) {
        evt.preventDefault();
      }
    },
    {
      passive: false
    }
  );
}

export default stopScroll;
