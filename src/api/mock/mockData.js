export default {
  [`POST:/test`]: () => {
    return [
      200,
      {
        ok: false,
        message: 'ok',
        result: {
          id: 1,
          name: 'abc'
        }
      }
    ];
  },
  [`GET:/test`]: () => {
    return [
      200,
      {
        ok: true,
        message: 'ok',
        result: {
          id: 1,
          name: 'abc'
        }
      }
    ];
  }
};
