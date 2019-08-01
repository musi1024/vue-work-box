/* ErrorPlugin.js */
/* global Sentry */
function isPromise(ret) {
  return (
    ret && typeof ret.then === 'function' && typeof ret.catch === 'function'
  );
}
const errorHandler = (error, vm, info) => {
  console.error('抛出全局异常');
  console.error(vm);
  console.error(error);
  console.error(info);

  const Extra = `${vm.$el.id || vm.$el.className}__${info}`;
  Sentry.configureScope(scope => {
    scope.setExtra('id/className__Lifecycle-Hooks', Extra);
  });

  // 接入Sentry
  if (process.env.NODE_ENV === 'production') Sentry.captureException(error);
};
function registerActionHandle(actions) {
  Object.keys(actions).forEach(key => {
    let fn = actions[key];
    actions[key] = function(...args) {
      let ret = fn.apply(this, args);
      if (isPromise(ret)) {
        return ret.catch(errorHandler);
      } else {
        // 默认错误处理
        return ret;
      }
    };
  });
}
const registerVuex = instance => {
  if (instance.$options['store']) {
    let actions = instance.$options['store']['_actions'] || {};
    if (actions) {
      let tempActions = {};
      Object.keys(actions).forEach(key => {
        tempActions[key] = actions[key][0];
      });
      registerActionHandle(tempActions);
    }
  }
};
const registerVue = instance => {
  if (instance.$options.methods) {
    let actions = instance.$options.methods || {};
    if (actions) {
      registerActionHandle(actions);
    }
  }
};

let ErrorPlugin = {
  // eslint-disable-next-line
  install: (Vue, options) => {
    /**
     * 全局异常处理
     * @param {*} error
     * @param {*} vm
     */
    Vue.config.errorHandler = errorHandler;
    Vue.mixin({
      beforeCreate() {
        registerVue(this);
        registerVuex(this);
      }
    });
    Vue.prototype.$throw = errorHandler;
  }
};

export default ErrorPlugin;
