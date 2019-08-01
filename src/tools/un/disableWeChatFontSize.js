function disableWeChatFontSize() {
  // iOS
  var $style = document.createElement('style');
  $style.type = 'text/css';
  $style.setAttribute('data-wechat-font-size', 'true');
  $style.innerText = `body {
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
  }`;
  document.head.appendChild($style);

  // android
  if (WeixinJSBridge && WeixinJSBridge.invoke) {
    handleFontSize();
  } else {
    document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
  }
  function handleFontSize() {
    WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
    WeixinJSBridge.on('menu:setfont', function() {
      WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
    });
  }
}

export default disableWeChatFontSize;
