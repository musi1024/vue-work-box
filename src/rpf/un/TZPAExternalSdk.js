/* globals PALifeOpenH5 fiboSDK */
import filterQuery from './filterQuery';
import urlInserter from './urlInserter';
import qs from 'qs';
function loadJS(url) {
  return new Promise(resolve => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    //IE
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else {
      //其他浏览器
      script.onload = function() {
        resolve();
      };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}
function validateTrack(xhr, cb) {
  if (xhr.status === 200) {
    let data = xhr.requestSendBody;
    data = JSON.parse(data);
    data.data = decodeURIComponent(data.data);
    console.log('外部埋点', data);
  } else {
    console.log('外部埋点上报失败');
  }
  if (typeof cb === 'function') cb();
}

async function TZPAExternalSdk({
  aid,
  url,
  selector = '.jump-btn',
  eventId,
  labelId,
  backflowUrl
}) {
  if (typeof aid !== 'string') {
    throw Error('aid is required and should be string');
  }
  if (typeof url !== 'string') {
    throw Error('url is required and should be string');
  }
  if (selector && typeof selector !== 'string') {
    throw Error('selector should be string');
  }
  if (eventId && typeof eventId !== 'string') {
    throw Error('eventId should be string');
  }
  if (labelId && typeof labelId !== 'string') {
    throw Error('labelId should be string');
  }
  if (backflowUrl && typeof backflowUrl !== 'string') {
    throw Error('backflowUrl should be string');
  }

  if (!PALifeOpenH5)
    await loadJS(
      'https://elis-ecocdn.pingan.com.cn/m/cdn/PALifeOpenH5/1.2/PALifeOpenH5.min.js'
    );

  PALifeOpenH5.config();
  const { openid, openToken } = PALifeOpenH5.wxAuthInit();
  if (!openid && !openToken) {
    return Promise.reject(new Error('未获取⾦管家微信授权'));
  }
  PALifeOpenH5.addReadRecord(aid).then(xhr => {
    validateTrack(xhr);
  });

  url = filterQuery(
    url,
    [],
    qs.parse(window.location.search, { ignoreQueryPrefix: true })
  );
  let query = qs.parse(url.split('?')[1], { ignoreQueryPrefix: true });
  if (!('s_oid' in query)) console.error('当前链接缺少s_oid查询参数');

  if (selector) {
    document.querySelector(selector).addEventListener(
      'click',
      async function() {
        const jumpToPAlife = () => {
          if ('test' in query)
            return console.log(
              `测试埋点，不跳转金管家唤起链接,aid:${aid},跳转url:${url}`
            );
          if (backflowUrl) {
            window.location.replace(
              urlInserter({
                origin: backflowUrl,
                url: url
              })
            );
          } else {
            PALifeOpenH5.openApp(aid, url);
          }
        };
        if (eventId && labelId) {
          let xhr = await PALifeOpenH5.addRecord(eventId, labelId);
          validateTrack(xhr, function() {
            jumpToPAlife();
          });
        } else {
          jumpToPAlife();
        }
      },
      false
    );
  }

  let wxShareUrl = PALifeOpenH5.createWXShare(
    window.fiboSDK ? fiboSDK.dealUrl(url) : url
  );
  return Promise.resolve(wxShareUrl);
}
export default TZPAExternalSdk;
