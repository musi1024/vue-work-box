function noop(name) {
  console.log('Sentry in non-production env', name);
}

const ignoreErrors = [
  "'pageViewId' of undefined",
  'bonreeJsBridge.',
  "evaluating 'window.pageView.pageViewId'",
  "has no method 'onJsError'",
  'ignoreError is not defined',
  'Java exception was raised during method invocation',
  'Java object is gone',
  'java_obj.onJsError',
  'nativeJs.checkEncode',
  'nativeJs.onException',
  'window.androidJsBridgeKit.responseNative'
];

function getIsIgnoreError(message) {
  let isIgnoreError = false;
  for (let i = 0; i < ignoreErrors.length; i++) {
    let str = ignoreErrors[i];
    if (message.indexOf(str) > -1) {
      isIgnoreError = true;
      break;
    }
  }
  return isIgnoreError;
}

function loadSentry(dsn, userBeforeSend) {
  if (!dsn || typeof dsn !== 'string') {
    throw new Error('dsn is required and should be string');
  }
  if (userBeforeSend && typeof userBeforeSend !== 'function') {
    throw new Error('beforeSend should be function');
  }
  return new Promise(resolve => {
    if (process.env.NODE_ENV === 'production') {
      import('@sentry/browser/dist/index.js').then(Sentry => {
        Sentry.init({
          dsn,
          beforeSend: (event, hint) => {
            const error = hint.originalException;
            if (error && error.message && getIsIgnoreError(error.message)) {
              return null;
            }
            if (userBeforeSend) {
              return userBeforeSend(event, hint);
            }
            return event;
          }
        });
        window.Sentry = Sentry;
        resolve(Sentry);
      });
    } else {
      window.Sentry = {
        FAKE_SDK: true,
        captureEvent: noop.bind(null, 'captureEvent'),
        captureException: noop.bind(null, 'captureException'),
        captureMessage: noop.bind(null, 'captureMessage')
      };
      resolve(false);
    }
  });
}

export default loadSentry;
