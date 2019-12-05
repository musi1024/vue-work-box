import Vue from 'vue';

function setShowPopup(store) {
  function showPopup(type, props) {
    store.commit('popup/show', { type, props });
  }
  const POPUP = {
    install() {
      Object.defineProperty(Vue.prototype, '$popup', {
        get: function get() {
          return showPopup;
        }
      });
    }
  };
  Vue.use(POPUP);
}

export default setShowPopup;
