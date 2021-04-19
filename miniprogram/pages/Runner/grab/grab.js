// pages/grab/grab.js
import QQMapWX from '../../../common/qqmap-wx-jssdk';
const app = getApp();

var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpOrderList: '',
    status: false,
    alertValue: '哈哈哈',
    showModal: false,
    getNew: true,
    userInfo: {},
    level: ''  //骑手标志
  },

  torider(){
    wx.redirectTo({
      url: '../../Common/protocol/protocol'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let level = app.globalData.userInfo.level;
    this.setData({
      level: level
    })
    if(level === '2'){
      console.log('是骑手')
    }else{
      console.log('其他用户');
    }

    let childComChange = this.selectComponent('.tab');
    let x = "curimgurl[" + 1 + "]";
    let y = "flag[" + 1 + "]"
    childComChange.setData({
      [x]: childComChange.data.imgurl[1].hovor,
      [y]: 1
    })
    // 距离密钥
    qqmapsdk = new QQMapWX({
      key: 'S32BZ-UDJCI-SLUGR-5KGRX-PMQJT-45B4X'
    });

    this.setData({
      userInfo: app.globalData.userInfo
    })

    let that = this

    // this.getRoad("广东技术师范大学",23.131701,113.371491)

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helpOrder/findNoGrab/' + that.data.userInfo.schoolId,
      method: 'GET',
      success: res => {
        wx.hideLoading()
        console.log(res)
        this.setData({
          helpOrderList: res.data.data,
          status: true
        })
        console.log(111)
        console.log(this.data.helpOrderList)

      }
    })
  },

  toNav: function(e){
    console.log(e)
    let name = e.currentTarget.dataset.name;
    let latitude = e.currentTarget.dataset.latitude;
    let longitude = e.currentTarget.dataset.longitude;
    app.getRoad(name, latitude, longitude);
  },

  //获得地图导航的函数
  getRoad: function (e) {
    let positionName = e.currentTarget.dataset.name;
    let latitude = e.currentTarget.dataset.latitude;
    let longitude = e.currentTarget.dataset.longitude;

    //这个是我申请的腾讯地图秘钥
    const key = "S32BZ-UDJCI-SLUGR-5KGRX-PMQJT-45B4X";
    //调用插件的app的名称（必填），这里随便写个名字就好
    const referer = "腾讯地图";

    //这个是我们要到达的目的地，name是地点名字，只是展示而已，真正的查询参数的下面那两个经纬度
    let endPoint = JSON.stringify({
      'name': positionName,
      'latitude': latitude,
      'longitude': longitude,
    });

    //这里调用腾讯地图的map组件，进去后就是访问腾讯地图的导航页面，把密钥key，应用名称，目的地作为参数携带过去
    wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },

  grab: function(e){
    console.log(e)
    let helpOrderId = e.currentTarget.dataset.id;
    console.log(helpOrderId)
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helper/grab',
      method: 'POST',
      data: {
        helpOrderId,
        helperOpenid: that.data.userInfo.openid,
        helperRealName: that.data.userInfo.realName,
        schoolId: that.data.userInfo.schoolId
      },
      success: res => {
        wx.hideLoading()
        if(true == res.data.flag && 200 == res.data.code){
          that.setData({
            // status: false,
            alertValue: res.data.message,
            showModal: true,
          })
        }else{
          that.setData({
            alertValue: res.data.message,
            showModal: true,
            getNew: false
          })
        }
      }
    })
  },

  submit: function() {
    this.setData({
    showModal: true
    })
   },
   
   preventTouchMove: function() {
   
   },
   
   
   go: function() { 
    this.setData({
      showModal: false,
    })

    let that = this

    if(true == this.data.getNew){
      this.setData({
        status: false
      })

      wx.showLoading({
        title: '加载中',
      })

      wx.request({
        url: 'https://zzxdream.cn1.utools.club/helpOrder/findNoGrab/' + that.data.userInfo.schoolId,
        method: 'GET',
        success: res => {
          wx.hideLoading()
          console.log(res)
          this.setData({
            helpOrderList: res.data.data,
            status: true
          })
          console.log(111)
          console.log(this.data.helpOrderList)
  
        }
      })
    }
    
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