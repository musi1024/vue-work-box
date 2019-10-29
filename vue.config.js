module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/style/mixin.scss";
          @import "@/style/common.scss";
        `
      }
    }
  }
};
