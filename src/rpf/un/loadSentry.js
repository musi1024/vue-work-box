function noop(name) {
  console.info('Sentry in non-production env', name);
}

/**
 * @HELP
 * iOS 9.x.x will still receive this error
 * undefined is not an object (evaluating 'window.pageView.pageViewId')
 */

const ignoreErrors = [
  'Aplus4UT is not defined',
  'bonreeJsBridge.',
  'ignoreError is not defined',
  'Java exception was raised during method invocation',
  'Java object is gone',
  'java_obj.onJsError',
  'nativeJs.checkEncode',
  'nativeJs.onException',
  'ToutiaoJSBridge is not defined',
  'vivoNewsDetailPage.getNewsReadStatus4Vivo',
  'window.androidJsBridgeKit.responseNative',
  'x5onSkinSwitch is not defined',
  "'pageViewId' of undefined",
  "Cannot read property 'execWebFn' of undefined",
  "evaluating 'window.pageView.pageViewId'",
  "has no method 'onJsError'",
  "Identifier 'qbSniffJsVersion'"
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

function loadSentry(dsn, userBeforeSend, autoAdjustError = true) {
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
            if (
              autoAdjustError &&
              event.level === 'error' &&
              !(error instanceof Error) &&
              typeof error === 'object'
            ) {
              event.exception.values = event.exception.values.map(item => {
                // put in try in case of circular structure
                try {
                  return item.value === 'Custom Object'
                    ? { ...item, value: JSON.stringify(error) }
                    : item;
                } catch (e) {
                  return item;
                }
              });
            }
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
        captureMessage: noop.bind(null, 'captureMessage'),
        withScope: noop.bind(null, 'withScope')
      };
      resolve(false);
    }
  });
}

export default loadSentry;
