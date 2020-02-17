function storage(area = localStorage, storeKey = '_store_base_key_') {
  // utils
  const stringify = value => JSON.stringify(value);
  const parse = value => JSON.parse(value);
  const getStorage = () => parse(area.getItem(storeKey));
  const setItem = value => area.setItem(storeKey, stringify(value));

  const has = key => {
    const storage = getStorage();
    return Boolean(key && storage && storage[key]);
  };

  const set = (key, value = null) => {
    const storage = getStorage();
    const oldValue = get(key);
    let newValue = value;
    if (typeof value === 'function') {
      newValue = value(oldValue, storage);
    }
    setItem({ ...storage, [key]: newValue });
  };

  const setMultiple = obj => {
    const storage = getStorage();
    let newObj = {};
    for (const key in obj) {
      const oldValue = get(key);
      let newValue = obj[key];
      if (typeof newValue === 'function') {
        newValue = newValue(oldValue, storage);
      }
      newObj = { ...newObj, [key]: newValue };
    }
    setItem({ ...storage, ...newObj });
  };

  const get = key => {
    const storage = getStorage();
    const value = has(key) ? storage[key] : null;
    return value;
  };

  const getAll = () => getStorage();

  const remove = key => {
    if (!has(key)) return;
    const storage = getStorage();
    storage[key] = undefined;
    setItem({ ...storage });
  };

  const removeMultiple = arr => {
    const storage = getStorage();
    arr.map(key => {
      if (!has(key)) return;
      storage[key] = undefined;
    });
    setItem({ ...storage });
  };

  const clear = () => area.removeItem(storeKey);

  return {
    has,
    get,
    getAll,
    set,
    setMultiple,
    remove,
    removeMultiple,
    clear
  };
}

export default storage;
