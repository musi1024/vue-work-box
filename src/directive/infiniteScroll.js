// utils
const isFunction = func => {
  return func && Object.prototype.toString.call(func) === '[object Function]';
};

const scope = 'InfiniteScroll';

const handleScroll = function(cb) {
  let shouldTrigger = false;
  const scrollBottom = this.scrollTop + this.clientHeight;
  shouldTrigger = this.scrollHeight - scrollBottom <= 0;
  if (shouldTrigger && isFunction(cb)) {
    cb.call();
  }
};

export default {
  name: 'InfiniteScroll',
  inserted(el, binding) {
    const cb = binding.value;
    const onScroll = handleScroll.bind(el, cb);
    el[scope] = { onScroll };
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
