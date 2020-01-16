function isIOS() {
  return /(iPhone|iPad); /i.test(navigator.userAgent);
}

export default isIOS;
