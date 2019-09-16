function query() {
  let search = window.location.search.slice(1);
  if (!search) return;
  let qs = search.split('&');
  let res = {};
  qs.forEach(i => {
    let q = i.split('=');
    res[q[0]] = q[1];
  });
  return res;
}

export default query();
