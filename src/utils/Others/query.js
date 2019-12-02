import qs from 'qs';

const query = qs.parse(window.location.search.slice(1));

export default query;
