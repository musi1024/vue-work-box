/**
 * @description
 * @author musi
 * @date 2019-12-04
 * @param {*} obj
 * @param {*} fn
 * @returns
 */

function omitBy(obj, fn) {
  if (typeof fn !== 'function') return;
  let res = Object.keys(obj)
    .filter(k => !fn(k, obj[k]))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
  return res;
}

export default omitBy;
