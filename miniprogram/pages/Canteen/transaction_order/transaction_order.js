// pages/transaction_order/transaction_order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDetail: {}
  },

  // 再来一单
  orderMore(){
    console.log('ttt')
    wx.navigateTo({
      url: '../fantang/fantang?shoolId=' + app.globalData.userInfo.schoolId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curDetail = JSON.parse(options.curDetail)
    this.setData({
      curDetail: curDetail
    })
    console.log(this.data.curDetail)
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