/**
 *
 *
 * @param {*} obj
 * @param {*} fn (key, value)
 */

function omitBy(obj, fn) {
  if (typeof fn !== 'function') return;
  let res = Object.keys(obj)
    .filter(k => !fn(k, obj[k]))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
  return res;
}

export default omitBy;
