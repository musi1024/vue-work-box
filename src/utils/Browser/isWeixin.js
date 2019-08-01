const isWeixin = () => {
  return /MicroMessenger/i.test(navigator.userAgent);
};

export default isWeixin;
