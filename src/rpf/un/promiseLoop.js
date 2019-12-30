function wait(ms = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function promiseLoop(func, interval = 0) {
  if (typeof func !== 'function') {
    throw Error('func should be a function');
  }
  let ing = true;
  function loop() {
    return func()
      .then(() => {
        return wait(interval);
      })
      .then(() => {
        if (ing) {
          return loop();
        }
        return null;
      });
  }
  loop();
  function stop() {
    ing = null;
  }
  return { stop };
}

export default promiseLoop;
