function wait(ms = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function isInt(x) {
  return typeof x === 'number' && parseInt(x) === x;
}

function isPosInt(x) {
  return isInt(x) && x > 0;
}

function isNil(x) {
  return x == null;
}

function promiseLoop(func, interval = 0, maxCall) {
  if (typeof func !== 'function') {
    throw Error('func should be a function');
  }

  if (!isNil(maxCall) && !isPosInt(maxCall)) {
    throw Error('maxCall should be a positive integer');
  }

  let count = 0;
  let ing = true;
  function loop() {
    count++;
    if (maxCall && count >= maxCall) {
      ing = null;
    }
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
