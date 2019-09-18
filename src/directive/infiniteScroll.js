const isFunction = func => {
  return func && Object.prototype.toString.call(func) === '[object Function]';
};

const getPositionSize = (el, prop) => {
  return el === window || el === document
    ? document.documentElement[prop]
    : el[prop];
};

const getClientHeight = el => {
  return getPositionSize(el, 'clientHeight');
};

const scope = 'InfiniteScroll';

const handleScroll = function(cb) {
  const { vm } = this[scope];
  let shouldTrigger = false;
  const scrollBottom = this.scrollTop + getClientHeight(this);
  shouldTrigger = this.scrollHeight - scrollBottom <= 0;
  if (shouldTrigger && isFunction(cb)) {
    cb.call(vm);
  }
};

export default {
  name: 'InfiniteScroll',
  inserted(el, binding, vnode) {
    const cb = binding.value;
    const vm = vnode.context;
    const onScroll = handleScroll.bind(el, cb);
    el[scope] = { vm, onScroll };
    if (el) {
      el.addEventListener('scroll', onScroll);
    }
  },
  unbind(el) {
    const { onScroll } = el[scope];
    if (el) {
      el.removeEventListener('scroll', onScroll);
    }
  }
};
