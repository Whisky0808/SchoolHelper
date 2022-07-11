// pages/confirm/confirm.js
// import QQMapWX from '../../../common/qqmap-wx-jssdk';
const app = getApp();

// var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    helpOrderId: '',
    conponMoney: 0,
    status: '',
    endAddress: '',
    endDetailAddress: '',
    endLatitude: '',
    endLongitude: '',
    endTime: '',
    helperMoney: '',
    helperMust: '',
    applyNum: '',
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
    content: '',
    startAddress: '',
    startDetailAddress: '',
    startLatitudes: '',
    startLongitudes: '',
    helperRealName: '',
    helperOpenid: '',
    helperOpenidList: '',
    helperStatus: '',
    showModal: false,
    alertValue: '',
    userInfo: {},

    // 弹窗
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    // 距离密钥
    // qqmapsdk = new QQMapWX({
    //   key: 'S32BZ-UDJCI-SLUGR-5KGRX-PMQJT-45B4X'
    // });

    // this.getDistance();

    // let data = options.data;
    console.log("来了")
    console.log(data)
    console.log(data.startAddressList)

    let startAddressList = '';
    let startDetailAddressList = '';
    let startLatitudeList = '';
    let startLongitudeList = '';

    if(startAddressList != ''){
      startAddressList = data.startAddressList.split('#');
      startDetailAddressList = data.startDetailAddressList.split('#');
      startLatitudeList = data.startLatitudeList.split('#');
      startLongitudeList = data.startLongitudeList.split('#');
    }
    

    let helperRealName = '';
    let helperOpenid = '';
    let helperStatus = '';
    if(data.status == '4'){
      helperRealName = data.names.split('#');
      helperOpenid = data.openids.split('#');
      helperStatus = data.statuses.split('#');
    }else{
      helperRealName = data.helperRealName.split(',');
      helperOpenid = data.helperOpenid.split(',');
      helperStatus = data.helperStatus.split(',');
    }
    
    console.log("看过来 = ", helperRealName.length)

    this.setData({
      helperOpenid: helperOpenid,
      helperOpenidList: data.helperOpenid,
      helperStatus: helperStatus,
      helperRealName: helperRealName,
      applyNum: data.applyNum,
      helpOrderId: data.helpOrderId,
      status: data.status,
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
      startAddress: data.startAddress,
      startDetailAddress: data.startDetailAddress,
      startLatitudes: data.startLatitudes,
      startLongitudes: data.startLongitudes,
      couponMoney: data.couponMoney,
      flag: true
    })
  },

  // 弹窗
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
    wx.navigateBack({
      delta: 1
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },

  buildChat: function(e){
    // let that = this;
    // let openids = this.data.helperOpenidList + "," + this.data.userInfo.openid;
    // wx.request({
    //   url: 'https://zzxdream.cn1.utools.club/buildChat/addChat',
    //   method: 'POST',
    //   data: {
    //     chatId: that.data.helpOrderId,
    //     chatType: 2,
    //     schoolId: that.data.userInfo.schoolId,
    //     openids: openids,
    //     chatName: that.data.title
    //   },
    //   success: res => {
    //     console.log("添加聊天成功！")
    //     console.log(res)
        wx.navigateTo({
          url: '../../Common/chat/chat?avartarUrl=' + this.data.userInfo.avartarUrl + "&chatId=" + this.data.helpOrderId
        })
    //   }
    // })
  },

  cancel(){
    let that = this;
    console.log(app.globalData.userInfo.schoolId+'#'+app.globalData.userInfo.openid+'#'+that.data.helpOrderId)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helpOrder/cancleHelpOrder',
      data: {
        schoolId: app.globalData.userInfo.schoolId,
        openid: app.globalData.userInfo.openid,
        helpOrderId: that.data.helpOrderId
      },
      method: 'POST',
      success: function (res) {
        console.log('取消订单成功！');
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  pay: function () {
    let that = this;
    // let openid = 'omfL-4vHXzZLzDu3iEKYkT5HFZhg';
    let out_trade_no = this.data.helpOrderId;
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

  //获得地图导航的函数
  getRoad: function (e) {
    let positionName = e.currentTarget.dataset.name;
    let latitude = e.currentTarget.dataset.latitude;
    let longitude = e.currentTarget.dataset.longitude;
    app.getRoad(positionName, latitude, longitude);
    // console.log("=", positionName, "=", latitude, "=", longitude)
    //
    // //这个是我申请的腾讯地图秘钥
    // const key = "S32BZ-UDJCI-SLUGR-5KGRX-PMQJT-45B4X";
    // //调用插件的app的名称（必填），这里随便写个名字就好
    // const referer = "腾讯地图";
    //
    // //这个是我们要到达的目的地，name是地点名字，只是展示而已，真正的查询参数的下面那两个经纬度
    // let endPoint = JSON.stringify({
    //   'name': positionName,
    //   'latitude': latitude,
    //   'longitude': longitude,
    // });
    //
    // //这里调用腾讯地图的map组件，进去后就是访问腾讯地图的导航页面，把密钥key，应用名称，目的地作为参数携带过去
    // wx.navigateTo({
    //     url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    // });
  },

  //获取两地的距离，有驾车，步行，和直线三种
    //校园大家都熟悉，我们一般就是用步行的路线
    // getDistance: function(lat, lng){
    //   qqmapsdk.calculateDistance({
    //     mode:'walking',//可选值：'driving'（驾车）、'walking'（步行 默认），'straight'（直线）
    //      to:[{   //to[]   这里可以写多个目的地，所以是一个集合，对应的距离有多个，也是个集合
    //       latitude: lat,
    //       longitude: lng
    //     }],
    //     success: function (res) {
    //       //距离
    //       var distance = res.result.elements[0].distance;
    //       console.log(distance)
    //       if(distance <= 50){
    //         console.log("牛逼")
    //       }
    //
    //     },
    //     fail: function(res){
    //       console.log(res);
    //     }
    //   })
    // },

  addHelperOrder: function(){
    let that = this;
    let data = this.data;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helpOrder/add',
      method: 'POST',
      data: {
        schoolId: that.data.userInfo.schoolId,
        openid: that.data.userInfo.openid,
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
        startTime: data.startTime,
        title: data.title,
        totalMoney: data.totalMoney,
        startAddress: data.startAddress,
        startDetailAddress: data.startDetailAddress,
        startLatitudes: data.startLatitudes,
        startLongitudes: data.startLongitudes
      },
      success: res => {
        wx.hideLoading()
        console.log("结果 = ", res)
        let helpOrderId = res.data.data;
        wx.navigateTo({
          url: '../../Common/pay/pay?body=' + '需求单支付' + '&total_fee=' + this.data.totalMoney
             + '&openid=' + that.data.userInfo.openid + '&out_trade_no=' + helpOrderId
        })
      }
    })
  },

  signIn: function(e){
    let that = this;
    let openid = e.currentTarget.dataset.openid;
    console.log('openid = ', openid)
    let index = e.currentTarget.dataset.index;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/helpOrder/helperSignIn',
      method: 'POST',
      data: {
        schoolId: 1,
        helpOrderId: that.data.helpOrderId,
        openid
      },
      success: res => {
        wx.hideLoading()
        console.log('===')
        console.log(res)
        let helperStatus = that.data.helperStatus;
        helperStatus[index] = '1';
        that.setData({
          helperStatus: helperStatus,
          showModal: true,
          alertValue: res.data.message
        })
      }
    })
  },

  go: function() { 
    this.setData({
      showModal: false
    })
  }
})