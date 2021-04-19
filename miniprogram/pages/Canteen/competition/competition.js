// pages/competition/competition.js
"use strict";
const app = getApp();
import QQMapWX from '../../../common/qqmap-wx-jssdk';

let qqmapsdk;
let arr1 = []
let arr2 = []
let arr3 = []


Page({

  data: {
    resultAll: [], //装取送两个距离的数组（每个details都有一个这个数组，并且内含两个元素）
    comDetails: [],
    name: "",
    latitude: "", //纬度
    longitude: "",
    schoolId: 1, //测试数据，全局获取

    //顶部弹窗
    error: '', //有设值，有String在内就是true
    success: '', //顶部弹窗是否出现也直接取决于此
    // show:'',顶部弹窗是否出现
    i: 0,

    level: ''  //骑手标志
  },

  torider(){
    wx.redirectTo({
      url: '../../Common/protocol/protocol'
    })
  },

  //加载函数，加载函数中代码的作用如下：
  //获取两个地点的距离，需要用到QQmAPWX对象，上面已经加载了他的js文件，这里实例化他，其他函数就都能使用
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
    this.comDetailsShow(); //加载抢单信息
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'S32BZ-UDJCI-SLUGR-5KGRX-PMQJT-45B4X'
    });
  },

  open: function (e) {
    console.log(e.currentTarget.dataset.index);
    let i = e.currentTarget.dataset.index
    console.log(i);
    let show = "comDetails[" + i + "].show"
    this.setData({
      [show]: true
    })
  },

  toDetail: function (e) {
    console.log(e);
    let i = e.currentTarget.dataset.index;
    let that = this;
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/rider/grab',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        schoolId: that.data.schoolId,
        openid: app.globalData.userInfo.openid,
        orderId: e.currentTarget.dataset.orderid,
        riderRealName: app.globalData.userInfo.realName,
      },
      success: function (res) {
        console.log(res);
        if (res.data.flag == false && res.data.code == 201) {
          let ds = "comDetails[" + i + "].detailShow"
          that.setData({
            [ds]: false,
            error: '抱歉，您抢单失败了。',
          })
        } else if (res.data.flag == true && res.data.code == 200) {
          that.setData({
            success: '恭喜您，抢单成功！',
          })
          wx.navigateTo({
            url: '../competition/successTransfer/successTransfer?orderId=' + e.currentTarget.dataset.orderId + "&positonName1=" + that.data.comDetails[i].toAddress + "&latitude1=" + that.data.comDetails[i].receiveLatitude + "&longitude1=" + that.data.comDetails[i].receiveLongitude + "&positonName2=" + that.data.comDetails[i].fromAddress + "&latitude2=" + that.data.comDetails[i].carteenLatitude + "&longitude2=" + that.data.comDetails[i].carteenLongitude
          })
        }

        // }

      }
    })
    console.log(i);


  },

  //这里向后台请求地点参数（作为测验），返回给你一个地点的名字，经纬度
  getDestination: function () {
    let that = this;
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/position/2',
      method: 'GET',
      success: function (res) {
        console.log(res);
        //你可以打印一下 res， 看看数据放在哪里，然后逐级拿出来使用就可以
        console.log(res.data.data[0]);
        //获取两地的步行距离
        app.getDistance1(res.data.data[0].latitude, res.data.data[0].longitude);
      }
    })
  },

  //获取两地的距离，有驾车，步行，和直线三种
  //校园大家都熟悉，我们一般就是用步行的路线


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;

  },
  getData() {

  },
  getDistance1: function (lat_1, lng_1, i) {
    let that = this;
    let finalDistance_1 = '';
    qqmapsdk.calculateDistance({
      mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行 默认），'straight'（直线）

      to: [{ //to[]   这里可以写多个目的地，所以是一个集合，对应的距离有多个，也是个集合
        latitude: lat_1,
        longitude: lng_1,
      }, ],
      success: function (res) {
        //距离取的距离
        let distance1 = res.result.elements[0].distance;
        // console.log("两点不换算的距离为 = ", distance1);
        //保留一位小数，换算成km
        let a = parseFloat(distance1 / 1000).toFixed(1);
        finalDistance_1 = a + "km";
        console.log("距离为 = ", finalDistance_1);
        console.log(i); //这个i是该函数参数传过来的，表示comDetail的下标
        let dis1 = "comDetails[" + i + "].Distance_1";
        that.setData({
          [dis1]: finalDistance_1
        })
        // console.log(that.data.comDetails[i].totalDistance);

      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  getDistance2: function (lat_1, lng_1, lat_2, lng_2, i) {
    let that = this;
    let finalDistance_2 = '';
    qqmapsdk.calculateDistance({
      mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行 默认），'straight'（直线）

      //测试用,真实使用开定位会有相应的经纬度
      from: {
        latitude: lat_1,
        longitude: lng_1
      },

      to: [{
        latitude: lat_2,
        longitude: lng_2,
      }, ],
      success: function (res) {
        //距离取的距离
        let distance2 = res.result.elements[0].distance;
        // console.log("两点不换算的距离为 = ", distance1);
        //保留一位小数，换算成km
        let b = parseFloat(distance2 / 1000).toFixed(1);
        finalDistance_2 = b + "km";
        console.log("距离为 = ", finalDistance_2);
        let dis2 = "comDetails[" + i + "].Distance_2";
        that.setData({
          [dis2]: finalDistance_2
        })
      },
      fail: function (res) {
        console.log(res);
      }
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

  comDetailsShow: function () {
    console.log("牛逼")
    let that = this;
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/rider/grabAll/' + that.data.schoolId,
      method: 'GET',
      success: function (res) {
        console.log("请求成功", res);
        if (res.data.data.length != 0) {

          console.log(res.data.data.length);
          //防止频繁请求，这里有设定为5个
          for (let i = 0; i < res.data.data.length; i++) {
            arr1.push({
              price: res.data.data[i].riderMoney,
              arrivalTime: res.data.data[i].arriveTime,
              fromAddress: res.data.data[i].carteenName,
              toAddress: res.data.data[i].searchAddress + " " + res.data.data[i].detailAddress,
              riderMoney: res.data.data[i].riderMoney,
              Distance_1: '',
              Distance_2: '',
              detailShow: true, //这是是 "订单" 弹窗是否show的标志
              show: false, //这是是 "订单详情" 弹窗是否show的标志
              index: i, //index是push进去的唯一标识
              allFood: [],
              orderId: res.data.data[i].foodOrderId,
              receiveLatitude: res.data.data[i].receiveLatitude,
              receiveLongitude: res.data.data[i].receiveLongitude,
              carteenLatitude: res.data.data[i].carteenLatitude,
              carteenLongitude: res.data.data[i].carteenLongitude,
            })
            that.setData({
              comDetails: arr1
            })

            // console.log(comDetail[i].addTime);
            console.log("food_order_id:", that.data.comDetails[0].orderId);
            let a = res.data.data[i].receiveLatitude;
            let b = res.data.data[i].receiveLongitude;
            let c = res.data.data[i].carteenLatitude;
            let d = res.data.data[i].carteenLongitude;

            // 计算两个距离
            setTimeout(function () {
              that.getDistance1(a, b, i); //计算当前定位和取地址的距离,i是comdatails的index
              that.getDistance2(a, b, c, d, i) //计算取地址和送地址的距离
            }, 1000)

            /* 加载抢单的弹窗详情*/
            for (let j = 0; j < res.data.data[i].detailList.length; j++) {
              arr2.push({
                foodimg: res.data.data[i].detailList[j].food.imgPath,
                foodname: res.data.data[i].detailList[j].food.foodName,
                foodnum: res.data.data[i].detailList[j].number,
                foodprice: res.data.data[i].detailList[j].food.price
              })
              // 重新更新了一遍data内容，渲染上dom，setData内核  
            }
            let allFood = "comDetails[" + i + "].allFood";
            that.setData({
              [allFood]: arr2
            })
            // 中间变量arr2要清空，不然就会有重叠上一回的数据
            arr2 = arr3;
            // console.log(arr2);
          }
          that.setData({
            comDetails: arr1
          })
          console.log(that.data.comDetails);
          //把中间数组清空
          arr1 = [];
          arr2 = [];
          arr3 = [];
          console.log(arr1);
        } else {
          console.log("没有订单！！");
          that.setData({
            comDetails: []
          })
        }



      }

    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.i == 0){
      this.setData({
        i:1
      })
      return;
    }
    this.comDetailsShow(); //加载抢单信息
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