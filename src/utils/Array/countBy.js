/**
 *
 *
 * @param {*} arr
 * @param {*} fn
 * @returns
 */

function countBy(arr = [], fn) {
  let res = arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  return res;
}

export default countBy;
