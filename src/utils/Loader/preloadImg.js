/*
 * @Author: musi
 * @Date: 2019-12-09 17:19:35
 * @LastEditors  : musi
 * @LastEditTime : 2019-12-24 18:02:05
 * @Description: file content
 */

import imgLoader from '@/utils/Loader/imgLoader';
import chunk from '@/utils/Array/chunk';

async function preloadImg(
  list = [],
  chunkSize = 0,
  onFinishAll = () => {},
  onFinishOne = () => {},
  onError = () => {}
) {
  if (!Array.isArray(list)) {
    throw Error('list should be array');
  }
  if (typeof chunkSize !== 'number') {
    throw Error('chunkSize is required and should be number');
  }
  if (!onFinishOne || typeof onFinishOne !== 'function') {
    throw Error('onFinishOne is required and should be function');
  }
  if (!onFinishAll || typeof onFinishAll !== 'function') {
    throw Error('onFinishAll is required and should be function');
  }
  if (!onError || typeof onError !== 'function') {
    throw Error('onError is required and should be function');
  }

  function imgsPreload(list) {
    const loadPromiseList = list.map(src =>
      imgLoader(src)
        .then(img => onFinishOne(img))
        .catch(error => {
          onError(error);
        })
    );
    return Promise.all(loadPromiseList);
  }

  if (!list.length) {
    onFinishAll();
    return;
  }
  if (chunkSize) {
    const chunks = chunk(list, chunkSize);
    for (let c of chunks) {
      await imgsPreload(c);
    }
    onFinishAll();
  } else {
    await imgsPreload(list);
    onFinishAll();
  }
}

export default preloadImg;
