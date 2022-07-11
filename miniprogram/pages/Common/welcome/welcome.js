// pages/welcome2/welcome2.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    name: "",
    photo: "",
    school: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("===");
    console.log("welcome的头像"+app.globalData.userInfo.avatarUrl);
    this.setData({
      openid: app.globalData.userInfo.openid,
      name: app.globalData.userInfo.nickName,
      photo: app.globalData.userInfo.avatarUrl,
      school: app.globalData.userInfo.schoolName,
      // school:"广东技术师范大学东校区"
    })
  },
  toIndividual(e) {
    wx.navigateTo({
      url: '../individual/individual',
    })
  },
  toCanteen(e) {
    console.log(e + "to饭堂");
    wx.navigateTo({
      url: '../../Canteen/fantang/fantang',
    })
  },
  toHelp(e) {
    console.log(e + "to短工");
    wx.navigateTo({
      url: '../../Runner/add_demand_order/add_demand_order',
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
    console.log(app.globalData.userInfo);
    this.setData({
      openid: app.globalData.userInfo.openid,
      name: app.globalData.userInfo.nickName,
      photo: app.globalData.userInfo.avatarUrl,
      school: app.globalData.userInfo.schoolName,
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