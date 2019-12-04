/**
 * @description
 * @author musi
 * @date 2019-12-04
 * @export
 * @param {*} lower
 * @param {*} upper
 * @returns
 */

export default function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
