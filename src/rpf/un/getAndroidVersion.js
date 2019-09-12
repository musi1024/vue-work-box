function getAndroidVersion() {
  let match = navigator.userAgent.match(/Android ([\d.]+);/);
  return match ? match[1] : null;
}

export default getAndroidVersion;
