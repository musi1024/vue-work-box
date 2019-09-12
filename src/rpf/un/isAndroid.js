function isAndroid() {
  return /Android /i.test(navigator.userAgent);
}

export default isAndroid;
