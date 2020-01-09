const BASE_IGNORE_LIST = [/\/ignore/];
const BASE_ASYNC_LIST = [/\/async/];
const BASE64_REG = /^data:/;

const validator = (value, regList) => regList.some(reg => reg.test(value));

const importAll = r => {
  return r.keys().map(path => ({
    path,
    truePath: r(path)
  }));
};

const imgs = importAll(
  require.context('@/assets/images', true, /\.(jpg|png|jpeg)$/)
);

const preloadImgList = imgs.reduce(
  (prev, { path, truePath }) => {
    if (BASE64_REG.test(truePath) || validator(path, BASE_IGNORE_LIST)) {
      return prev;
    }
    if (validator(path, BASE_ASYNC_LIST)) {
      prev.asyncList.push(truePath);
      return prev;
    }
    prev.loadList.push(truePath);
    return prev;
  },
  {
    loadList: [],
    asyncList: []
  }
);

export default preloadImgList;
