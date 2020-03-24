import qs from 'qs';

function getQuery() {
  return qs.parse(window.location.search.slice(1));
}

export default getQuery;
