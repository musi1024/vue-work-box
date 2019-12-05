/**
 * @description
 * @author musi
 * @date 2019-12-05
 * @export
 * @param {*} params
 * @returns
 */

export default function isObj(params) {
  return Object.prototype.toString.call(params) === '[object Object]';
}
