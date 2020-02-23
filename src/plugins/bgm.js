import bgm from '@/utils/Media/bgm';

function bgmPlugin(configs) {
  const _bgm = bgm({ ...configs });
  return {
    install(Vue) {
      Object.defineProperty(Vue.prototype, '$bgm', {
        get() {
          return _bgm;
        }
      });
    }
  };
}

export default bgmPlugin;
