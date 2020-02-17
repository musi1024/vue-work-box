const BASE_KEY = '_store_';
const AREA_MAP = { local: localStorage, session: sessionStorage };

function storage() {
  let area = AREA_MAP['local'];
  // utils
  const stringify = value => JSON.stringify(value);
  const parse = value => JSON.parse(value);
  const getStorage = () => parse(area.getItem(BASE_KEY));
  const setItem = value => area.setItem(BASE_KEY, stringify(value));

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

  const clear = () => area.removeItem(BASE_KEY);

  const setStorageType = type => {
    if (!type || !['local', 'session'].includes(type)) {
      throw Error(
        `setStorageType type is required and should be local or session`
      );
    }
    area = AREA_MAP[type];
  };

  return {
    has,
    get,
    getAll,
    set,
    setAll,
    add,
    remove,
    clear,
    setStorageType
  };
}
export default storage();
