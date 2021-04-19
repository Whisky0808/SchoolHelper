// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '待付款', index: 1 }, { name: '待完成', index: 2 }],
    ifHide:false,
    userInfo: {},
    alreadyOrder: [],
    waitPayOrder: [],
    lostOrder: [],
    toDetail:[],
    noPayDetail: [],
    noCompeted: [],
    // 弹窗
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
  },

  // 弹窗
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
    wx.navigateTo({
      url: '../fantang/fantang?shoolId=' + app.globalData.userInfo.schoolId,
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },

  // 点击某个菜品
  foodClick(e){
    let curDetail = {
      detailList: this.data.toDetail[e.currentTarget.dataset.index].detailList,
      totalMoney: this.data.toDetail[e.currentTarget.dataset.index].totalMoney,
      distributionFee: this.data.toDetail[e.currentTarget.dataset.index].riderMoney + this.data.toDetail[e.currentTarget.dataset.index].platformMoney,
      searchAddress: this.data.toDetail[e.currentTarget.dataset.index].searchAddress,
      addTime: this.data.toDetail[e.currentTarget.dataset.index].addTime,
      carteenName: this.data.toDetail[e.currentTarget.dataset.index].carteenName
    };
    let curDetailJson = JSON.stringify(curDetail);
    wx.navigateTo({
      url: '../transaction_order/transaction_order?curDetail=' + curDetailJson
    });
  },
  //点击未支付部分的菜品
  waitpayClick(e){
    let curDetail = {
      detailList: this.data.noPayDetail[e.currentTarget.dataset.index].detailList,
      totalMoney: this.data.noPayDetail[e.currentTarget.dataset.index].totalMoney,
      distributionFee: this.data.noPayDetail[e.currentTarget.dataset.index].riderMoney + this.data.toDetail[e.currentTarget.dataset.index].platformMoney,
      searchAddress: this.data.noPayDetail[e.currentTarget.dataset.index].searchAddress,
      addTime: this.data.noPayDetail[e.currentTarget.dataset.index].addTime,
      carteenName: this.data.noPayDetail[e.currentTarget.dataset.index].carteenName,
      foodOrderId: this.data.noPayDetail[e.currentTarget.dataset.index].foodOrderId,
    };
    console.log(curDetail);
    let curDetailJson = JSON.stringify(curDetail);
    console.log(curDetailJson);
    wx.navigateTo({
      url: '../nopay_order/nopay_order?curDetail=' + curDetailJson
    });
  },
  // 点击未完成订单
  noCompletedClick(e){
    let curDetail = {
      detailList: this.data.noCompeted[e.currentTarget.dataset.index].detailList,
      totalMoney: this.data.noCompeted[e.currentTarget.dataset.index].totalMoney,
      distributionFee: this.data.noCompeted[e.currentTarget.dataset.index].riderMoney + this.data.toDetail[e.currentTarget.dataset.index].platformMoney,
      searchAddress: this.data.noCompeted[e.currentTarget.dataset.index].searchAddress,
      addTime: this.data.noCompeted[e.currentTarget.dataset.index].addTime,
      carteenName: this.data.noCompeted[e.currentTarget.dataset.index].carteenName,
      foodOrderId: this.data.noCompeted[e.currentTarget.dataset.index].foodOrderId,
      status: this.data.noCompeted[e.currentTarget.dataset.index].status
    };
    let curDetailJson = JSON.stringify(curDetail);
    console.log(curDetailJson);
    wx.navigateTo({
      url: '../nocompleted/nocompleted?curDetail=' + curDetailJson
    });
  },

  // 支付函数
  pay: function (e) {
    let  that = this;
    let total_fee = parseInt(that.data.noPayDetail[e.currentTarget.dataset.index].totalMoney).toFixed(2);
    console.log(e.currentTarget.dataset.index);
    console.log(that.data.noPayDetail[e.currentTarget.dataset.index].totalMoney);
    total_fee = (total_fee * 100).toString();
    console.log('支付：openid='+ app.globalData.userInfo.openid+' 订单号='+that.data.noPayDetail[e.currentTarget.dataset.index].foodOrderId+' 总价格='+total_fee);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/wxpay/createWXPay',
      data: {
        openid: app.globalData.userInfo.openid,
        out_trade_no: that.data.noPayDetail[e.currentTarget.dataset.index].foodOrderId,
        // total_fee: total_fee,
        total_fee: '1',
        schoolId: app.globalData.userInfo.schoolId,
        status: "1",
        body: "食堂外卖支付",
        exchange: "exchange.foodOrder",
        routingkey: "queue.foodOrder"
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function (res) {
            // 弹窗
            that.tapOneDialogButton();
            console.log(res);
            // wx.navigateTo({
            //   url: '../fantang/fantang?shoolId=' + app.globalData.userInfo.schoolId,
            // })
          },
          fail: function (res) {
            // fail
            console.log(res);
          },
          complete: function (res) {
            // complete
            console.log(res);
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let childComChange = this.selectComponent('.tab');
    let x = "curimgurl[" + 3 + "]";
    let y = "flag[" + 3 + "]"
    childComChange.setData({
      [x]: childComChange.data.imgurl[3].hovor,
      [y]: 1
    })
    let that = this;
    console.log(app);
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if(this.data.userInfo.level === '1'){
      this.setData({
        ifHide : false
      })
    }
    else{
      this.setData({
        ifHide : true
      })
    }

    wx.showLoading({
      title: '加载中',
    })
    // 获取用户已完成订单数据
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/order/finish/'+that.data.userInfo.openid,
      success (res) {
        wx.hideLoading()
        console.log('已完成')
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

    wx.showLoading({
      title: '加载中',
    })
    // 获取用户未支付订单
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/order/noPay/' + that.data.userInfo.schoolId + '/' + that.data.userInfo.openid,
      success (res) {
        wx.hideLoading()
        console.log('未支付')
        console.log(res.data.data);
        that.setData({
          noPayDetail: res.data.data
        })
        res.data.data.forEach(function (value,index) {
          let food = [];
          value.detailList.forEach(function (v,i) {
            food.push({
              foodName:v.food.foodName,
              imgPath:v.food.imgPath
            })
          })
          that.data.waitPayOrder.push({
            name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
            // state: "交易成功",
            money: value.totalMoney.toString(),
            food:food,
          })
        })
      }
    })

    wx.showLoading({
      title: '加载中',
    })
    // 获取用户待完成
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/order/payButNoFinish/' + that.data.userInfo.schoolId + '/' + that.data.userInfo.openid,
      success (res) {
        wx.hideLoading()
        console.log('待完成')
        console.log(res.data.data);
        that.setData({
          noCompeted: res.data.data
        })
        res.data.data.forEach(function (value,index) {
          let food = [];
          value.detailList.forEach(function (v,i) {
            food.push({
              foodName:v.food.foodName,
              imgPath:v.food.imgPath
            })
          })
          that.data.lostOrder.push({
            name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
            // state: "交易成功",
            money: value.totalMoney.toString(),
            food:food,
            status: value.status
          })
        })
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

  // 转换到骑手界面
  changeToRider(){
    wx.redirectTo({
      url: '../riderorder/riderorder',
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
        // 获取用户已完成订单数据
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/order/finish/'+that.data.userInfo.openid,
          success (res) {
            wx.hideLoading()
            console.log('已完成')
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
        // 获取用户未支付订单
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/order/noPay/' + that.data.userInfo.schoolId + '/' + that.data.userInfo.openid,
          success (res) {
            wx.hideLoading()
            console.log('未支付')
            console.log(res.data.data);
            that.setData({
              noPayDetail: res.data.data
            })
            res.data.data.forEach(function (value,index) {
              let food = [];
              value.detailList.forEach(function (v,i) {
                food.push({
                  foodName:v.food.foodName,
                  imgPath:v.food.imgPath
                })
              })
              that.data.waitPayOrder.push({
                name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
                // state: "交易成功",
                money: value.totalMoney.toString(),
                food:food,
              })
            })
          }
        })
      }else if(e.target.dataset.current == 2){
        that.setData({
          lostOrder: []
        })
        wx.showLoading({
          title: '加载中',
        })
        // 获取用户待完成
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/order/payButNoFinish/' + that.data.userInfo.schoolId + '/' + that.data.userInfo.openid,
          success (res) {
            wx.hideLoading()
            console.log('待完成')
            console.log(res.data.data);
            that.setData({
              noCompeted: res.data.data
            })
            res.data.data.forEach(function (value,index) {
              let food = [];
              value.detailList.forEach(function (v,i) {
                food.push({
                  foodName:v.food.foodName,
                  imgPath:v.food.imgPath
                })
              })
              that.data.lostOrder.push({
                name: value.detailList[0].food.foodName + '(' + value.carteenName + ')',
                // state: "交易成功",
                money: value.totalMoney.toString(),
                food:food,
                status: value.status
              })
            })
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

  lostShow: function () {
    setTimeout(()=>{
      this.setData({
        lostOrder: this.data.lostOrder
      })
    },500)
  },


})