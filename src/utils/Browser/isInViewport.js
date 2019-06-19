/**
 *
 *
 * @param {*} el
 * @param {boolean} [partiallyVisible=false]
 * @returns
 */

function isInViewport(el, partiallyVisible = false) {
  const top = Math.round(el.getBoundingClientRect().top);
  const bottom = Math.round(el.getBoundingClientRect().bottom);
  const left = Math.round(el.getBoundingClientRect().left);
  const right = Math.round(el.getBoundingClientRect().right);
  const { innerHeight, innerWidth } = window;
  console.log(top, left, bottom, right);
  console.log(innerHeight, innerWidth);
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

export default isInViewport;
