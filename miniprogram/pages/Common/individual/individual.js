const app = getApp();
Page({
  data: {
    status: false,//输入提现密码是否正确
    registerShow: false,//提现密码弹窗
    withdrawShow: true,//提现方式
    money: app.globalData.userInfo.money,
    completeMoney: "",
    switch1Checked: false,
    virtualName: app.globalData.userInfo.nickName,
    realName: app.globalData.userInfo.realName,
    school: app.globalData.userInfo.schoolName,
    phone: "132637489809",
    photo: app.globalData.userInfo.avatarUrl,
    dialogShow: false, //更改昵称的弹窗是否出来
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    password: app.globalData.userInfo.withdrawPassword,
  },

  // 更换头像
  changePhoto: function () {
    let that = this;
    wx.chooseImage({
      //选择上传本地资源
      success(res) {
        const tempFilePaths = res.tempFilePaths //选择成功，获取资源路径
        console.log(tempFilePaths[0]);

        wx.uploadFile({
          url: 'https://zzxdream.cn1.utools.club/image/uploadUserImage',//上传头像的接口
          filePath: tempFilePaths[0], //上传路径
          name: 'userImage', //头像
          formData: {
            'openid': app.globalData.userInfo.openid, //用户对象openid识别
          },
          success(res) {
            console.log(res);
            wx.showToast({
              title: 'success',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              photo: tempFilePaths[0],
            })

          }
        })
      }
    })
  },
  showInputPassword: function () {
    if (this.data.money != 0.00) {
      this.setData({
        registerShow: true,
      })
    } else {
      wx.showToast({
        title: '你没钱',
        icon: 'error',
        duration: 2000
      })
    }

  },
  inputPassword: function (e) {
    let verification = e.detail.value;
    if (verification == app.globalData.userInfo.withdrawPassword) {
      this.setData({
        status: true,
      })
    }
  },

  // 提现密码弹窗按钮
  passwordConfirm: function (e) {
    let btnIndex = e.detail.index;
    if (btnIndex == 1 && this.data.status == true) {
      if (this.data.money != 0) {
        this.withdrawMoney();
        this.setData({
          registerShow: false,
        })
      }

    }
    else {
      wx.showToast({
        title: '密码输入错误',
        icon: 'error',
        duration: 2000

      })

    }
  },
  //换昵称的弹窗
  changeName: function (e) {
    this.setData({
      dialogShow: true
    })
  },

  //换昵称的弹窗按钮确认键
  tapDialogButton(e) {
    console.log('dialog', e.detail)
    let that = this;
    that.setData({
      dialogShow: false,
    })
    console.log(this.data.virtualName);
    wx.request({
      url: 'https://zzxdream.cn1.utools.club/user/updateNickName',
      method: "PUT",
      data: {
        openid: app.globalData.userInfo.openid,
        nickName: that.data.virtualName
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: 'success',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })

  },
  //换昵称函数
  inputName: function (e) {
    let input_name = e.detail.value;
    this.setData({
      virtualName: input_name
    })
  },

  withdrawMoney: function () {
    let that = this;
    console.log(app.globalData.userInfo.openid);
    console.log(that.data.password);
    let i = that.data.money;
    console.log(that.data.money)
    i = (i).toFixed(2);//保留两位小数
    console.log("i", i);
    console.log(typeof (i));


    wx.request({
      url: 'https://zzxdream.cn1.utools.club/user/withdraw',
      method: 'POST',
      data: {
        openid: app.globalData.userInfo.openid,
        password: that.data.password,
        money: i,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 200 && res.data.flag == true) {
          wx.showToast({
            title: '提现成功',
            icon: 'success',
            duration: 2000
          })
        }
        that.setData({
          completeMoney: 0.00
        })
      },
      fail: function (res) {
        console.log(res);
      }

    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
    console.log(app.globalData.userInfo.avartarUrl);
    console.log(app);
    //因为跳转太快有些数据还没来得及更新到这里的data，因此重新set一次
    this.setData({
      virtualName: app.globalData.userInfo.nickName,
      realName: app.globalData.userInfo.realName,
      photo: app.globalData.userInfo.avatarUrl,
      school: app.globalData.userInfo.schoolName,
      money: app.globalData.userInfo.money,
      completeMoney: app.globalData.userInfo.money.toFixed(2),
      password: app.globalData.userInfo.withdrawPassword,
    })
    // 自动提现==1
    if (app.globalData.userInfo.moneyMethod == "1") {
      this.setData({
        switch1Checked: false,
      })
    }else if((app.globalData.userInfo.moneyMethod == "2")){
      this.setData({
        switch1Checked: true,
      })
    }


  },
  switch1Change: function (e) {
    let that = this;
    console.log(e.detail.value);
    let value = e.detail.value;
    if (value) {
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/user/changeMoneyMethod',
        header: {
          'Content-Type': 'application/json'
        },
        method: "PUT",
        data: {
          openid: app.globalData.userInfo.openid,
          moneyMethod: "2",
        },
        success: function (res) {
          wx.showToast({
            title: '手动提现',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            withdrawShow: false,
          })
          app.globalData.userInfo.moneyMethod = "2";
        }
      })
    } else {
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/user/changeMoneyMethod',
        header: {
          'Content-Type': 'application/json'
        },
        method: "PUT",
        data: {
          openid: app.globalData.userInfo.openid,
          moneyMethod: "1",
        },
        success: function (res) {
          wx.showToast({
            title: '自动提现',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            withdrawShow: true,//提现按钮消失
          })
          app.globalData.userInfo.moneyMethod = "1";
        }
      })
    }
  },
  error() {
    console.log("图片加载出错了");
  }


})