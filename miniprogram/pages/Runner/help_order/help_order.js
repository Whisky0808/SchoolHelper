// pages/order/order.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: true,
    ifHide:false,
    userInfo: {},
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '未付款', index: 1 }, { name: '待完成', index: 2 }],
    waitPayOrder: '',
    finishOrder: '',
    waitFinishOrder: '',
    // schoolId: null,
    // openid: ''

    // 弹窗
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
  },

  formatDate: function(fomatType, date) {
    let ret;
    let valueDate = date;
    if (!date) valueDate = new Date()
    let opt = {
        "Y+": valueDate.getFullYear().toString(),        // 年
        "m+": (valueDate.getMonth() + 1).toString(),     // 月
        "d+": valueDate.getDate().toString(),            // 日
        "H+": valueDate.getHours().toString(),           // 时
        "M+": valueDate.getMinutes().toString(),         // 分
        "S+": valueDate.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fomatType);
        if (ret) {
            fomatType = fomatType.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    console.log(fomatType)
    return fomatType;
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
    console.log(1)
    this.setData({
      userInfo: app.globalData.userInfo,
      // schoolId: app.globalData.userInfo.schoolId,
      // openid: app.globalData.userInfo.openid
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


    let that = this;
    // this.formatDate('YYYY-mm-dd HH:MM', new Date())
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helpOrder/finish/' + that.data.userInfo.openid,
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
          currtab: e.target.dataset.current,
          finishOrder: ''
        })

        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/helpOrder/finish/' + that.data.userInfo.openid,
          method: 'GET',
          success: res => {
            wx.hideLoading()
            this.setData({
              finishOrder: res.data.data
            })
            console.log("---")
            console.log(res)
            console.log(this.data.finishOrder)
          }
        })
      }
      else if(e.target.dataset.current == 1){
        that.setData({
          currtab: e.target.dataset.current,
          waitPayOrder: ''
        })

        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/helpOrder/noPay/'+ that.data.userInfo.schoolId +'/' + that.data.userInfo.openid,
          method: 'GET',
          success: res => {

            wx.hideLoading()

            console.log("请求成功！")
            that.setData({
              waitPayOrder: res.data.data,
              // waitPayOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "待付款", time: "2020-09-30 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "86" }],
            })
            console.log('===')
            console.log(this.data.waitPayOrder)
          }
        })
      }else if(e.target.dataset.current == 2){
        that.setData({
          currtab: e.target.dataset.current,
          waitFinishOrder: ''
        })
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: 'https://zzxdream.cn1.utools.club/helpOrder/payButNoFinish/'+ that.data.userInfo.schoolId +'/' + that.data.userInfo.openid,
          method: 'GET',
          success: res => {
            wx.hideLoading()
            console.log("请求成功！")
            that.setData({
              waitFinishOrder: res.data.data,
              // waitPayOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "待付款", time: "2020-09-30 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "86" }],
            })
            console.log('===')
            console.log(this.data.waitFinishOrder)
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
    this.setData({
      alreadyOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "交易成功", time: "2020-09-30 14:00-16:00", status: "已结束", url: "../../images/bad0.png", money: "56" }, { name: "番茄炒蛋加牛仔骨头(春晖园)", state: "交易成功", time: "2020-09-30 14:00-16:00", status: "已结束", url: "../../images/bad0.png", money: "32" }, { name: "番茄炒蛋加牛仔骨头(春晖园)", state: "交易成功", time: "2020-09-30 14:00-16:00", status: "已结束", url: "../../images/bad0.png", money: "16" }]
    })
  },

  waitPayShow: function () {
    // this.setData({
      // waitPayOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "待付款", time: "2020-09-30 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "86" }],
    // })
  },

  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "已取消", time: "2020-09-30 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "122" }],
    })
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
      url: '../help_order_detail/help_order_detail?startTime=' + data.startTime
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
      + '&helperRealName=' + data.helperRealName + '&helperOpenid=' + data.helperOpenid
      + '&helperStatus=' + data.helperStatus + '&names=' + data.names
      + '&openids=' + data.openids + '&statuses=' + data.statuses
    })
  },

  // 弹窗
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

  pay: function (e) {
    let that = this;
    // let openid = 'omfL-4vHXzZLzDu3iEKYkT5HFZhg';
    let out_trade_no = e.currentTarget.dataset.id;
    let body = '需求单支付';
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/wxpay/createWXPay',
      data: {
        openid: that.data.userInfo.openid,
        out_trade_no: out_trade_no,
        // total_fee: that.data.total_fee,
        total_fee: '1',
        status: "1",
        schoolId: that.data.userInfo.schoolId,
        body: body,
        exchange: "exchange.helpOrder",
        routingkey: "queue.helpOrder"
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

            console.log("success")
            that.setData({
              waitPayOrder: ''
            })

            wx.request({
              url: 'https://zzxdream.cn1.utools.club/helpOrder/noPay/'+ that.data.userInfo.schoolId +'/' + that.data.userInfo.openid,
              method: 'GET',
              success: res => {
                console.log("请求成功！")
                that.setData({
                  waitPayOrder: res.data.data,
                  // waitPayOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "待付款", time: "2020-09-30 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "86" }],
                })
                console.log('===')
                console.log(that.data.waitPayOrder)
              }
            })


            // success
            console.log(res);
          },
          fail: function (res) {
            console.log("fail")
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

  onShow: function(){
    if(this.data.first == true){
      this.setData({
        first: false
      })
      return;
    }
    let that = this
    if(this.data.currtab == 0){
      that.setData({
        finishOrder: ''
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/helpOrder/finish/' + that.data.userInfo.openid,
        method: 'GET',
        success: res => {
          wx.hideLoading()
          this.setData({
            finishOrder: res.data.data
          })
          console.log("---")
          console.log(res)
          console.log(this.data.finishOrder)
        }
      })
    }
    else if(this.data.currtab == 1){
      that.setData({
        waitPayOrder: ''
      })

      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/helpOrder/noPay/'+ that.data.userInfo.schoolId +'/' + that.data.userInfo.openid,
        method: 'GET',
        success: res => {

          wx.hideLoading()

          console.log("请求成功！")
          that.setData({
            waitPayOrder: res.data.data,
            // waitPayOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "待付款", time: "2020-09-30 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "86" }],
          })
          console.log('===')
          console.log(this.data.waitPayOrder)
        }
      })
    }else if(this.data.currtab == 2){
      that.setData({
        waitFinishOrder: ''
      })

      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/helpOrder/payButNoFinish/'+ that.data.userInfo.schoolId +'/' + that.data.userInfo.openid,
        method: 'GET',
        success: res => {
          wx.hideLoading()
          console.log("请求成功！")
          that.setData({
            waitFinishOrder: res.data.data,
            // waitPayOrder: [{ name: "番茄炒蛋加牛仔骨头(春晖园)", state: "待付款", time: "2020-09-30 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "86" }],
          })
          console.log('===')
          console.log(this.data.waitFinishOrder)
        }
      })
    }
  },

  // 转换到骑手界面
  changeToRider(){
    wx.navigateTo({
      url: '../riderorder/riderorder',
    })
  },

})