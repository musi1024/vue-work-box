import { wxShareConfig } from '@/custom/configs';
import getShareUrl from '@/utils/getShareUrl';

export default function wxShare(num) {
  const { title, desc, imgUrl } = wxShareConfig(num);
  const link = getShareUrl();
  wx.ready(function() {
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      success: function() {
        // fiboSDK.share('friend');
      }
    });
    wx.onMenuShareTimeline({
      title: title + desc,
      link,
      imgUrl,
      success: function() {
        // fiboSDK.share('timeline');
      }
    });
  });
}
