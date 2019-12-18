import URLParse from 'url-parse';
import qs from 'qs';

// steal from 'ramda'
function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
}

function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}

function filterQuery(url, omitQuery = [], mergeQuery = {}, nextHash = '') {
  if (typeof url !== 'string') {
    throw Error('url is required and should be string');
  }
  if (!Array.isArray(omitQuery)) {
    throw Error('omitQuery should be array');
  }
  if (typeof mergeQuery !== 'object') {
    throw Error('mergeQuery should be object');
  }
  if (typeof nextHash !== 'string') {
    throw Error('nextHash should be string');
  }
  const pUrl = new URLParse(url);
  const oldQuery = qs.parse(pUrl.query.slice(1));
  const nextQuery = {
    ...omit(omitQuery, oldQuery),
    ...mergeQuery
  };
  return `${pUrl.origin}${pUrl.pathname}${qs.stringify(nextQuery, {
    addQueryPrefix: true
  })}${defaultTo(nextHash, pUrl.hash)}`;
}

export default filterQuery;
