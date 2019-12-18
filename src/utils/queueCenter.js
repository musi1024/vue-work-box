/*
 * @Author: musi
 * @Date: 2019-12-11 16:00:12
 * @LastEditors: musi
 * @LastEditTime: 2019-12-13 11:23:15
 * @Description: file content
 */

function queueCenter() {
  const list = [];
  let index = 0;

  const add = item => {
    list.push(...item);
  };
  const next = () => {
    if (index >= list.length - 1) return;
    index += 1;
    run();
  };
  const run = () => {
    const item = list[index];
    item(next);
  };
  return {
    add,
    next,
    run
  };
}

export default queueCenter;
