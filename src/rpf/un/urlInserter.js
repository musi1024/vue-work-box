/**
 *
 * @param {String} origin 原地址的例子（例如金管家回流地址）
 * @param {String} url 需要插入的地址
 * @param {Object} querys 需要附带在最外层地址的参数,如{ s_oid:"123123" }
 * @return {String} 替换完毕的地址
 *
 */
function urlInserter({ origin, url, querys = {} } = {}) {
  if (Object.prototype.toString.call(origin) !== '[object String]')
    throw TypeError('origin参数需要传入一个字符串');
  if (Object.prototype.toString.call(url) !== '[object String]')
    throw TypeError('url参数需要传入一个字符串');
  if (Object.prototype.toString.call(querys) !== '[object Object]')
    throw TypeError('querys参数需要传入一个对象');
  const encodedCount = encodeCounter(origin);
  if (encodedCount < 1) throw new Error('原网址未编码');
  const urlNeedToBeInserted = encodeUrl(url, encodedCount);
  const urlNeedToBeReplaced = getUrlNeedToBeReplaced(origin, encodedCount);
  let result = origin.replace(urlNeedToBeReplaced, urlNeedToBeInserted);
  result = addQuery(result, querys);
  return result;
}

function addQuery(url, querys) {
  const keys = Object.keys(querys);
  let result = url;
  if (keys.length <= 0) return result;
  for (let key of keys) {
    result += `&${key}=${querys[key]}`;
  }
  return result;
}

function encodeUrl(url, encodedCount) {
  let i = encodedCount;
  let tempUrl = url;
  while (i--) {
    tempUrl = encodeURIComponent(tempUrl);
  }
  return tempUrl;
}

function getUrlNeedToBeReplaced(origin, encodedCount) {
  // 编码1次
  if (encodedCount === 1) {
    return origin
      .match(new RegExp(`(=)http([\\s\\S]*?)(?=(&|(\\b)$))`))[0]
      .slice(1);
  }

  // 根据编码次数找出待替换地址的开头
  // 待替换地址的上一层的'25'的数量
  let amountOf25 = encodedCount - 2;
  let leftPad = (() => {
    let i = amountOf25;
    let res = '%';
    if (i <= 0) return res + '3D';
    while (i--) {
      res += '25';
    }
    return res + '3D';
  })();

  // 右端匹配语句不断增加'25'的数量找出待替换的地址
  let rightPad = '';
  if (amountOf25 < 1) {
    return origin
      .match(
        new RegExp(`(${leftPad})http([\\s\\S]*?)(?=(%${rightPad}26|(\\b)$))`)
      )[0]
      .replace(leftPad, '');
  } else {
    // 待替换的地址后的第一个编码过的 & 号或字符串末为其末尾，匹配长度最短的为待替换地址
    let i = amountOf25;
    let res, temp;
    while (i--) {
      temp = origin.match(
        new RegExp(`(${leftPad})http([\\s\\S]*?)(?=(%${rightPad}26|(\\b)$))`)
      )[0];
      if (!res || temp.length < res.length) {
        res = temp;
      }
      rightPad += '25';
    }
    return res.replace(leftPad, '');
  }
}
function encodeCounter(url) {
  let count = 0;
  function fn(url) {
    let decoded = decodeURIComponent(url);
    if (decoded === url) {
      return;
    } else {
      count++;
      fn(decoded);
    }
  }
  fn(url);
  return count;
}
export default urlInserter;
