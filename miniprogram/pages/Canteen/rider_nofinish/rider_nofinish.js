// pages/rider_nofinish/rider_nofinish.js
const app = getApp()
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

  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
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

  // 订单完成按钮
  finishOrderBtn(){
    let that = this;
    let pages = getCurrentPages();
    let prevPage = pages[ pages.length - 2];
    console.log(prevPage.data);
    // console.log(this.data.curDetail.receiveLatitude, this.data.curDetail.receiveLongitude);
    app.getDistance4(this.data.curDetail.receiveLatitude, this.data.curDetail.receiveLongitude);
    setTimeout(()=>{
      let distance = app.globalData.distance;
      // let distance = 45;
      console.log(distance);
      if(distance > 50){
        console.log('距离太远，不能签到')
        that.tapOneDialogButton();
      }else{
        console.log('签到成功')
        prevPage.modifyStatu(that.data.curDetail.curIndex);
        // prevPage.setData({
        //
        // })
        // wx.navigateBack({
        //   delta: 1  // 返回上一级页面。
        // })
      }
    },1000)
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