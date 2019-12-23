/*
 * @Author: musi
 * @Date: 2019-12-09 11:13:49
 * @LastEditors  : musi
 * @LastEditTime : 2019-12-23 10:30:10
 * @Description: file content
 */
import binCache from './binCache';
import fetchAsDataURL from './fetchAsDataURL';
export default key => {
  const value = binCache.get(key);
  if (value) {
    return value;
  } else {
    const fetchPromise = fetchAsDataURL(key).then(fetchRes => {
      return fetchRes.result;
    });
    binCache.set(key, fetchPromise);
    return fetchPromise;
  }
};
