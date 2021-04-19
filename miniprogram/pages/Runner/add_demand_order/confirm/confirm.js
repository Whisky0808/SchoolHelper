// pages/confirm/confirm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,

    endAddress: '',
    endDetailAddress: '',
    endLatitude: '',
    endLongitude: '',
    endTime: '',
    helperMoney: '',
    platformMoney: '',
    helperMust: '',
    helperNum: '',
    helperRequire: '',
    name: '',
    phone: '',
    startAddressList: '',
    startDetailAddressList: '',
    startLatitudeList: '',
    startLongitudeList: '',
    startTime: '',
    title: '',
    totalMoney: '',
    content: '',
    startAddress: '',
    startDetailAddress: '',
    startLatitudes: '',
    startLongitudes: '',

    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    this.setData({
      openid: app.globalData.userInfo.openid
    })
    // let data = options.data;
    console.log(data.platformMoney)
    console.log(data.startAddress)
    let startAddressList = data.startAddress.split('#');
    let startDetailAddressList = data.startDetailAddress.split('#');
    let startLatitudeList = data.startLatitudes.split('#');
    let startLongitudeList = data.startLongitudes.split('#');
    console.log("看过来 = ", startAddressList)

    this.setData({
      platformMoney: data.platformMoney,
      content: data.content,
      endAddress: data.endAddress,
      endDetailAddress: data.endDetailAddress,
      endLatitude: data.endLatitude,
      endLongitude: data.endLongitude,
      endTime: data.endTime,
      helperMoney: data.helperMoney,
      helperMust: data.helperMust,
      helperNum: data.helperNum,
      helperRequire: data.helperRequire,
      name: data.name,
      phone: data.phone,
      startAddressList: startAddressList,
      startDetailAddressList: startDetailAddressList,
      startLatitudeList: startLatitudeList,
      startLongitudeList: startLongitudeList,
      startTime: data.startTime,
      title: data.title,
      totalMoney: data.totalMoney,
      startAddress: data.startAddress,
      startDetailAddress: data.startDetailAddress,
      startLatitudes: data.startLatitudes,
      startLongitudes: data.startLongitudes,
      endLatitude: data.endLatitude,
      endLongitude: data.endLongitude,
      flag: true
    })
  },

  addHelperOrder: function(){
    let data = this.data;
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helpOrder/add',
      method: 'POST',
      data: {
        schoolId: app.globalData.userInfo.schoolId,
        openid: that.data.openid,
        content: data.content,
        endAddress: data.endAddress,
        endDetailAddress: data.endDetailAddress,
        endLatitude: data.endLatitude,
        endLongitude: data.endLongitude,
        endTime: data.endTime,
        helperMoney: data.helperMoney,
        platformMoney: data.platformMoney,
        helperMust: data.helperMust,
        helperNum: data.helperNum,
        helperRequire: data.helperRequire,
        name: data.name,
        phone: data.phone,
        startTime: data.startTime,
        title: data.title,
        totalMoney: data.totalMoney,
        startAddress: data.startAddress,
        startDetailAddress: data.startDetailAddress,
        startLatitudes: data.startLatitudes,
        startLongitudes: data.startLongitudes
      },
      success: res => {
        wx.hideLoading()
        console.log("结果 = ", res)
        let helpOrderId = res.data.data;
        console.log("!!!!")
        console.log(helpOrderId);
        wx.navigateTo({
          url: '../../../Common/pay/pay?body=' + '需求单支付' + '&total_fee=' + this.data.totalMoney
             + '&openid=' + this.data.openid + '&out_trade_no=' + helpOrderId + '&level=2'
        })
      }
    })
  }
})