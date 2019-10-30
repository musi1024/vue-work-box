import qs from 'qs';
function query() {
  return qs.parse(window.location.search.slice(1));
}

export default query();
