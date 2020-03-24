import isWeChat from './isWeChat';
import isIOS from './isIOS';

const INIT_WIN_HEIGHT = window.innerHeight;
const DEFAULTS = {
  maxRatio: 750 / 1206,
  bodyClass: 'has-wechat-nav',
  onTrigger: () => {}
};
let timer = null;

function checkWeChatNav({
  maxRatio = DEFAULTS.maxRatio,
  bodyClass = DEFAULTS.bodyClass,
  onTrigger = DEFAULTS.onTrigger
} = {}) {
  if ((!maxRatio && maxRatio !== 0) || typeof maxRatio !== 'number') {
    throw Error('maxRatio is required and should be number');
  }
  if (!bodyClass || typeof bodyClass !== 'string') {
    throw Error('bodyClass is required and should be string');
  }
  if (!onTrigger || typeof onTrigger !== 'function') {
    throw Error('onTrigger is required and should be function');
  }

  clearTimeout(timer);
  timer = setTimeout(() => {
    let nowWinWidth = window.innerWidth;
    let nowWinHeight = window.innerHeight;
    let nowRatio = nowWinWidth / nowWinHeight;
    if (
      isWeChat() &&
      isIOS() &&
      nowWinHeight < INIT_WIN_HEIGHT &&
      nowRatio > maxRatio
    ) {
      if (!document.body.classList.contains(bodyClass)) {
        document.body.classList.add(bodyClass);
      }
      document.body.style.height = `${nowWinHeight}px`;
      onTrigger();
    }
  }, 500);
}

export default checkWeChatNav;
