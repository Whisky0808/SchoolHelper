// pages/nocompleted/nocompleted.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDetail: {},
    // 弹窗
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
  },

  // 弹窗
  tapDialogButton(e) {
    let that = this;
    this.setData({
      showOneButtonDialog: false
    })
    wx.redirectTo({
      url: '../details/details'
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },

  // 再来一单
  orderMore(){
    console.log('ttt')
    wx.navigateTo({
      url: '/pages/fantang/fantang?shoolId=' + app.globalData.userInfo.schoolId,
    })
  },

  // 取消订单
  cancel_order(e){
    let that = this;
    if(this.data.curDetail.status === '2'){
      console.log(app.globalData.userInfo.openid+' '+this.data.curDetail.foodOrderId+' '+app.globalData.userInfo.schoolId)
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/order/cancleOrder',
        data: {
          openid: app.globalData.userInfo.openid,
          foodOrderId: this.data.curDetail.foodOrderId,
          schoolId: app.globalData.userInfo.schoolId,
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          console.log(res);
          // 弹窗
          that.tapOneDialogButton();
        }
      })
    }else{
      console.log('配送中，不能取消')
    }
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