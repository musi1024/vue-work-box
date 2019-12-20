import Vue from 'vue';
import popupMixin from '@/mixins/popupMixin';
import popupList from '@/custom/popupList';

const con = document.createElement('div');
document.body.appendChild(con);

const instances = [];
const comps = [];

function openPopup(compName, param, recreate = true) {
  const comp = popupList[compName];
  let ins;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      Object.assign(promise, { resolve, reject });
    }, 10);
  });
  promise.finally(() => {
    if (recreate) {
      con.removeChild(ins.$el);
      ins.$destroy();
    }
  });

  if (!recreate && comps.indexOf(comp) > -1) {
    const ins = instances[comps.indexOf(comp)];
    ins.$options.promise = promise;
    ins.open(param);
    return ins.getPromise();
  }

  comp.mixins = comp.mixins || [];
  if (comp.mixins.indexOf(popupMixin) < 0) {
    comp.mixins.push(popupMixin);
  }

  ins = new Vue({ promise, ...comp }).$mount();
  con.appendChild(ins.$el);
  ins.open(param);
  if (!recreate) {
    comps.push(comp);
    instances.push(ins);
  }
  return ins.getPromise();
}

export default {
  install() {
    Object.defineProperty(Vue.prototype, '$popup', {
      get: function get() {
        return openPopup;
      }
    });
  }
};
