/**
 * @description
 * @author musi
 * @date 2019-12-02
 * @param {*} [arr=[]]
 * @param {*} [fn=x => x]
 * @returns
 */

function countBy(arr = [], fn = x => x) {
  let res = arr.map(fn).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return res;
}

export default countBy;
