// pages/bg_cover2/bg_cover2.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '/static/img/cover.png',
    show: false,

    // 组件隐藏是否的状态
    hidepopup:true,
    flag: 3,
    //用户信息
    userInfo: {
      avatarUrl: "",
      realName: '',
      gender: "",
      level: "",
      money: null,
      moneyMethod: null,
      nickName: "",
      openid: "",
      schoolId: null,
      schoolName: "",
      status: "",
      withdrawPassword: null
    },
    openid: ''
  },

  // 组件隐藏是否
  onShowPopup(e){
    this.setData({
      hidepopup:false
    })
  },
  // 组件传来的数据
  handleGoToGetMesg(e){
    console.log('组件按钮被点了');
    this.getUserProfile();
  },

  keepUserInfo: function(e){
    console.log(999);
    console.log(e);
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/user/updateUserInfo',  //zzxdream.cn1.utools.club(内含端口)  这是我内网映射的网址，对应我电脑上的 localhost:9001
      data: {
        openid: this.data.openid,
        nickName : e.nickName,
        gender : e.gender,
        avatarUrl : e.avatarUrl
      },
      header: {'content-type': 'application/json'},   //请求头类型
      method: 'POST',      //请求方法的方式
      success: r => {       //成功调用后台的请求接口
        // console.log("返回的open");
        // console.log(r);
      },
    })
  },
  getUserProfile: function(e){    //与 bindgetuserinfo微信内置方法（获取用户的信息） 绑定触发事件
    // console.log(e.detail.userInfo);    //e.detail.userInfo -> 用户的信息
    let that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("打印基本信息：");
        console.log(res);
        let info = res.userInfo;
        info.openid = that.data.openid;
        this.setData({
          userInfo: info,
          hidepopup : true,      //不再显示授权框
        })
        that.keepUserInfo(res.userInfo);

        // 同步全局用户信息
        app.globalData.userInfo = that.data.userInfo;

        // 一秒后跳转
        setTimeout(()=>{
          wx.redirectTo({

            url: '../infoRecord/infoRecord',
            success: function success(res) {
              console.log("successful!");
            },
            fail: function fail(e) {
              console.log("初始页面加载失败" + e);
            },
            complete: function complete() {
              console.log("loading...!");
            }
          });
        },1000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    let that = this;
    setTimeout(function () {
      that.setData({
        show: true
      })

    }, 1000)

    //登录部分
    //可以通过 wx.getSetting 先查询一下用户是否授权了，授权了的话信息会存储在 -> "scope.userInfo"
    wx.getSetting({   //发送一个请求，申请查询缓存信息，用来检测是否缓存有用户信息
      success(res) {  //请求成功，进入请求的回调函数
        // if (res.authSetting['scope.userInfo']) {  //存在缓存用户 -> true, 不存在 -> false
        //   console.log("牛逼");
          // 必须是在用户已经授权的情况下调用
          // wx.getUserProfile({    //缓存中存在用户信息，但是不知道是哪个用户，所以再发一次获取当前用户的请求
          //   desc: '用于完善会员资料',
          //   success: function(res) {    //请求成功,保存用户信息
          //     that.setData({
          //       userInfo:res.userInfo,
          //       hidepopup : true,
          //     })

          //     // 同步全局用户信息
          //     app.globalData.userInfo = that.data.userInfo;
          //     // 一秒后跳转
          //     setTimeout(()=>{
          //       wx.redirectTo({

          //         url: '../infoRecord/infoRecord',
          //         success: function success(res) {
          //           console.log("successful!");
          //         },
          //         fail: function fail(e) {
          //           console.log("初始页面加载失败" + e);
          //         },
          //         complete: function complete() {
          //           console.log("loading...!");
          //         }
          //       });
          //     },1000)
          //   }
          // })
        // }else{    //缓存不存在用户信息，则弹出授权框
          wx.login({
            //timeout: 10000,   //最大延迟10s
            success: res => { //登录成功则获得code，code用来换取openid
              console.log("小程序接收到 code = " + res.code);
              // 发送 res.code 到后台换取 openId
              wx.request({    //发送一个请求，下面是请求的内容和处理
                url: 'https://zzxdream.cn1.utools.club/user/getOpenid',  //zzxdream.cn1.utools.club(内含端口)  这是我内网映射的网址，对应我电脑上的 localhost:9001
                data: {
                  code : res.code     //data封装传递的参数
                },
                header: {'content-type': 'application/x-www-form-urlencoded'},   //请求头类型
                method: 'POST',        //请求方法的方式
                success: r => {       //成功调用后台的请求接口
                  if(202 == r.data.code){     //返回一个json串，跟你们说过的一个Result，里面的code为202时，表示成功获取用户的openid，但是数据库没有该用户的信息，需要前端获取用户的信息
                    // app.globalData.showAuth = true;     //如果没有该用户的信息，再让该用户授权登录，此时设置显示授权框，让用户选择授权
                    // app.globalData.openid = r.data.data;
                    console.log(r.data.data);
                    that.setData({
                      openid: r.data.data
                    })
                    console.log("空");
                    that.setData({
                      hidepopup : false,
                      openid: r.data.data
                    })
                    console.log(that.hidepopup);

                  }else{
                    // app.globalData.showAuth = false;    //能获得该用户的信息，则说明该用户已经存在，不用进行授权，则隐藏授权框
                    // app.globalData.userInfo = r.data.data;
                    console.log("有");
                    console.log(app.globalData.token)
                    app.globalData.token = r.data.token;
                    console.log(app.globalData.token)
                    console.log(r);
                    that.setData({
                      hidepopup: true,
                      userInfo: r.data.data,
                      openid: r.data.data.openid,
                      flag: 1
                    })
                  }
                  console.log("后台请求成功");
                  console.log(r);

                  if(that.data.flag === 1){
                    // 同步全局用户信息
                    app.globalData.userInfo = that.data.userInfo;
                    console.log('全局')
                    console.log(app)
                    if(that.data.userInfo.status === '1'){
                      setTimeout(()=>{
                        wx.redirectTo({
                          url: '../infoRecord/infoRecord',
                          success: function success(res) {
                            console.log("successful!");
                          },
                          fail: function fail(e) {
                            console.log("初始页面加载失败" + e);
                          },
                          complete: function complete() {
                            console.log("loading...!");
                          }
                        });
                      },1000)
                    }else{
                      setTimeout(()=>{
                        wx.redirectTo({
                          // url: '../welcome/welcome',
                          url: '../drawCoupon/drawCoupon',
                          success: function success(res) {
                            console.log("successful!");
                          },
                          fail: function fail(e) {
                            console.log("初始页面加载失败" + e);
                          },
                          complete: function complete() {
                            console.log("loading...!");
                          }
                        });
                      },1000)
                      // 一秒后跳转
                      // setTimeout(()=>{
                      //   wx.navigateTo({
                      //     url: '../welcome/welcome'
                      //   });
                      // },1000)
                    }

                  }
                },
                fail: r => {        //后台请求失败
                  console.log("后台请求失败");
                }
              })

            },
            fail: res => {
              console.log("发送登录请求失败");
            },
            complete: res => {
              console.log("请求发送中");
            }
          })
        // }
      }
    })
  },


  buttonTap: function (e) {
    console.log(e);
    let btnIndex = e.detail.index; //传过的按钮的index，判断是否有选择微信授权
    console.log(btnIndex);
    if (btnIndex == 1) {
      wx.navigateTo({

        url: '../infoRecord/infoRecord',
        success: function success(res) {
          console.log("successful!");
        },
        fail: function fail(e) {
          console.log("初始页面加载失败" + e);
        },
        complete: function complete() {
          console.log("successful!");
        }
      });
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