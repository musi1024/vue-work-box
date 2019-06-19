/* 禁止 touchmove，需要滚动的元素使用 ScrollWrap 组件包裹 */
function stopTouchMove() {
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

export default stopTouchMove;
