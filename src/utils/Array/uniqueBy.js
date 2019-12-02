/**
 * @description
 * @author musi
 * @date 2019-12-02
 * @param {*} [arr=[]]
 * @param {*} [fn=(x, y) => x === y]
 * @returns
 */

function uniqueBy(arr = [], fn = (x, y) => x === y) {
  let res = arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);
  return res;
}

export default uniqueBy;
