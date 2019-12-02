import fixWeChatForm from './fixWeChatForm';
fixWeChatForm();

function injectCSS(text = '') {
  var $style = document.createElement('style');
  $style.type = 'text/css';
  $style.textContent = `\n${text.trim()}\n`;
  document.head.appendChild($style);
}

function goTo(url) {
  return window.location.replace(url);
}

function vconsoleReloadPlugin(VConsole) {
  const reloadPlugin = new VConsole.VConsolePlugin('reload', 'Reload');
  const inputId = '__vc_reload_url';
  const goBtnId = '__vc_reload_go_btn';
  const sizeId = '__vc_reload_size';

  injectCSS(`
#__vconsole .vc-tabbar {
  overflow-y: hidden;
}
#__vconsole .vc-reload-addr {
  padding: 0.5em;
}
#__vconsole .vc-reload-url {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 1em;
  font-size: 14px;
}
#__vconsole .vc-reload-go-btn {
  box-sizing: border-box;
  display: block;
  width: 50%;
  height: 3em;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #eee;
  margin: auto;
  font-size: 14px;
}
#__vconsole .vc-reload-go-btn:active {
  background-color: #ddd;
}
#__vconsole .vc-reload-size {
  padding: 0.5em;
  margin-top: 1em;
}
  `);

  reloadPlugin.on('renderTab', callback => {
    const html = `<div>
      <div class="vc-reload-addr">当前地址：</div>
      <textarea rows="8" class="vc-reload-url" id="${inputId}">
      </textarea>
      <button type="button" class="vc-reload-go-btn" id="${goBtnId}">前往</button>
      <div class="vc-reload-size" id="${sizeId}"></div>
    </div>`;
    callback(html);
  });
  reloadPlugin.on('ready', () => {
    const $input = document.getElementById(inputId);
    const $goBtn = document.getElementById(goBtnId);
    $goBtn.addEventListener(
      'click',
      () => {
        goTo($input.value);
      },
      false
    );
    $input.addEventListener(
      'touchmove',
      e => {
        e.stopPropagation();
      },
      false
    );
  });
  reloadPlugin.on('show', () => {
    const $input = document.getElementById(inputId);
    $input.value = window.location.href;
    const $size = document.getElementById(sizeId);
    $size.innerText = `innerWidth: ${window.innerWidth}\ninnerHeight: ${
      window.innerHeight
    }\n@ ${new Date()}`;
  });
  reloadPlugin.on('addTool', callback => {
    callback([
      {
        name: '刷新',
        onClick: () => {
          window.location.reload();
        }
      },
      {
        name: '去掉 hash 刷新',
        onClick: () => {
          goTo(window.location.href.replace(window.location.hash, ''));
        }
      }
    ]);
  });
  return reloadPlugin;
}

export default vconsoleReloadPlugin;
