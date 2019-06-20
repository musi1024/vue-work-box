/**
 *
 *
 * @param {*} str
 * @param {*} length
 * @param {string} [char=' ']
 */
function pad(str, length, char = ' ') {
  if (typeof str !== 'string') return;
  return str.padStart((str.length + length) / 2, char).padEnd(length, char);
}

export default pad;
