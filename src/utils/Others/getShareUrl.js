import filterQuery from '@/rpf/un/filterQuery';

export default function getShareLink() {
  return filterQuery(
    window.location.href,
    ['debug', 'code', 'openid', 'openToken'],
    {},
    ''
  );
}
