let startX = 0,
  startY = 0,
  bx = 0,
  by = 0,
  endX = 0,
  endY = 0,
  eHeight = 0,
  eWidht = 0;

function moveX() {
  let res;
  let x = endX + bx;
  if (x >= 0) {
    res = 0;
  } else if (Math.abs(x) >= eWidht - window.innerWidth) {
    res = -(eWidht - window.innerWidth);
  } else {
    res = x;
  }
  return res;
}

function moveY() {
  let res;
  let y = endY + by;
  if (y >= 0) {
    res = 0;
  } else if (Math.abs(y) >= eHeight - window.innerHeight) {
    res = -(eHeight - window.innerHeight);
  } else {
    res = y;
  }
  return res;
}

export default function move(el) {
  eHeight = el.getBoundingClientRect().height;
  eWidht = el.getBoundingClientRect().width;
  window.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  window.addEventListener('touchmove', e => {
    bx = e.touches[0].clientX - startX;
    by = e.touches[0].clientY - startY;
    el.style.transform = `translate3d(${moveX()}px, ${moveY()}px, 0)`;
  });
  window.addEventListener('touchend', () => {
    endX = moveX();
    endY = moveY();
    bx = 0;
    by = 0;
  });
}
