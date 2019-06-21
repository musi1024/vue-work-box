/**
 *
 *
 * @param {string} [str='']
 * @param {number} [start=0]
 * @param {number} [num=4]
 * @param {string} [mask='*']
 * @returns
 */

function mask(str = '', start = 0, num = 4, mask = '*') {
  let target = str.slice(start, start + num);
  let replace = mask.repeat(num / mask.length);
  return str.replace(target, replace);
}

export default mask;
