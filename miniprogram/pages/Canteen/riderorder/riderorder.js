// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '未完成', index: 1 }],
    userInfo: {},
    toDetail: [],
    notFinish: [],
    alreadyOrder: [],
    waitPayOrder: []
  },

  modifyStatu(e){
    console.log("来修改啦");
    let that = this;
    let x = "waitPayOrder[" + e + "].state";
    this.setData({
      [x]: "已送达"
    })
    console.log(app.globalData.userInfo.schoolId+'#'+that.data.notFinish[e].foodOrderId+'#'+app.globalData.userInfo.openid)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/order/deliverOK',
      data: {
        schoolId: app.globalData.userInfo.schoolId,
        foodOrderId: that.data.notFinish[e].foodOrderId,
        riderOpenid: app.globalData.userInfo.openid
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
      }
    })
  },

  //点击订单完成部分
  alreadyClick(e){
    let curDetail = {
      detailList: this.data.toDetail[e.currentTarget.dataset.index].detailList,
      totalMoney: this.data.toDetail[e.currentTarget.dataset.index].totalMoney,
      distributionFee: this.data.toDetail[e.currentTarget.dataset.index].riderMoney + this.data.toDetail[e.currentTarget.dataset.index].platformMoney,
      searchAddress: this.data.toDetail[e.currentTarget.dataset.index].searchAddress,
      addTime: this.data.toDetail[e.currentTarget.dataset.index].addTime,
      carteenName: this.data.toDetail[e.currentTarget.dataset.index].carteenName,
      foodOrderId: this.data.toDetail[e.currentTarget.dataset.index].foodOrderId,
    };
    let curDetailJson = JSON.stringify(curDetail);
    console.log(curDetailJson);
    wx.navigateTo({
      url: '../rider_finish/rider_finish?curDetail=' + curDetailJson
    });
  },

  //点击未配送完成部分
  waitpayClick(e){
    let curDetail = {
      detailList: this.data.notFinish[e.currentTarget.dataset.index].detailList,
      totalMoney: this.data.notFinish[e.currentTarget.dataset.index].totalMoney,
      distributionFee: this.data.notFinish[e.currentTarget.dataset.index].riderMoney + this.data.notFinish[e.currentTarget.dataset.index].platformMoney,
      searchAddress: this.data.notFinish[e.currentTarget.dataset.index].searchAddress,
      addTime: this.data.notFinish[e.currentTarget.dataset.index].addTime,
      carteenName: this.data.notFinish[e.currentTarget.dataset.index].carteenName,
      foodOrderId: this.data.notFinish[e.currentTarget.dataset.index].foodOrderId,
      addTimeNoFinish: this.data.notFinish[e.currentTarget.dataset.index].addTimeNoFinish,
      receiveLatitude: this.data.notFinish[e.currentTarget.dataset.index].receiveLatitude,
      receiveLongitude: this.data.notFinish[e.currentTarget.dataset.index].receiveLongitude,
      curIndex: e.currentTarget.dataset.index
    };
    let curDetailJson = JSON.stringify(curDetail);
    console.log(curDetailJson);
    wx.navigateTo({
      url: '../rider_nofinish/rider_nofinish?curDetail=' + curDetailJson
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(app);
    this.setData({
      userInfo: app.globalData.userInfo
    })

    wx.showLoading({
      title: '加载中',
    })
    // 获取骑手已完成订单数据
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/order/finishDeliver/'+that.data.userInfo.openid,
      success (res) {
        console.log('骑手已完成')
        console.log(res.data.data);
        that.setData({
          toDetail: res.data.data
        })
        res.data.data.forEach(function (value,index) {
          let food = [];
          value.detailList.forEach(function (v,i) {
            food.push({
              foodName:v.food.foodName,
              imgPath:v.food.imgPath
            })
          })
          that.data.alreadyOrder.push({
            name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
            state: "交易成功",
            money: value.totalMoney.toString(),
            food:food,
          })
        })
        console.log(that.data.alreadyOrder);
      }
    })

    // 获取骑手未完成
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/order/deliver/' + that.data.userInfo.schoolId + '/'+ that.data.userInfo.openid,
      success (res) {
        wx.hideLoading()
        console.log('骑手待配送')
        console.log(res.data.data);
        that.setData({
          notFinish: res.data.data
        })
        res.data.data.forEach(function (value,index) {
          let food = [];
          let state = '';
          if(value.status === '3'){
            state = "待配送";
          }else if(value.status === '4'){
            state = "已完成"
          }
          console.log(value.status);
          console.log(state);
          value.detailList.forEach(function (v,i) {
            food.push({
              foodName:v.food.foodName,
              imgPath:v.food.imgPath
            })
          })
          that.data.waitPayOrder.push({
            name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
            state: state,
            money: value.totalMoney.toString(),
            food:food,
          })
        })
        console.log(that.data.waitPayOrder);
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
    wx.redirectTo({
      url: '../details/details',
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
      that.setData({
        currtab: e.target.dataset.current
      })
      if(e.target.dataset.current == 0){
        that.setData({
          alreadyOrder: []
        })
        wx.showLoading({
          title: '加载中',
        })
        // 获取骑手已完成订单数据
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/order/finishDeliver/'+that.data.userInfo.openid,
          success (res) {
            wx.hideLoading()
            console.log('骑手已完成')
            console.log(res.data.data);
            that.setData({
              toDetail: res.data.data
            })
            res.data.data.forEach(function (value,index) {
              let food = [];
              value.detailList.forEach(function (v,i) {
                food.push({
                  foodName:v.food.foodName,
                  imgPath:v.food.imgPath
                })
              })
              that.data.alreadyOrder.push({
                name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
                state: "交易成功",
                money: value.totalMoney.toString(),
                food:food,
              })
            })
            console.log(that.data.alreadyOrder);
          }
        })
      }else if(e.target.dataset.current == 1){
        that.setData({
          waitPayOrder: []
        })
        wx.showLoading({
          title: '加载中',
        })
        // 获取骑手未完成
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/order/deliver/' + that.data.userInfo.schoolId + '/'+ that.data.userInfo.openid,
          success (res) {
            wx.hideLoading()
            console.log('骑手待配送')
            console.log(res.data.data);
            that.setData({
              notFinish: res.data.data
            })
            res.data.data.forEach(function (value,index) {
              let food = [];
              let state = '';
              if(value.status === '3'){
                state = "待配送";
              }else if(value.status === '4'){
                state = "已完成"
              }
              console.log(value.status);
              console.log(state);
              value.detailList.forEach(function (v,i) {
                food.push({
                  foodName:v.food.foodName,
                  imgPath:v.food.imgPath
                })
              })
              that.data.waitPayOrder.push({
                name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
                state: state,
                money: value.totalMoney.toString(),
                food:food,
              })
            })
            console.log(that.data.waitPayOrder);
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
    }
  },

  alreadyShow: function () {
    setTimeout(()=>{
      this.setData({
        alreadyOrder: this.data.alreadyOrder
      })
    },500)
  },

  waitPayShow: function () {
    setTimeout(()=>{
      this.setData({
        waitPayOrder: this.data.waitPayOrder
      })
    },500)
  },

})