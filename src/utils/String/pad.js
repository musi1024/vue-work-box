/**
 * @description
 * @author musi
 * @date 2019-12-04
 * @param {*} str
 * @param {*} length
 * @param {string} [char=' ']
 * @returns
 */

function pad(str, length, char = ' ') {
  if (typeof str !== 'string') return;
  return str.padStart((str.length + length) / 2, char).padEnd(length, char);
}

export default pad;
