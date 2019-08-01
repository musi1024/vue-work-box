function isWeChat() {
  return /MicroMessenger/i.test(navigator.userAgent)
}

export default isWeChat;