import isPARS from './isPARS';
import asyncLoadJs from './asyncLoadJS';
// import qs from 'qs';
import isWeChat from './isWeChat';
const PALIFESDK_SCRIPT_SRC =
  'https://elis-ecocdn.pingan.com.cn/lilith/lib/PALifeOpen.1.6.min.js';

const PALIFEWEBSDK_SCRIPT_SRC = `https://elis-ecocdn.pingan.com.cn/m/cdn/PALifeOpenH5/1.2/PALifeOpenH5.min.js`;

// const query = qs.parse(window.location.search.slice(1));

let MOCK = {}; /* {
  getOpenId: {
    ret: '0',
    msg: 'debug_ok',
    data: {
      openId: query.openid || 'debug_open_id_1',
      openToken: query.openToken || `debug_open_token_${Date.now()}`
    }
  },
  share: {
    ret: '0',
    msg: 'mock',
    data: {
      type: 'WXHY',
      detail: 'mock'
    }
  }
}; */

// 内部参数
let PALifeOpen, PALifeOpenH5, _appId, _aId, loadedPromise, loadedWebSdkPromise;

class PALifeOpenSdk {
  constructor(config, mockData) {
    if (!PALifeOpenSdk._instance) {
      this._init(config, mockData);
      PALifeOpenSdk._instance = this;
    }
    return PALifeOpenSdk._instance;
  }

  _init({ appId, aId, debug, isProd }, mockData = {}) {
    this.isPARS = isPARS();
    _appId = appId;
    _aId = aId;
    MOCK = mockData;
    this._debug = debug;
    this.isPARS
      ? this._initPALifeOpen()
      : this._initPALifeOpenH5({ debug, isProd });
  }

  async _initPALifeOpen() {
    if (!window.PALifeOpen) {
      loadedPromise = asyncLoadJs(PALIFESDK_SCRIPT_SRC);
      await loadedPromise;
    }
    PALifeOpen = window.PALifeOpen;
    PALifeOpen.config();
  }

  async _initPALifeOpenH5({ debug = false, isProd = true } = {}) {
    if (!window.PALifeOpenH5) {
      loadedWebSdkPromise = asyncLoadJs(PALIFEWEBSDK_SCRIPT_SRC);
      await loadedWebSdkPromise;
    }
    PALifeOpenH5 = window.PALifeOpenH5;
    PALifeOpenH5.config({
      debug,
      isProd,
      autoMergeRecord: true
    });
    isWeChat() && PALifeOpenH5.wxAuthInit();
  }

  async run(method, params, useMock = false) {
    if (PALifeOpenSdk.useMock || useMock) return MOCK[method];
    await loadedPromise;
    return new Promise((resolve, reject) => {
      PALifeOpen[method](params, resolve, reject);
    });
  }

  async invoke(
    service,
    method,
    params,
    options = {
      timeout: 10000
    },
    useMock = false
  ) {
    if (PALifeOpenSdk.useMock || useMock) return MOCK[method];
    await loadedPromise;
    return new Promise((resolve, reject) => {
      PALifeOpen.invoke(service, method, params, resolve, reject, options);
    });
  }

  async runH5SdkMethod(method, ...args) {
    await loadedWebSdkPromise;
    return PALifeOpenH5[method](...args);
  }

  getCV() {
    const e = window.navigator.userAgent.match(/PARS\/([\d.]+)/);
    return e && e.length > 0 ? ~~e[1] : 0;
  }
  setTitle(title) {
    this.run('setTitle', { title });
  }

  setRightBtn(title, onCallFunction, type = 'text') {
    if (typeof onCallFunction !== 'function') return;
    this.run('setRightBtn', {
      title,
      type,
      onCallFunction
    });
  }

  getOpenId() {
    const appId = _appId;
    return this.run(
      'getOpenId',
      {
        appId
      },
      this._debug
    ).then(res => res.data);
  }

  addRecord(params, timeout = 8640000) {
    return this.invoke('device', 'addRecord', params, {
      timeout
    }).then(() => {
      console.log('金管家内部埋点：', params);
    });
  }

  executeUri(uri) {
    return this.invoke(
      'webview',
      'executeUri',
      {
        uri
      },
      {
        timeout: 8640000
      }
    );
  }

  share({
    title = '',
    content = '',
    extention = '',
    imageUrl = '',
    type = '',
    shareTypes = ['WXHY', 'WXPYQ']
  } = {}) {
    shareTypes = shareTypes.join('|');
    return this.run('share', {
      title,
      content,
      extention,
      imageUrl,
      type,
      shareTypes
    }).then(res => {
      console.log(res.ret);
      return res.ret === '0' ? res : Promise.reject(res);
    });
  }
  async createShareCode(
    { templateId, channel = 'outer', jumpUrl, imgUrlVar = '', wordsVar = '' },
    timeout = 8640000
  ) {
    const MIN_CV = 51300;
    if (this.getCV() < MIN_CV)
      return Promise.reject({
        needUpdate: true
      });
    const { openId, openToken } = await this.getOpenId();
    const merchantCode = _appId;
    const businessNo = _aId;
    console.log(openId, openToken, templateId);
    return this.invoke(
      'util',
      'createShareCode',
      {
        openId,
        openToken,
        templateId,
        channel,
        jumpUrl,
        merchantCode,
        businessNo,
        imgUrlVar,
        wordsVar
      },
      { timeout }
    );
  }
  addRecordOutApp({ eventId, labelId, parameters }) {
    return this.runH5SdkMethod('addRecord', eventId, labelId, parameters).then(
      xhr => {
        if (xhr.status === 200) {
          const body = JSON.parse(xhr.requestSendBody);
          body.data[0] = decodeURIComponent(body.data[0])
            .split('|')
            .map((val, idx) => (idx === 5 ? JSON.parse(val) : val));
          console.log('金管家外部埋点：', body);
        } else {
          console.error('金管家外部埋点上报失败。');
        }
      }
    );
  }

  openApp(link) {
    return this.runH5SdkMethod('openApp', _aId, link);
  }

  createWXShare(link) {
    return this.runH5SdkMethod('createWXShare', link);
  }
}

PALifeOpenSdk.useMock = !isPARS() && process.env.NODE_ENV === 'development';
export default PALifeOpenSdk;
