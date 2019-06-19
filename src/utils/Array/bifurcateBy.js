/**
 *
 *
 * @param {*} arr
 * @param {*} fn
 * @returns
 */

function bifurcateBy(arr = [], fn = x => x) {
  let res = arr.reduce(
    (acc, val, i) => {
      acc[fn(val, i) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
  return res;
}

export default bifurcateBy;
