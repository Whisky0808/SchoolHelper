// pages/CD/CD.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success: '',
    positonName1: '',
    latitude1: '',
    longitude1: '',
    positonName2: '',
    latitude2: '',
    longitude2: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      // 界面中"取"这个地址的名称+经纬
      positonName1: options.positonName1,
      latitude1: options.latitude1,
      longitude1: options.longitude1,

      // 界面中"送"这个地址的名称+经纬
      positonName2: options.positonName2,
      latitude2: options.latitude2,
      longitude2: options.longitude2,
    })

  },
  //送饭点
  toNavGet: function () {
    let A = this.data.positonName1;
    let B = this.data.latitude1;
    let C = this.data.longitude1;
    app.getRoad(A, B, C);
  },
  //饭堂
  toNavFrom: function () {
    let A = this.data.positonName2;
    let B = this.data.latitude2;
    let C = this.data.longitude2;
    app.getRoad(A, B, C);
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      success: '恭喜您，抢单成功！',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})