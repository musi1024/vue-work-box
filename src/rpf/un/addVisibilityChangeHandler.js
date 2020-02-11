/*
 * @Author: Sexy
 * @Date: 2019-08-23 18:18:41
 * @LastEditors: Sexy
 * @LastEditTime: 2019-08-26 10:14:43
 * @Description: file content
 */

function isFun(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

function getFun(fn) {
  if (isFun(fn)) return fn;
  else return () => {};
}

/**
 * @description: 添加一个网页前后台状态变化的事件（android4.4和ios8及以上系统）
 * @param {Function|Object} obj 回调方法/回调方法对象
 * @return {Function} 删除回调的方法
 */
function addVisibilityChangeHandler(obj) {
  if (!obj) return;
  let onChange, onHide, onShow;
  if (isFun(obj)) onChange = obj;
  else {
    ({ onChange, onHide, onShow } = obj);
  }

  // 对document.hidden做前缀处理
  const prefixes = ['webkit', 'moz', 'ms', 'o'];
  const VISIBLE = 'visible',
    HIDDEN = 'hidden';
  function getHiddenProp() {
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';

    // otherwise loop over all the known prefixes until we find one
    for (let i = 0; i < prefixes.length; i++) {
      if (prefixes[i] + 'Hidden' in document) return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
  }

  // 获取document.visibilityState属性
  function getVisibilityState() {
    if ('visibilityState' in document) return 'visibilityState';
    for (let i = 0; i < prefixes.length; i++) {
      if (prefixes[i] + 'VisibilityState' in document)
        return prefixes[i] + 'VisibilityState';
    }
    // otherwise it's not supported
    return null;
  }
  let handler = null;
  // 给document添加事件
  const visProp = getHiddenProp();
  let evtname = '';
  if (visProp) {
    evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
    handler = () => {
      const visibilityState = document[getVisibilityState()];
      if (visibilityState === VISIBLE) {
        getFun(onShow)();
      } else if (visibilityState === HIDDEN) {
        getFun(onHide)();
      }
      getFun(onChange)(visibilityState);
    };
    document.addEventListener(evtname, handler, false);
  }
  return () => {
    handler && document.removeEventListener(evtname, handler);
  };
}

export default addVisibilityChangeHandler;
