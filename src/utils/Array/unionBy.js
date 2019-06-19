/**
 *
 *
 * @param {*} [arr1=[]]
 * @param {*} [arr2=[]]
 * @param {*} [fn=x => x]
 * @returns
 */

function unionBy(arr1 = [], arr2 = [], fn = x => x) {
  const s = new Set(arr1.map(fn));
  return Array.from(new Set([...arr1, ...arr2.filter(x => !s.has(fn(x)))]));
}

export default unionBy;
