function getIOSVersion() {
  let match = navigator.userAgent.match(/iPhone OS ([\d_]+)/);
  return match ? match[1].replace(/_/g, '.') : null;
}

export default getIOSVersion;