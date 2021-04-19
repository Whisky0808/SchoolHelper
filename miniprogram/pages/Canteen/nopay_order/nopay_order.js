// pages/nopay_order/nopay_order.js
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
    this.setData({
      showOneButtonDialog: false
    })
    wx.navigateTo({
      url: '../fantang/fantang?shoolId=' + app.globalData.userInfo.schoolId,
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
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


  // 取消订单
  cancel_order(e){
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
      }
    })
  },

  // 支付函数
  pay: function () {
    let  that = this;
    let total_fee = parseInt(that.data.curDetail.totalMoney).toFixed(2);
    total_fee = (total_fee * 100).toString();
    console.log('支付：openid='+ app.globalData.userInfo.openid+' 订单号='+that.data.curDetail.foodOrderId+' 总价格='+total_fee);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/wxpay/createWXPay',
      data: {
        openid: app.globalData.userInfo.openid,
        out_trade_no: that.data.curDetail.foodOrderId,
        // total_fee: total_fee,
        total_fee: '1',
        schoolId: app.globalData.userInfo.schoolId,
        status: "1",
        body: "食堂外卖支付",
        exchange: "exchange.foodOrder",
        routingkey: "queue.foodOrder"
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function (res) {
            that.tapOneDialogButton();
            console.log(res);
          },
          fail: function (res) {
            // fail
            console.log(res);
          },
          complete: function (res) {
            // complete
            console.log(res);
          }
        })
      }
    })
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