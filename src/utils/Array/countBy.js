/**
 *
 *
 * @param {*} [arr=[]]
 * @param {*} [fn=x => x]
 * @returns
 */

function countBy(arr = [], fn = x => x) {
  console.log(arr.map(fn));
  let res = arr.map(fn).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return res;
}

export default countBy;
