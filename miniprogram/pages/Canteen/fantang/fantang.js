// pages/fantang/fantang.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    schoolId: app.globalData.userInfo.schoolId,
    carteen:[],
    schoolName: app.globalData.userInfo.schoolName
  },
  
  tabChange(e) {
    console.log('tab change', e)
},

  buttonListener:function(e){
    console.log(e.currentTarget.dataset);
    var that = this;
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    console.log(id);
    console.log(name);
    wx.navigateTo({
      url: '../Merchandise/Merchandise?carteenid=' + id + '&carteenname=' + name,
    })
  },

  // getCanteen: function(){
  //   wx.request({
  //     url: 'url',
  //     data:{
  //       openid:"xxx",
  //     },
  //     success (res) {
  //       console.log(res.data);
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let childComChange = this.selectComponent('.tab');
    let x = "curimgurl[" + 0 + "]";
    let y = "flag[" + 0 + "]"
    childComChange.setData({
      [x]: childComChange.data.imgurl[0].hovor,
      [y]: 1
    })
    console.log('hhh')
    this.setData({
      schoolId: app.globalData.userInfo.schoolId,
      schoolName: app.globalData.userInfo.schoolName
    })
    console.log(app);
    console.log(app.globalData.userInfo.schoolId)
    console.log(this.data.shoolId);
    // that.setData({
    //   shoolId:options.shoolId
    // })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/carteen/'+app.globalData.userInfo.schoolId,
      // data:{
      //   openid:"xxx",
      // },
      header: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + app.globalData.token
      },
      success (res) {
        wx.hideLoading();
        console.log(res.data);
        console.log(res.data.data);
        that.setData({
          carteen:res.data.data
        })
        console.log(that.data.carteen[0].carteenId);
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