import storage from '@/utils/Others/storage';

const key = 'vuex';
const _storage = storage();

function filterStorage(storage, state) {
  let data = {};
  for (const key in storage) {
    if (storage.hasOwnProperty(key) && state.hasOwnProperty(key)) {
      data = { ...data, [key]: storage[key] };
    }
  }
  return data;
}

function storagePlugin(store) {
  if (_storage.has(key)) {
    const data = filterStorage(_storage.get(key), store.state);
    store.replaceState({ ...store.state, ...data });
  }
  store.subscribe((mutation, state) => {
    _storage.set(key, state);
  });
}

export default storagePlugin;
