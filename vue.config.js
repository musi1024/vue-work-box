const { CDN_PATH, TITLE } = require('./src/custom/settings');

module.exports = {
  publicPath: process.env.VUE_APP_CDN ? CDN_PATH : './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/mixin.scss";
          @import "@/style/common.scss";
        `
      }
    }
  },
  chainWebpack(configs) {
    configs.plugin('html').tap(option => {
      option[0] = { ...option[0], title: TITLE };
      return option;
    });
  }
};
