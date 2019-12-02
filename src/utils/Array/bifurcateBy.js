/**
 * @description
 * @author musi
 * @date 2019-12-02
 * @param {*} [arr=[]]
 * @param {*} [fn=x => x]
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
