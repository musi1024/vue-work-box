import isIOS from './isIOS';

function getScrollPos() {
  return {
    x: Math.max(
      window.pageXOffset,
      document.documentElement.scrollLeft,
      document.body.scrollLeft
    ),
    y: Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    )
  };
}

function isUnstableElem(elem) {
  if (elem) {
    const tagName = elem.tagName.toLowerCase();
    const type = elem.getAttribute && elem.getAttribute('type');
    return (
      ['select', 'textarea'].indexOf(tagName) !== -1 ||
      (tagName === 'input' &&
        [
          'color',
          'date',
          'datetime-local',
          'email',
          'month',
          'number',
          'password',
          'search',
          'tel',
          'text',
          'time',
          'url',
          'week'
        ].indexOf(type) !== -1)
    );
  }
  return false;
}

const env = {
  iOS: isIOS()
};
let focusing = false;
let timer = null;
let scrollPos = { x: 0, y: 0 };

function focusIn(e) {
  if (env.iOS && isUnstableElem(e.target)) {
    focusing = true;
    scrollPos = getScrollPos();
  }
}

function focusOut(e) {
  focusing = false;
  if (env.iOS) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (
        (!focusing && !isUnstableElem(document.activeElement)) ||
        e.target === document.activeElement
      ) {
        window.scrollTo(scrollPos.x, scrollPos.y);
      }
    }, 50);
  }
}

function fixIOSForm() {
  function destroy() {
    clearTimeout(timer);
    document.removeEventListener('focusin', focusIn, false);
    document.removeEventListener('focusout', focusOut, false);
  }
  destroy();
  document.addEventListener('focusin', focusIn, false);
  document.addEventListener('focusout', focusOut, false);
  return {
    destroy
  };
}

export default fixIOSForm;
