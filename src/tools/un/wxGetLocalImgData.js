function wxGetLocalImgData({ localId }) {
  return new Promise(resolve => {
    wx.getLocalImgData({
      localId,
      success: function(res) {
        if (!/^data:image/.test(res.localData)) {
          res.localData = 'data:image/jgp;base64,' + res.localData; // IT IS `jgp`, BUT WORKS
        }
        resolve(res);
      }
    });
  });
}

export default wxGetLocalImgData;