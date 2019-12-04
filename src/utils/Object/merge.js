/**
 * @description
 * @author musi
 * @date 2019-12-04
 * @param {*} objs
 * @returns
 */

import uniqueBy from '../Array/uniqueBy';
import equals from '../Object/equals';

function merge(...objs) {
  let res = {};
  [...objs].forEach(obj => {
    Object.keys(obj).map(key => {
      res[key] = res.hasOwnProperty(key)
        ? uniqueBy([].concat(res[key]).concat(obj[key]), (x, y) => equals(x, y))
        : obj[key];
    });
  });
  return res;
}

export default merge;
