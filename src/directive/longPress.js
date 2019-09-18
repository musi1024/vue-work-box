let handlerTouchstart, handlerTouchmove, handlerTouchend, handlerContextmenu;
function bind(el, binding, vNode) {
  let r = null; // setTimeout
  let startX = 0, // touchstart 时手指的位置，用于 touchmove 时判断手指是否移动
    startY = 0;
  let firstTouch = false;
  let delayTime = 350;
  let disX = 10,
    disY = 10;
  let value = binding.value;
  if (
    value &&
    value.time &&
    Number.isInteger(value.time) &&
    value.time >= 500
  ) {
    delayTime = value.time;
  }
  if (value && value.disX && Number.isInteger(value.disX)) {
    disX = value.disX;
  }
  if (value && value.disY && Number.isInteger(value.disY)) {
    disY = value.disY;
  }

  handlerTouchstart = function(event) {
    firstTouch = true;
    let touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    r = setTimeout(() => {
      r = null;
      if (typeof value === "function") {
        value(event, el, vNode);
        event.preventDefault();
        return;
      } else if (
        value &&
        value.handler &&
        typeof value.handler === "function"
      ) {
        value.handler(event, el, vNode);
        event.preventDefault();
        return;
      }
    }, delayTime);
    touch = null;
  };
  handlerTouchmove = function(event) {
    let touch = event.changedTouches[0];
    let diffX = Math.abs(touch.clientX - startX);
    let diffY = Math.abs(touch.clientY - startY);
    if ((disX > 0 && diffX > disX) || (disY > 0 && diffY > disY)) {
      firstTouch;
      if (r) {
        clearTimeout(r);
        r = null;
      }
      firstTouch = false;
    }
    touch = null;
  };
  handlerTouchend = function(event) {
    firstTouch = false;
    if (r) {
      clearTimeout(r);
      r = null;
    }
    event.preventDefault();
  };
  handlerContextmenu = function(event) {
    event.preventDefault();
  };
  el.addEventListener("touchstart", handlerTouchstart, false);
  el.addEventListener("touchmove", handlerTouchmove, false);
  el.addEventListener("touchend", handlerTouchend, false);
  el.addEventListener("contextmenu", handlerContextmenu);
}
function unbind(el) {
  el.removeEventListener("touchstart", handlerTouchstart);
  el.removeEventListener("touchmove", handlerTouchmove);
  el.removeEventListener("touchend", handlerTouchend);
  el.removeEventListener("contextmenu", handlerContextmenu);
}

export default {
  bind,
  unbind
};
