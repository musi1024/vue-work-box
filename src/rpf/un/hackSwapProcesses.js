import getIOSVersion from './getIOSVersion';

const BASE_HACK_LIST = ['12', '13'];

function createHiddenElement() {
  const div = document.createElement('div');
  div.style = `
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  pointer-events: none;
  `;
  document.body.append(div);
  return div;
}

function init() {
  const $div = createHiddenElement();

  let count = 0;
  function redraw() {
    const str = count ? count - 1 : count + 1;
    $div.innerHTML = str;
    window.requestAnimationFrame(redraw);
  }

  window.addEventListener('pageshow', redraw, { capture: false, once: true });
}

function hackIOSSwapProcessesOnCrossSiteNavigation() {
  const IOS_VERSION = getIOSVersion();
  if (!IOS_VERSION) return;
  if (BASE_HACK_LIST.includes(IOS_VERSION.split('.')[0])) {
    init();
  }
}

export default hackIOSSwapProcessesOnCrossSiteNavigation;
