import storage from '@/utils/Others/storage';

function setStoragePlugin(options = {}) {
  const key = options.key || 'vuex';
  const _storage = storage(options.storage || localStorage);
  const filterSet = options.filterSet || (() => true);
  const filterGet = options.filterGet || (() => true);

  function getStorage(storage, state) {
    let data = {};
    for (const key in storage) {
      if (
        filterGet(key) &&
        storage.hasOwnProperty(key) &&
        state.hasOwnProperty(key)
      ) {
        data = { ...data, [key]: storage[key] };
      }
    }
    return data;
  }

  return function(store) {
    if (_storage.has(key)) {
      const data = getStorage(_storage.get(key), store.state);
      store.replaceState({ ...store.state, ...data });
    }
    store.subscribe((mutation, state) => {
      if (filterSet(mutation)) {
        _storage.set(key, state);
      }
    });
  };
}

export default setStoragePlugin;
