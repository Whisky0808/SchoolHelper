// pages/confirm/confirm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    helpOrderId: '',
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
    helperRealName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    console.log(data.a[0])
    console.log('-----------')
    console.log("来了")
    console.log(data)
    console.log(data.startAddressList)

    let startAddressList = data.startAddressList.split('#');
    let startDetailAddressList = data.startDetailAddressList.split('#');
    let startLatitudeList = data.startLatitudeList.split('#');
    let startLongitudeList = data.startLongitudeList.split('#');
    
    console.log("看过来 = ", startAddressList)

    this.setData({
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
      flag: true
    })
  },

  //获得地图导航的函数
  getRoad: function (e) {
    let positionName = e.currentTarget.dataset.name;
    let latitude = e.currentTarget.dataset.latitude;
    let longitude = e.currentTarget.dataset.longitude;
    app.getRoad(positionName, latitude, longitude);
  },

})