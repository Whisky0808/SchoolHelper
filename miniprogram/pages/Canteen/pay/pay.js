// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    openid:'',
    out_trade_no: '',
    total_fee: 0,
    schoolId: 0
  },
  
  pay: function () {
    let  that = this;
    console.log('支付：openid='+ that.data.openid+' 订单号='+that.data.out_trade_no+' 总价格='+that.data.total_fee);
    wx.request({
      url: 'https://wxpay1.cn1.utools.club/wxpay/createWXPay',
      data: {
        openid: that.data.openid,
        out_trade_no: that.data.out_trade_no,
        // total_fee: that.data.total_fee,
        schoolId: app.globalData.userInfo.schoolId,
        total_fee: '1',
        status: "1",
        body: "食堂外卖支付",
        exchange: "exchange.foodOrder",
        routingkey: "queue.foodOrder"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function (res) {
            // success
            console.log(res);
            wx.navigateTo({
              url: '../fantang/fantang?shoolId=' + app.globalData.userInfo.schoolId,
            })
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

  onLoad: function (options) {
    let that = this;
    let total_fee = parseInt(options.total_fee).toFixed(2);
    total_fee = (total_fee * 100).toString();
    that.setData({
      openid:options.openid,
      out_trade_no:options.out_trade_no,
      total_fee:total_fee,
      schoolId:options.schoolId
    })
  },

})
