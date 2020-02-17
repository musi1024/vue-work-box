import isPARS from './isPARS';

let MOCK = {}; /*  {
  getHealthStar: {
    success: true,
    data: {
      model: 100
    }
  },
  consumeHealthStar: {
    success: true,
    data: {
      model: 10
    }
  }
}; */

export const IFRAME_URL_MAP = {
  development: 'https://www.test.pajk.cn/jump-sdk/outerHealthStar.html',
  prelease: `https://www.pre.jk.cn/jump-sdk/outerHealthStar.html`,
  production: `https://www.jk.cn/jump-sdk/outerHealthStar.html`
};

const TYPE = 'healthStar';
const USE_MOCK = !isPARS() && process.env.NODE_ENV === 'development';
let flag = 1;
let ifa, initMessagePromise;

const MESSAGE_CALLBACK_LIST = {};

const addSDKIFrame = url => {
  const target_frame = document.createElement('iframe');
  target_frame.style.display = 'none';
  target_frame.src = url;
  document.body.appendChild(target_frame);
  return target_frame;
};

const getFlag = () => flag++;

class HealthStarSdk {
  constructor({ mode, mockDatas } = {}) {
    if (!HealthStarSdk._instance) {
      this._init(mode, mockDatas);
      HealthStarSdk._instance = this;
    }
    return HealthStarSdk._instance;
  }
  _init(mode = 'production', mockDatas = {}) {
    ifa = addSDKIFrame(IFRAME_URL_MAP[mode]);
    initMessagePromise = this._initMessageList();
    MOCK = mockDatas;
  }
  _initMessageList() {
    return new Promise((resolve, reject) => {
      window.addEventListener(
        'message',
        e => {
          const data = e.data;
          if (!data.data) return;
          const { ready, userId, flag, ...res } = data.data;
          if (ready) {
            const { success, error } = res;
            success ? resolve(userId) : reject(error);
          } else {
            //messageList[flag] = res;
            MESSAGE_CALLBACK_LIST[flag](res);
            delete MESSAGE_CALLBACK_LIST[flag];
          }
        },
        false
      );
    });
  }
  async _postMessage(method, params = {}) {
    const flag = getFlag();
    await initMessagePromise;
    ifa.contentWindow.postMessage(
      {
        type: TYPE,
        flag,
        data: {
          method,
          params
        }
      },
      '*'
    );
    return flag;
  }
  _getMessage(flag) {
    return new Promise((resolve, reject) => {
      MESSAGE_CALLBACK_LIST[flag] = res => {
        res.success ? resolve(res.data) : reject(res.error);
      };
    });
  }

  getUserId() {
    return USE_MOCK
      ? Promise.resolve(MOCK.getUserId.data.model)
      : initMessagePromise;
  }

  async run(methodName, params) {
    if (USE_MOCK) return MOCK[methodName];
    const flag = await this._postMessage(methodName, params);
    return this._getMessage(flag);
  }
}

export default HealthStarSdk;
