/*
 * @Author: Sexy
 * @Date: 2019-11-06 14:34:18
 * @LastEditors: Sexy
 * @LastEditTime: 2019-11-06 14:36:56
 * @Description: file content
 */
export default url => {
  return new Promise((resolve, reject) => {
    const IMG = new Image();
    IMG.onload = () => {
      setTimeout(() => {
        resolve(IMG);
      }, 100);
    };
    IMG.onerror = reject;
    IMG.src = url;
  });
};
