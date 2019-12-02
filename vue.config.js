module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/mixin.scss";
          @import "@/style/common.scss";
        `
      }
    }
  }
};
