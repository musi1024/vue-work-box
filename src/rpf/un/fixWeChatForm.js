// import isAndroid from './isAndroid';
import isIOS from './isIOS';
import isWeChat from './isWeChat';

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
    let tagName = elem.tagName.toLowerCase();
    let type = elem.getAttribute && elem.getAttribute('type');
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

function fixWeChatForm() {
  const env = {
    // android: isAndroid(),
    iOS: isIOS(),
    WeChat: isWeChat()
  };
  let timer = null;
  let scrollPos = { x: 0, y: 0 };

  function focusIn(e) {
    if (env.iOS && env.WeChat && isUnstableElem(e.target)) {
      scrollPos = getScrollPos();
    }
  }

  function focusOut() {
    if (env.iOS && env.WeChat) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isUnstableElem(document.activeElement)) {
          window.scrollTo(scrollPos.x, scrollPos.y);
        }
      }, 50);
    }
  }

  document.addEventListener('focusin', focusIn, false);
  document.addEventListener('focusout', focusOut, false);
  function destroy() {
    clearTimeout(timer);
    document.removeEventListener('focusin', focusIn, false);
    document.removeEventListener('focusout', focusOut, false);
  }
  return {
    destroy
  };
}

export default fixWeChatForm;
