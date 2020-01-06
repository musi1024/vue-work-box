/*
 * @Author: musi
 * @Date: 2020-01-06 11:28:35
 * @LastEditors  : musi
 * @LastEditTime : 2020-01-06 11:29:03
 * @Description: file content
 */
export default (len = 32) => {
  const CHATS = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const MAX_POS = CHATS.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += CHATS[Math.floor(Math.random() * MAX_POS)];
  }
  return pwd;
};
