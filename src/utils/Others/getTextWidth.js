/*
 * @Author: musi
 * @Date: 2019-12-10 10:20:44
 * @LastEditors: musi
 * @LastEditTime: 2019-12-10 10:29:34
 * @Description: file content
 */
function getTextWidth(font, text) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const dd = {
    font: font || '16px Arial',
    text: text || '[text]',
    fill: '#000',
    x: 0,
    y: 0
  };
  ctx.save();
  ctx.font = dd.font;
  return ctx.measureText(dd.text).width;
}

export default getTextWidth;
