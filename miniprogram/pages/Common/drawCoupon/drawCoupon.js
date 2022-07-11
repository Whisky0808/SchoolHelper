// pages/Common/drawCoupon/drawCoupon.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reduceMoneyList: [1,1,2,2,2,2,2,3,3,5],
    reachMoneyList: [2,2,5,5,6,6,8,8,10,10],
    couponList: [],
    openid: '',
    // 组件隐藏
    hidepopup: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.userInfo.openid,
    })
  },

  getCoupon: function(e){
    let that = this;
    let reachIndex = Math.floor(Math.random() * 10);
    let reachMoney = this.data.reachMoneyList[reachIndex];

    let reduceIndex;
    let reduceMoney;
    do{
      reduceIndex = Math.floor(Math.random() * 10);
      reduceMoney = this.data.reduceMoneyList[reduceIndex];
    }while(reduceMoney > reachMoney);

    let reachMoneys = reachMoney + "#";
    let reduceMoneys = reduceMoney + "#";
    let applicationIds = "1#2";
    let couponTypeIds = "2#3";

    reachIndex = Math.floor(Math.random() * 10);
    reachMoney = this.data.reachMoneyList[reachIndex];
    do{
      reduceIndex = Math.floor(Math.random() * 10);
      reduceMoney = this.data.reduceMoneyList[reduceIndex];
    }while(reduceMoney > reachMoney);

    reachMoneys += reachMoney;
    reduceMoneys += reduceMoney;

    console.log("reachMonsys = " + reachMoneys);
    console.log("reduceMoneys = " + reduceMoneys);
    console.log("couponTypeIds = " + couponTypeIds);


    wx.request({
      url: 'https://zzxdream.cn1.utools.club/coupon/addManyCoupon',
      method: 'POST',
      data: {
        reachMoneys,
        reduceMoneys,
        couponTypeIds,
        applicationIds,
        openid: that.data.openid,
        duration: "3"
      },
      success: res => {
        if(res.data.flag != true){
          console.log(red.data.message)
          return;
        }
        console.log(1)
        console.log(res)

        // 组件显示
        this.setData({
          hidepopup: false
        })
        let childComChange = this.selectComponent('.coupon');
        childComChange.setData({
          coupons: res.data.data,
          test: 1
        })
      }
    })
  },

  toIndex: function(e){
    wx.navigateTo({
      url: '../welcome/welcome'
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