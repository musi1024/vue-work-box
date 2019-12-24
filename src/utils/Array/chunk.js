/*
 * @Author: musi
 * @Date: 2019-12-24 10:53:13
 * @LastEditors  : musi
 * @LastEditTime : 2019-12-24 10:54:37
 * @Description: file content
 */
function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export default chunk;
