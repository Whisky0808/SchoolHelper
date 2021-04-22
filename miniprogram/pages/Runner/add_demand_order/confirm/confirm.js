// pages/confirm/confirm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    couponList: '',
    couponId: -1,

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
    keppMoney: '',
    content: '',
    startAddress: '',
    startDetailAddress: '',
    startLatitudes: '',
    startLongitudes: '',

    openid: '',
    reduceMoney: 0,
    checkedIndex: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    
    this.setData({
      openid: app.globalData.userInfo.openid,
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
      keppMoney: data.totalMoney,
      startAddress: data.startAddress,
      startDetailAddress: data.startDetailAddress,
      startLatitudes: data.startLatitudes,
      startLongitudes: data.startLongitudes,
      endLatitude: data.endLatitude,
      endLongitude: data.endLongitude,
      
    })

    let that = this;

    wx.request({
      url: 'https://zzxdream.cn1.utools.club/coupon/findCoupon/1/omfL-4vHXzZLzDu3iEKYkT5HFZhg',
      method: 'GET',
      success: res => {
        let p = res.data.data;

        for(let a of p){
          a.checked = false
        }

        that.setData({
          couponList: p,
          flag: true
        })

      }
    })

    console.log(this.data.couponList)
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
        couponMoney: data.reduceMoney,
        startAddress: data.startAddress,
        startDetailAddress: data.startDetailAddress,
        startLatitudes: data.startLatitudes,
        startLongitudes: data.startLongitudes,
        couponId: data.couponId
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
  },

  chooseCoupon: function(e){
    console.log(e)
    let couponId = e.currentTarget.dataset.couponid;
    let reachMoney = e.currentTarget.dataset.reachmoney;
    let reduceMoney = e.currentTarget.dataset.reducemoney;
    let index = e.currentTarget.dataset.index;
    console.log('index = ' + reduceMoney)

    if(this.data.totalMoney < reachMoney){
      let a = this.data.couponList;
      a[index].checked = false;

      this.setData({
        couponList: a
      })

      console.log("未达到使用金额")
      return;
    }

    if(index == this.data.checkedIndex){
      let a = this.data.couponList;
      a[index].checked = false;
      this.setData({
        reduceMoney: 0,
        couponList: a,
        checkedIndex: -1,
        totalMoney: this.data.keppMoney,
        couponId: -1
      })
      return;
    }else{
      this.setData({
        reduceMoney: reduceMoney,
        checkedIndex: index,
        couponId: couponId
      })
    }

    if(this.data.totalMoney < reachMoney){
      let a = this.data.couponList;
      a[index].checked = false;

      this.setData({
        couponList: a,
        reduceMoney: 0
      })

      console.log("未达到使用金额")
      return;
    }

    let newMoney = this.data.keppMoney - reduceMoney;

    this.setData({
      totalMoney: newMoney,
      reduceMoney: reduceMoney
    })
  }
})