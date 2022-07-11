// pages/moreAdress/moreAdress.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDatas: [],
    searchHighlightDatas: [],
    searchShows: false,
    searchIndexs: 0,

    searchValue: '',
    time: '',
    p: '本部学生宿舍<span style="color:red">北区</span>3号楼',

    latitude: [],
    longitude: [],

    flag: 0,

    openid:'',
    schoolId:0,
    phone:'182',
    searchAddress:null,
    detailAddress:502,
    name:null,
    choosedLatitude: 0,
    choosedLongitude: 0,
    addressId:0,

    // 弹窗显示
    hidepopup:true,
    attentionMeg:null,

    // 页面功能（新增or修改）
    func:null,

    // 跳回去传的数据
    allFood: null,
    curprice: 0,
    carteenName: null
  },


  bindDetialAddressInput(e){
    this.setData({
      detailAddress:e.detail.value
    })
  },

  bindNameInput(e){
    this.setData({
      name:e.detail.value
    })
  },
  bindPhoneInput(e){
    this.setData({
      phone:e.detail.value
    })
  },

  // 删除地址
  deleteAddress(){
    console.log(this.data.addressId);
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url:'https://zzxdream.cn1.utools.club/address/remove',
      data:{
        openid:that.data.openid,
        addressId:that.data.addressId
      },
      header: {
        'content-type': 'application/json'
      }, //请求头类型
      method: 'POST',
      success: res => {
        wx.hideLoading()
        console.log("删除数据了");
      }
    })
  },

  //搜索
  searchAddress: function(e) {
    this.setData({
      flag: 0
    })
    console.log(e)
    let time = Date.parse(new Date) / 1000;
    let keyword = e.detail.value;
    if(keyword == null || keyword == ""){
      this.setData({
        searchDatas: [],
        latitude: [],
        longitude: [],
        searchShows: false,
      });
    }else if(time - this.data.time >= 1){
      console.log("time = ", time)
      this.setData({
        time: time
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/search/1/' + keyword,
        method: 'GET',
        header: {'content-type': 'application/json'},   //请求头类型
        success: (res) => {
          wx.hideLoading()
          let address = res.data.position;
          let searchDatas = [];
          let searchHighlightDatas = [];
          let latitude = [];
          let longitude = [];
          for(let ress of address){
            searchHighlightDatas.push(ress.highlightPositionName)
            searchDatas.push(ress.positionName)
            latitude.push(ress.latitude)
            longitude.push(ress.longitude)
          }
          console.log("res = ", address)
          if(address == null){
            this.setData({
              searchHighlightDatas: [],
              searchDatas: [],
              latitude: [],
              longitude: [],
              searchShows: false,
            });
          }else{
            this.setData({
              searchShows: true,
              searchHighlightDatas: searchHighlightDatas,
              searchDatas: searchDatas,
              latitude: latitude,
              longitude: longitude
            });
          }

        }
      })
    }

  },

  // 点击下拉列表
  searchOptionTaps(e) {
    let that = this;
    console.log(e)
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(this.data.latitude[Indexs])
    console.log(this.data.longitude[Indexs])

    this.setData({
      searchValue: this.data.searchDatas[Indexs],
      searchShows: false,
      searchIndexs: Indexs,
      choosedLatitude: that.data.latitude[Indexs],
      choosedLongitude: that.data.longitude[Indexs],
      flag: 1
    });
    console.log(this.data.searchValue)
    this.setData({
      searchAddress:this.data.searchDatas[Indexs]
    })
  },

  getMesg(){
    let that = this;
    if(that.data.flag != 1){
      that.setData({
        hidepopup:false,
        attentionMeg: '地址需要从搜索框中选择噢'
      })
    }
    else{
      if(that.data.func == '新增'){
        console.log('新增'+that.data.searchValue+'&&'+that.data.addressId);
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url:'https://zzxdream.cn1.utools.club/address/add',
          data:{
            openid: that.data.openid,
            phone: that.data.phone,
            searchAddress: that.data.searchValue,
            name: that.data.name,
            detailAddress: that.data.detailAddress,
            latitude: that.data.choosedLatitude,
            longitude: that.data.choosedLongitude
          },
          header: {
            'content-type': 'application/json'
          }, //请求头类型
          method: 'POST',
          success: res => {
            wx.hideLoading()
            console.log("传完数据了");
            wx.redirectTo({
              url: '../orderDetails/orderDetails?allFood='
                  +JSON.stringify(that.data.allFood)
                  +'&curprice='+that.data.curprice
                  +'&carteenName='+that.data.carteenName
                  +'&func='+that.data.func
            })
            // that.setData({
            //   hidepopup:false,
            //   attentionMeg: '保存收货信息成功！'
            // })
          }
        })
      }
      else{
        console.log(that.data.searchValue+'&&'+that.data.addressId);
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url:'https://zzxdream.cn1.utools.club/address/update',
          data:{
            openid: that.data.openid,
            phone: that.data.phone,
            searchAddress: that.data.searchValue,
            name: that.data.name,
            detailAddress: that.data.detailAddress,
            latitude: that.data.choosedLatitude,
            longitude: that.data.choosedLongitude,
            addressId: that.data.addressId
          },
          header: {
            'content-type': 'application/json'
          }, //请求头类型
          method: 'PUT',
          success: res => {
            wx.hideLoading()
            console.log("修改完数据了");
            // that.setData({
            //   hidepopup:false,
            //   attentionMeg: '修改收货信息成功！'
            // })
            wx.redirectTo({
              url: '../orderDetails/orderDetails?allFood='
                  +JSON.stringify(that.data.allFood)
                  +'&curprice='+that.data.curprice
                  +'&carteenName='+that.data.carteenName
                  +'&func='+that.data.func
            })
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.userInfo.openid,
      schoolId: app.globalData.userInfo.schoolId
    })
    console.log(options);
    this.setData({
      func:options.func
    })
    var addressId = parseInt(options.addressId);
    if(options.func == '修改'){
      this.setData({
        phone:options.phone,
        searcValue:options.searchValue,
        name:options.name,
        detailAddress:options.detailAddress,
        choosedLatitude:options.choosedLatitude,
        choosedLongitude:options.choosedLongitude,
        addressId:addressId,
        allFood:JSON.parse(options.allFood),
        curprice:options.curprice,
        carteenName:options.carteenName
      })
    }
    else{
      this.setData({
        allFood:JSON.parse(options.allFood),
        curprice:options.curprice,
        carteenName:options.carteenName
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