/**
 * @description
 * @author musi
 * @date 2019-12-02
 * @param {*} [arr=[]]
 * @param {*} e
 */

function remove(arr = [], e) {
  let index = arr.indexOf(e);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export default remove;
