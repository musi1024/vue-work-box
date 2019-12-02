/**
 * @description
 * @author musi
 * @date 2019-12-02
 * @param {*} [el=window]
 * @param {number} [position=0]
 */
function scrollSmoothTo(el = window, position = 0) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = callback => {
      return setTimeout(callback, 10);
    };
  }
  /* 当前滚动高度位置 */
  let scrollTop = el.scrollTop;
  /* 滚动step方法 */
  const step = () => {
    /* 距离目标滚动距离 */
    let distance = position - scrollTop;
    /* 每次目标滚动位置 */
    scrollTop = scrollTop + distance / 5;
    if (Math.abs(distance) < 1) {
      el.scrollTo(0, position);
    } else {
      el.scrollTo(0, scrollTop);
      requestAnimationFrame(step);
    }
  };
  step();
}

export default scrollSmoothTo;
