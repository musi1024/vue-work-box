/**
 * @description
 * @author musi
 * @date 2019-12-04
 * @param {string} [str='']
 * @param {number} [start=0]
 * @param {number} [num=4]
 * @param {string} [mask='*']
 * @returns
 */

function mask(str = '', start = 0, num = 4, mask = '*') {
  const ss = String(str);
  const s = ss.slice(0, start);
  const c = mask.repeat(num / mask.length);
  const e = ss.slice(start + num, ss.length);
  return s + c + e;
}

export default mask;
