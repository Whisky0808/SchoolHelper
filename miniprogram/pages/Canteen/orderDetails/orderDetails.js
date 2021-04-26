// pages/orderDetails/orderDetails.js
const app = getApp()
var gettime = require('../../../common/gettime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //优惠券要用到的三个属性，flag表示当优惠券加载完成之后才能展示整个页面
    couponList: '',
    couponId: -1,
    keepMoney: '',

    allFood:[],
    curprice:0,
    platformFee:0,
    riderFee: 0,
    // riderTime:0,
    carteenName: null,
    userAdress:[],
    hidepopup:true,
    curAds:0,
    carteenId:null,
    carteenLatitude:0,
    carteenLongitude:0,
    remark:'',
    allPrice:0,
    openId: '',
    hourtime: 0,
    mintime: 0,
    schoolId: 0,
    // 地址是否为空
    flag: 3
  },

  submitOrder(e){
    let ownerOpenid = this.data.openId;
    let carteenId = this.data.carteenId;
    let totalMoney = this.data.allPrice;
    let remark = this.data.remark.toString();
    let riderMoney = this.data.riderFee;
    let platformMoney = this.data.platformFee;
    let carteenName = this.data.carteenName;
    let searchAddress = this.data.userAdress[this.data.curAds].searchAddress;
    let detailAddress = this.data.userAdress[this.data.curAds].detailAddress;
    let phone = this.data.userAdress[this.data.curAds].phone;
    let name = this.data.userAdress[this.data.curAds].name;
    let receiveLatitude = this.data.userAdress[this.data.curAds].latitude;
    let receiveLongitude = this.data.userAdress[this.data.curAds].longitude;
    let carteenLatitude = this.data.carteenLatitude;
    let carteenLongitude = this.data.carteenLongitudde;
    let foodDetails = '';
    let schoolId = app.globalData.userInfo.schoolId;

    let allfood = this.data.allFood;
    allfood.forEach(function (value,index) {
      foodDetails = foodDetails + value.foodid.toString() + '#'
          + value.foodprice.toString() + '#'
          + value.foodnum.toString() + '#'
          + value.foodname + '#'
          + value.foodimg;
      if(index != allfood.length - 1){
        foodDetails = foodDetails + '&';
      }
    })
    console.log('食物拼接');
    console.log(foodDetails);
    console.log(ownerOpenid+'  '+carteenId+'  '+totalMoney+'  '+remark+'  '+riderMoney+'  '+platformMoney+'  '+carteenName+'  '+searchAddress+'  '+detailAddress+'  '+phone+'  '+name+'  '+receiveLatitude+'  '+receiveLongitude+'  '+carteenLatitude+'  '+carteenLongitude+'  '+schoolId);

    let curyear = gettime.formatYearTime(new Date());
    let curmonth = gettime.formatMonthTime(new Date());
    let curdate = gettime.formatDateTime(new Date());
    let curhourtime = gettime.formatHourTime(new Date()) + this.data.hourtime;
    let curmintime = gettime.formatMinTime(new Date()) + this.data.mintime;
    let curs = gettime.formatSTime(new Date());
    curyear = gettime.formatNumber(curyear);
    curmonth = gettime.formatNumber(curmonth);
    curdate = gettime.formatNumber(curdate);
    curhourtime = gettime.formatNumber(curhourtime);
    curmintime = gettime.formatNumber(curmintime);
    curs = gettime.formatNumber(curs);
    let arriveTime = curhourtime + ':' + curmintime;
    let totalArriveTime = curyear +'-' + curmonth + '-' + curdate + ' ' + curhourtime + ':' + curmintime + ':' + curs;

    console.log(totalArriveTime);
    console.log(schoolId);

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url:'https://zzxdream.cn1.utools.club/order/add',
      data:{
        ownerOpenid,
        carteenId,
        totalMoney,
        remark,
        riderMoney,
        platformMoney,
        carteenName,
        searchAddress,
        detailAddress,
        phone,
        name,
        receiveLatitude,
        receiveLongitude,
        carteenLatitude,
        carteenLongitude,
        foodDetails,
        arriveTime,
        schoolId,
        totalArriveTime
      },
      header: {
        'content-type': 'application/json'
      }, //请求头类型
      method: 'POST',
      success: res => {
        wx.hideLoading()
        console.log("提交订单了");
        console.log(res);
        wx.navigateTo({
          url: '../../Common/pay/pay?openid=' + ownerOpenid + '&out_trade_no=' + res.data.message + '&total_fee=' + totalMoney  + '&level=1',
        })
      }
    })

  },

  bindMarkInput(e){
    this.setData({
      remark:e.detail.value
    })
  },

  getRiderMoney(){
    console.log('点了');
    app.getDistance3(this.data.carteenLatitude, this.data.carteenLongitude);
  },

  // 组件传来的数据
  handleItemChange(e){
    console.log(e);
    let that = this;
    if(e.detail == 'add'){
      wx.navigateTo({
        url: '../moreAdress/moreAdress?func=新增'
            +'&allFood='+JSON.stringify(that.data.allFood)
            +'&curprice='+that.data.curprice
            +'&carteenName='+that.data.carteenName
      })
    }
    else if(e.detail == 'modify'){
      const instance = that.selectComponent('.list');
      // 打印出来的就是list 组件的实例了，这样就可以获取到子组件所有的数据了！
      // 注意！这里也可以调用setData 等方法直接修改组件的值
      console.log(instance.__data__.modifyindex);
      // console.log(that.data.carteenName);
      // console.log('饭堂名字')
      wx.navigateTo({
        url: '../moreAdress/moreAdress?func=修改&searchValue='+that.data.userAdress[instance.__data__.modifyindex].searchAddress
            +'&detailAddress='+that.data.userAdress[instance.__data__.modifyindex].detailAddress
            +'&name='+that.data.userAdress[instance.__data__.modifyindex].name
            +'&phone='+that.data.userAdress[instance.__data__.modifyindex].phone
            +'&choosedLatitude='+that.data.userAdress[instance.__data__.modifyindex].latitude
            +'&choosedLongitude='+that.data.userAdress[instance.__data__.modifyindex].longDesc
            +'&addressId='+that.data.userAdress[instance.__data__.modifyindex].addressId
            +'&allFood='+JSON.stringify(that.data.allFood)
            +'&curprice='+that.data.curprice
            +'&carteenName='+that.data.carteenName
      })
    }
    else{
      let useraddress = that.data.userAdress;
      this.setData({
        curAds:e.detail
      })
      that.getPlatformFee();
      that.getRiderFee();
      let allprice = that.data.platformFee + that.data.riderFee + that.data.curprice;
      console.log("来"+allprice)
      this.setData({
        curAds:e.detail,
        allPrice: allprice,
        keepMoney: allprice
      })
    }
  },

  // 组件隐藏是否
  onShowPopup(e){
    this.setData({
      hidepopup:false
    })
  },

  // 计算平台费
  getPlatformFee(){
    let foodprice = this.data.curprice;
    let platformfee = 0;
    if(foodprice <= 5){
      platformfee = 0;
    }else if(foodprice > 5 && foodprice < 20){
      platformfee = 1;
    }else{
      platformfee = foodprice * 0.05;
    }
    this.setData({
      platformFee:platformfee
    })
    console.log('平台费：'+ platformfee);
  },

  // 计算骑手费
  getRiderFee(){
    let that = this;
    let destinationLat = this.data.userAdress[this.data.curAds].latitude;
    let destinationLng = this.data.userAdress[this.data.curAds].longitude;
    // app.getDistance(23.131701,113.371491,23.133256,113.370852);
    app.getDistance3(destinationLat, destinationLng,this.data.carteenLatitude,that.data.carteenLongitudde);
    let riderfee = 2;
    // setTimeout(()=>{
      console.log(app);
      let distance = app.globalData.distance;
      let time = parseInt((distance / 1.2) / 60)+1;
      let htime = parseInt(time / 60);
      let mtime = time - htime * 60;
      console.log('距离'+distance);
      console.log('时间：'+time+'  '+htime+'  '+mtime);
      this.setData({
        hourtime:htime,
        mintime:mtime
      })
      if(distance > 2160){
      riderfee += ((distance - 2160) / 72) * 0.1;
    }
    this.setData({
      riderFee: riderfee
    })
    console.log('骑手费：'+ riderfee);
    // },1200)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // let time = gettime.formatTime(new Date()).toString();
    // this.setData({
    //   time:time
    // })
    console.log('页面加载的options');
    console.log(options);
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    var allFoodData = JSON.parse(options.allFood);
    let childaddr = that.selectComponent('.list');
    let curpa =  parseFloat(options.curprice);
    this.setData({
      allFood: allFoodData,
      curprice : curpa,
      carteenName :options.carteenName,
      carteenId :options.carteenId,
      schoolId: app.globalData.userInfo.schoolId,
      openId: app.globalData.userInfo.openid
    })
    childaddr.setData({
      curindex:0
    })
    wx.hideLoading()

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/search/'+ that.data.schoolId +'/' + options.carteenName,
      method: 'GET',
      header: {'content-type': 'application/json'},   //请求头类型
      success: (res) => {
        console.log('饭堂经纬度');
        console.log(res);
        that.setData({
          carteenLatitude:res.data.position[0].latitude,
          carteenLongitudde:res.data.position[0].longitude
        })
        console.log('餐厅经纬度');
        console.log(that.data.carteenLatitude);
        console.log(that.data.carteenLongitudde);
      }
    })

    // 根据openid获取用户地址
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/address/find/'+ that.data.openId,
      success (res) {
        wx.hideLoading()
        console.log("我的数据来啦");
        console.log(res.data.data.length);
        console.log(res.data.data);
        that.setData({
          userAdress:res.data.data,
          curAds:0
        })

        if(res.data.data.length === 0){
          that.setData({
            flag: 0
          })
        }else{
          that.setData({
            flag: 1
          })
          let ind = that.data.userAdress.length - 1;
          let useraddress = that.data.userAdress;
          if(options.func == '新增'){
            that.setData({
              curAds:ind
            })
            childaddr.setData({
              curindex:ind
            })
            wx.showLoading({
              title: '加载中',
            })
            that.getPlatformFee();
            that.getRiderFee();
            setTimeout(()=>{
              let allprice = that.data.platformFee + that.data.riderFee + that.data.curprice;
              console.log("allprice")
              console.log(allprice);
              that.setData({
                allPrice: allprice
              })
              wx.hideLoading()
            },1000)
          }

          that.getPlatformFee();
          that.getRiderFee();
          console.log('骑手费');
          console.log(that.data.riderFee);
          let allprice = that.data.platformFee + that.data.riderFee + that.data.curprice;
          console.log("allprice")
          console.log(allprice);
          that.setData({
            allPrice: allprice
          })
        }
      }
    })

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/coupon/findCoupon/1/omfL-4vHXzZLzDu3iEKYkT5HFZhg',
      method: 'GET',
      success: res => {
        let p = res.data.data;
        console.log("===============================")
        console.log(p)
        for(let a of p){
          a.checked = false
        }

        that.setData({
          couponList: p
        })
        wx.hideLoading()

      }
    })
    // setTimeout(()=>{
    //   let ind = that.data.userAdress.length - 1;
    //   let useraddress = that.data.userAdress;
    //   if(options.func == '新增'){
    //     that.setData({
    //       curAds:ind
    //     })
    //     childaddr.setData({
    //       curindex:ind
    //     })
    //     that.getPlatformFee();
    //     that.getRiderFee();
    //     let allprice = that.data.platformFee + that.data.riderFee + that.data.curprice;
    //     that.setData({
    //       allPrice: allprice
    //     })
    //   }
    // },2500)
    // setTimeout(()=>{
    //   that.getPlatformFee();
    //   that.getRiderFee();
    //   let allprice = that.data.platformFee + that.data.riderFee + that.data.curprice;
    //   that.setData({
    //     allPrice: allprice
    //   })
    // },1000)
  },

  //选择优惠券单选框后触发的事件
  chooseCoupon: function(e){
    console.log(e)
    let couponId = e.currentTarget.dataset.couponid;
    let reachMoney = e.currentTarget.dataset.reachmoney;
    let reduceMoney = e.currentTarget.dataset.reducemoney;
    let index = e.currentTarget.dataset.index;
    console.log('index = ' + reduceMoney)

    if(this.data.allPrice < reachMoney){
      let a = this.data.couponList;
      a[index].checked = false;

      this.setData({
        couponList: a
      })

      console.log("未达到使用金额")
      return;
    }

    if(index == this.data.checkedIndex){
      let a = this.data.couponList;
      a[index].checked = false;
      this.setData({
        reduceMoney: 0,
        couponList: a,
        checkedIndex: -1,
        allPrice: this.data.keepMoney,
        couponId: -1
      })
      return;
    }else{
      this.setData({
        reduceMoney: reduceMoney,
        checkedIndex: index,
        couponId: couponId
      })
    }

    if(this.data.allPrice < reachMoney){
      let a = this.data.couponList;
      a[index].checked = false;

      this.setData({
        couponList: a,
        reduceMoney: 0
      })

      console.log("未达到使用金额")
      return;
    }

    let newMoney = this.data.keepMoney - reduceMoney;

    this.setData({
      allPrice: newMoney,
      reduceMoney: reduceMoney
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
    // console.log('app.js方法');
    // console.log(app);

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