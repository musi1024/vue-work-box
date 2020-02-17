const CDN_PATH = '';

module.exports = {
  publicPath: process.env.VUE_APP_CDN ? CDN_PATH : './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/mixin.scss";
        `
      }
    }
  }
};
