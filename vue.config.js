module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/style/common.scss";
          @import "@/style/mixin.scss";
        `
      }
    }
  }
};
