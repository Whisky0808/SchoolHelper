// pages/order/order.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '未完成', index: 1 }],

    finishOrder: '',
    waitFinishOrder: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.showLoading({
      title: '加载中',
    })
    // this.formatDate('YYYY-mm-dd HH:MM', new Date())
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helpOrder/helperFinish/' + this.data.userInfo.openid,
      method: 'GET',
      success: res => {
        wx.hideLoading()
        that.setData({
          finishOrder: res.data.data
        })

        console.log("---")
        console.log(res)
        console.log(that.data.finishOrder)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDeviceInfo()
    this.orderShow()
  },

  // 切换到用户界面
  changeToUser(){
    wx.navigateTo({
      url: '../help_order/help_order',
    })
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {

        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })

      }
    })
  },

  tabSwitch: function (e) {
    let that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      if(e.target.dataset.current == 0){
        that.setData({
          finishOrder: '',
          currtab: e.target.dataset.current
        })
        wx.showLoading({
          title: '加载中',
        })
        // this.formatDate('YYYY-mm-dd HH:MM', new Date())
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/helpOrder/helperFinish/' + this.data.userInfo.openid,
          method: 'GET',
          success: res => {
            wx.hideLoading()
            that.setData({
              finishOrder: res.data.data
            })

            console.log("---")
            console.log(res)
            console.log(that.data.finishOrder)
          }
        })
      }else if(e.target.dataset.current == 1){
        that.setData({
          waitFinishOrder: '',
          currtab: e.target.dataset.current
        })
        wx.showLoading({
          title: '加载中',
        })
        // this.formatDate('YYYY-mm-dd HH:MM', new Date())
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/helpOrder/helperNoFinish/' + this.data.userInfo.schoolId + '/' + this.data.userInfo.openid,
          method: 'GET',
          success: res => {
            wx.hideLoading()
            that.setData({
              waitFinishOrder: res.data.data
            })

            console.log("---")
            console.log(res)
            console.log(that.data.waitFinishOrder)
          }
        })
      }
    }
  },
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break;
      case 2:
        that.lostShow()
        break;
    }
  },

  alreadyShow: function () {
  },

  waitPayShow: function () {
  },

  getOrderDetail: function(e){
    console.log("=1")
    let data = e.currentTarget.dataset.helporder
    console.log(data)

    let startAddressList = '';
    let startDetailAddressList = '';
    let startLatitudeList = '';
    let startLongitudeList = '';

    if(data.startDetailAddressList != null){
      for(let i = 0; i < data.startAddrssList.length; i++){
        startAddressList += data.startAddrssList[i] + '#';
        startDetailAddressList += data.startDetailAddressList[i] + '#';
        startLatitudeList += data.startLatitudeList[i] + '#';
        startLongitudeList += data.startLongitudeList[i] + '#';
      }
    }else{
      startAddressList = data.startAddress;
      startDetailAddressList = data.startDetailAddress;
      startLatitudeList = data.startLatitudes;
      startLongitudeList = data.startLongitudes;
    }
    

    // let startAddressList = data.startAddressList.split('&');
    // let startDetailAddressList = data.startDetailAddressList.split('&');
    // let startLatitudeList = data.startLatitudeList.split('&');
    // let startLongitudeList = data.startLongitudeList.split('&');

    wx.navigateTo({
      url: '../riderorder_detail/riderorder_detail?startTime=' + data.startTime
      + '&endTime=' + data.endTime + '&totalMoney=' + data.totalMoney + '&platformMoney=' + data.platformMoney
      + '&content=' + data.content + '&title=' + data.title + '&helperNum=' + data.helperNum + '&helperMoney=' + data.helperMoney
      + '&helperMust=' + data.helperMust + '&helperRequire=' + data.helperRequire
      + '&phone=' + data.phone + '&name=' + data.name + '&startAddress=' + data.startAddress
      + '&startDetailAddress=' + data.startDetailAddress + '&startLatitudes=' + data.startLatitudes
      + '&startLongitudes=' + data.startLongitudes + '&endAddress=' + data.endAddress
      + '&endDetailAddress=' + data.endDetailAddress + '&endLatitude=' + data.endLatitude
      + '&endLongitude=' + data.endLongitude + '&startLatitudes=' + data.startLatitudes
      + '&startLongitudes=' + data.startLongitudes + '&endLatitude=' + data.endLatitude
      + '&endLongitude=' + data.endLongitude + '&startAddressList=' + startAddressList
      + '&startLatitudeList=' + startLatitudeList + '&startLongitudeList=' +  startLongitudeList
      + '&startDetailAddressList=' + startDetailAddressList + '&status=' + data.status
      + '&helpOrderId=' + data.helpOrderId + '&applyNum=' + data.applyNum
      + '&a=' + [1,2,3]
    })
  },

})