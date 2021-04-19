// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    openid:'',
    out_trade_no: '',
    total_fee: 0,
    schoolId: 0,
    body: "",
    exchange: "",
    routingkey: "",
    level: null,
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
    if(that.data.level === '1'){
      wx.navigateTo({
        // url: '/pages/Canteen/fantang/fantang',
        url: '../../Canteen/fantang/fantang',
      })
    }else{
      wx.navigateTo({
        url: '../../Runner/help_order/help_order',
      })
    }
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },

  pay: function () {
    let  that = this;
    console.log('支付：openid='+ that.data.openid+' 订单号='+that.data.out_trade_no+' 总价格='+that.data.total_fee);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/wxpay/createWXPay',
      data: {
        openid: that.data.openid,
        out_trade_no: that.data.out_trade_no,
        // total_fee: that.data.total_fee,
        schoolId: app.globalData.userInfo.schoolId,
        total_fee: '1',
        status: "1",
        body: that.data.body,
        exchange: that.data.exchange,
        routingkey: that.data.routingkey
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
            // 弹窗
            that.tapOneDialogButton();
            // success
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

  onLoad: function (options) {
    console.log(options);
    if(options.level === '2'){
      this.setData({
        body: "需求单支付",
        exchange: "exchange.helpOrder",
        routingkey: "queue.helpOrder",
        level: options.level
      })
    }else if(options.level === '1'){
      this.setData({
        body: "食堂订单支付",
        exchange: "exchange.foodOrder",
        routingkey: "queue.foodOrder",
        level: options.level
      })
    }
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
