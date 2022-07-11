// pages/protocol/protocol.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 假页的data：
    position: 'center',
    duration: 700,
    show: false,
    overlay: false,
    title: "骑手签订协议",
    index: "",
    status: false,
    //骑手注册提现密码假页的data
    registerShow: false,
    password: "",
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],

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
    wx.redirectTo({
      url: '/Common/protocol/protocol'
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },

  // 输入框
  inputPassword: function (e) {
    let input_password = e.detail.value;
    this.setData({
      password: input_password
    })
  },

  inputPasswordAgain: function (e) {
    let that = this;
    let verification = e.detail.value;
    console.log(this.data.password)
    let pattern = this.data.password;
    if (verification == pattern) {
      that.setData({
        status: true
      })
    }
  },

  //设置密码的弹窗  按钮
  passwordConfirm(e) {
    let that =this;
    console.log(app.globalData.openid);
    console.log(that.data.password);
    console.log('btn', e.detail.index)  //设置密码的弹窗  按钮
    let btnIndex = e.detail.index;
    let status = this.data.status;
    if (btnIndex == 1) {
      let zzbds1 = /^\d{6}$/;       //正则表达式：6位纯数字
      if (!zzbds1.test(that.data.password)) {
        wx.showToast({
          title: '请输入6位纯数字',
          icon: 'error',
          duration: 2000
        })
        that.setData({
          password: "",
        })
      }
      if (status === false) {
        wx.showToast({
          title: '密码输入不一致',
          icon: 'error',
          duration: 2000
        })
        that.setData({
          password: "",
        })
      }
      else if(status===true && zzbds1.test(that.data.password)){
        console.log(app.globalData.userInfo.openid+'#'+that.data.password);
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/user/setWithdrawPassword',
          header: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          data: {
            openid: app.globalData.userInfo.openid,
            withdrawPassword: that.data.password
          },
          success: function (res) {
            app.globalData.userInfo.level = '2';
            console.log(res);
            console.log(res.data.message);
          },
          fail: function (res) {
            // 弹窗
            that.tapOneDialogButton();
            console.log("失败", res);
          }
        })
        that.setData({
          registerShow: false,
        })
        wx.showToast({
          title: 'success',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../../Common/welcome/welcome',
          })
        }, 1000)
      }
      console.log(that.data.password);
    } else if (btnIndex == 0) {
      that.setData({
        registerShow: false,
      })
    }

  },

  swiperchange: function (e) {
    let that = this;
    console.log(e.detail.current)
    if (e.detail.current == 3) {
      setTimeout(function () {
        that.setData({
          show: true
        })
      }, 2000)

    }

  },

  toNav: function () {
    this.setData({
      show: true
    })
  },

  register: function () {
    this.setData({
      registerShow: true
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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