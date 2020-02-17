function storage(area = localStorage, storeKey = '_store_base_key_') {
  // utils
  const stringify = value => JSON.stringify(value);
  const parse = value => JSON.parse(value);
  const getStorage = () => parse(area.getItem(storeKey));
  const setItem = value => area.setItem(storeKey, stringify(value));

  const clear = () => area.removeItem(storeKey);

  const has = key => {
    const storage = getStorage();
    return Boolean(key && storage && storage[key]);
  };

  const set = (key, value) => {
    if (!value || typeof value === 'function') {
      throw Error(`key:${key} value is required and should not be function`);
    }
    const storage = getStorage();
    setItem({ ...storage, [key]: value });
  };

  const setAll = data => {
    for (const key in data) {
      set(key, data[key]);
    }
  };

  const get = key => {
    if (!has(key)) {
      throw Error(`key:${key} is not exist`);
    }
    const storage = getStorage();
    return storage[key];
  };

  const getAll = () => getStorage();

  const add = (key, value) => {
    const exValue = get(key);
    let res;
    if (Array.isArray(exValue)) {
      res = exValue.concat(value);
    } else if (typeof exValue === 'object' && typeof value === 'object') {
      res = { ...exValue, ...value };
    } else if (typeof exValue === typeof value) {
      res = value + exValue;
    } else {
      res = value;
    }
    set(key, res);
  };

  const remove = key => {
    const storage = getStorage();
    if (storage[key]) return;
    storage[key] = undefined;
    setItem({ ...storage });
  };
  return {
    has,
    get,
    getAll,
    set,
    setAll,
    add,
    remove,
    clear
  };
}
export default storage;
