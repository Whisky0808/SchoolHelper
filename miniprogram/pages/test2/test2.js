const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.userInfo.openid,
    helperRealName: app.globalData.userInfo.realName,
    schoolId: app.globalData.userInfo.schoolId,
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    moneyShows: false,
    selectDatas: [1,2,3,4,5,6,7,8,9,10], //下拉列表的数据
    moneyDatas: [2.00, 2.50, 3.00, 3.50, 4.00, 4.50, 5.00, 5.50, 6.00, 6.50, 7.00, 7.50, 8.00, 8.50, 9.00, 9.50, 10.00, 11.00, 12.00, 13.00, 14.00, 15.00],
    indexs: 0, //选择的下拉列 表下标,
    moneyIndexs: 0,

    totalMoney: 2,
    title: '',
    content: '',
    startTime: '',
    endTime: '',
    startPlace: '',
    endPlace: '',
    helperNum: 1,
    helperMust: false,
    helperRequire: '',
    name: '',
    phone: '',
    startLatitudes: '',
    startLongitudes: '',
    endLatitude: '',
    endLongitude: '',

    firstSearchDatas: [],
    secondSearchDatas: [],
    thirdSearchDatas: [],

    firstSearchHighlightDatas: [],
    secondSearchHighlightDatas: [],
    thirdSearchHighlightDatas: [],

    firstSearchShows: false,
    secondSearchShows: false,
    thirdSearchShows: false,

    secondShows: false,
    thirdShows: false,

    firstSearchIndexs: 0,
    secondSearchIndexs: 0,
    thirdSearchIndexs: 0,

    firstSearchValue: '',
    secondSearchValue: '',
    thirdSearchValue: '',

    firstTime: '',
    secondTime: '',
    thirdTime: '',

    firstLatitude: [],
    secondLatitude: [],
    thirdLatitude: [],

    firstLongitude: [],
    secondLongitude: [],
    thirdLongitude: [],

    firstStatus: '',
    secondStatus: '',
    thirdStatus: '',

    firstDetailAddress: '',
    secondDetailAddress: '',
    thirdDetailAddress: '',

    btnValue: '获取验证码',
    btnDisabled: false,
    second: 60,
    status: false,
    realCode: '',
    platformMoney: 0

  },

  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },

  selectMoneyTaps() {
    this.setData({
      moneyShows: !this.data.moneyShows,
    });
  },

  // 点击下拉显示框
  firstSelectTaps() {
    this.setData({
      firstSearchShows: !this.data.firstSearchShows,
      secondSearchShows: false,
      thirdSearchShows: false
    });
  },

  // 点击下拉显示框
  secondSelectTaps() {
    this.setData({
      firstSearchShows: false,
      secondSearchShows: !this.data.secondSearchShows,
      thirdSearchShows: false
    });
  },

  // 点击下拉显示框
  thirdSelectTaps() {
    this.setData({
      firstSearchShows: false,
      secondSearchShows: false,
      thirdSearchShows: !this.data.thirdSearchShows,
    });
  },

  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let platformMoney = 0;
    let money = this.data.selectDatas[Indexs] * this.data.moneyDatas[this.data.moneyIndexs];
    if(money >= 10){
      if(money >= 10 && money <= 30){
        money += 1;
      }else if(money > 30 && money <= 60){
        money += 2;
      }else if(money > 60){
        platformMoney = money * 0.05;
        money = money * 1.05;
      }
    }

    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
      totalMoney: money.toFixed(2),
      platformMoney: platformMoney
    });
  },

  // 点击下拉列表
  moneyOptionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let platformMoney = 0;
    let money = this.data.selectDatas[this.data.indexs] * this.data.moneyDatas[Indexs];
    if(money >= 10){
      if(money >= 10 && money <= 30){
        money += 1;
      }else if(money > 30 && money <= 60){
        money += 2;
      }else if(money > 60){
        platformMoney = money * 0.05;
        money = money * 1.05;
      }
    }

    this.setData({
      moneyIndexs: Indexs,
      moneyShows: !this.data.moneyShows,
      totalMoney: money.toFixed(2),
      platformMoney: platformMoney
    });
  },

  // 点击下拉列表
  firstSearchOptionTaps(e) {
    console.log(e)
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(this.data.firstLatitude[Indexs])
    console.log(this.data.firstLongitude[Indexs])

    this.setData({
      firstSearchValue: this.data.firstSearchDatas[Indexs],
      firstSearchShows: false,
      firstSearchIndexs: Indexs
    });
  },

  // 点击下拉列表
  secondSearchOptionTaps(e) {
    console.log(e)
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(this.data.secondLatitude[Indexs])
    console.log(this.data.secondLongitude[Indexs])

    this.setData({
      secondSearchValue: this.data.secondSearchDatas[Indexs],
      secondSearchShows: false,
      secondSearchIndexs: Indexs
    });
  },

  // 点击下拉列表
  thirdSearchOptionTaps(e) {
    console.log(e)
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(this.data.thirdLatitude[Indexs])
    console.log(this.data.thirdLongitude[Indexs])

    this.setData({
      thirdSearchValue: this.data.thirdSearchDatas[Indexs],
      thirdSearchShows: false,
      thirdSearchIndexs: Indexs
    });
  },

  //第一搜索框
  firstSearchAddress: function(e) {
    let that = this;
    console.log(e)
    let time = Date.parse(new Date) / 1000;
    let keyword = e.detail.value;
    if(keyword == null || keyword == ""){
      this.setData({
        firstSearchDatas: [],
        firstSearchHighlightDatas: [],
        firstLatitude: [],
        firstLongitude: [],
        firstSearchShows: false
      });
    }else if(time - this.data.firstTime >= 1){
      console.log(that.data);
      console.log("time = ", time)
      this.setData({
        firstTime: time
      })
      // wx.showLoading({
      //   title: '加载中',
      // })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/search/'+ that.data.schoolId +'/' + keyword,
        method: 'GET',
        header: {'content-type': 'application/json'},   //请求头类型
        success: (res) => {
          // wx.hideLoading()
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
              firstSearchDatas: [],
              firstSearchHighlightDatas: [],
              firstLatitude: [],
              firstLongitude: [],
              firstSearchShows: false
            });
          }else{
            this.setData({
              firstSearchShows: true,
              firstSearchDatas: searchDatas,
              firstSearchHighlightDatas: searchHighlightDatas,
              firstLatitude: latitude,
              firstLongitude: longitude
            });
          }

        }
      })
    }

  },

  //第二搜索框
  secondSearchAddress: function(e) {
    console.log(e)
    let that = this;
    let time = Date.parse(new Date) / 1000;
    let keyword = e.detail.value;
    if(keyword == null || keyword == ""){
      this.setData({
        secondSearchDatas: [],
        secondSearchHighlightDatas: [],
        secondLatitude: [],
        secondLongitude: [],
        secondSearchShows: false
      });
    }else if(time - this.data.secondTime >= 1){
      console.log("time = ", time)
      this.setData({
        secondTime: time
      })
      // wx.showLoading({
      //   title: '加载中',
      // })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/search/'+ that.data.schoolId +'/' + keyword,
        method: 'GET',
        header: {'content-type': 'application/json'},   //请求头类型
        success: (res) => {
          // wx.hideLoading()
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
              secondSearchDatas: [],
              secondSearchHighlightDatas: [],
              secondLatitude: [],
              secondLongitude: [],
              secondSearchShows: false
            });
          }else{
            this.setData({
              secondSearchShows: true,
              secondSearchDatas: searchDatas,
              secondSearchHighlightDatas: searchHighlightDatas,
              secondLatitude: latitude,
              secondLongitude: longitude
            });
          }

        }
      })
    }

  },

  //第三搜索框
  thirdSearchAddress: function(e) {
    let that = this;
    console.log(e)
    let time = Date.parse(new Date) / 1000;
    let keyword = e.detail.value;
    if(keyword == null || keyword == ""){
      this.setData({
        thirdSearchDatas: [],
        thirdSearchHighlightDatas: [],
        thirdLatitude: [],
        thirdLongitude: [],
        thirdSearchShows: false
      });
    }else if(time - this.data.thirdTime >= 1){
      console.log("time = ", time)
      this.setData({
        thirdTime: time
      })
      // wx.showLoading({
      //   title: '加载中',
      // })
      wx.request({
        url: 'https://zzxdream.cn1.utools.club/search/'+ that.data.schoolId +'/' + keyword,
        method: 'GET',
        header: {'content-type': 'application/json'},   //请求头类型
        success: (res) => {
          // wx.hideLoading()
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
              thirdSearchDatas: [],
              thirdSearchHighlightDatas: [],
              thirdLatitude: [],
              thirdLongitude: [],
              thirdSearchShows: false
            });
          }else{
            this.setData({
              thirdSearchShows: true,
              thirdSearchDatas: searchDatas,
              thirdSearchHighlightDatas: searchHighlightDatas,
              thirdLatitude: latitude,
              thirdLongitude: longitude
            });
          }

        }
      })
    }

  },


  addAddress: function(){
    if(!this.data.secondShows){
      this.setData({
        secondShows: true
      })
    }
    else if(!this.data.thirdShows){
      this.setData({
        thirdShows: true
      })
    }
  },

  removeAddress: function(){
    if(this.data.thirdShows){
      this.setData({
        thirdSearchShows: false,
        thirdShows: false,
        thirdSearchDatas: [],
        thirdSearchHighlightDatas: [],
        thirdLatitude: [],
        thirdLongitude: [],
        thirdSearchValue: '',
        thirdStatus: ''
      })
    }
    else if(this.data.secondShows){
      this.setData({
        secondSearchShows: false,
        secondShows: false,
        secondSearchDatas: [],
        secondSearchHighlightDatas: [],
        secondLatitude: [],
        secondLongitude: [],
        secondSearchValue: '',
        secondStatus: ''
      })
    }
  },

  bandleChange: function(e){
    let value = e.detail.value;
    if(value == 1){
      this.setData({
        firstStatus: true
      })
    }else if(value == 2){
      this.setData({
        firstStatus: false
      })
    }else if(value == 3){
      this.setData({
        secondStatus: true
      })
    }else if(value == 4){
      this.setData({
        secondStatus: false
      })
    }else if(value == 5){
      this.setData({
        thirdStatus: true
      })
    }else if(value == 6){
      this.setData({
        thirdStatus: false
      })
    }
  },

  switchChange: function(){
    this.setData({
      helperMust: !this.data.helperMust
    })
  },

  //姓名输入
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //学号输入
  bindNumberInput(e){
    this.setData({
      number: e.detail.value
    })
  },
  //手机号输入
  bindPhoneInput(e) {
    console.log(e.detail.value);
    var val = e.detail.value;
    this.setData({
      phone: val
    })
    if(val != ''){
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    }else{
      this.setData({
        hidden: true
      })
    }
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    console.log('获取验证码');
    var that = this;
    //这个是初始化配置
    //第一个参数是短信平台的网址
    //第二个和第三个是我账号秘钥
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '108580', '3d2e5830-2ed3-4c4b-be2d-0a0e134c011c');
    //把参数都存在下面这个 params 里面
    let params = {};
    //手机号码要从用户输入框获取，这边我写死是为了方便测试
    params.number = '13729445987';
    //下面这个 '4446'是短信模板id，先用他就行，不能更改
    params.templateId = '4446';
    //下面生成的code就是要发送给用户的验证码，用户输出验证码后跟生成的code做比较，一样则验证通过
    var code = zhenzisms.client.createCode(4, 60, params.number);//生成验证码
    //讲验证码存起来，用来验证
    this.setData({
      realCode: code
    })
    console.log("验证码 = ", code)
    //设置验证码一分钟内有效
    var templateParams = [code, '1分钟'];
    params.templateParams = templateParams;
    // params.messageId = '1111111';	//可不选，短信的唯一标识
    // params.clientIp = '221.221.221.111';		//可不选，
    console.log(code);
    zhenzisms.client.send(function (res) {
      console.log(res)
      //成功发送短信返回状态码 0
      if(res.data.code == 0){
        //开始倒计时，60s后可重新发送，并将验证码设置为有效期内
        that.setData({
          status: true
        })
        that.timer();
        return ;
      }
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, params);

  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
          () => {
            console.log("我进来啦")
            var second = this.data.second - 1;
            this.setData({
              second: second,
              btnValue: second+'秒',
              btnDisabled: true
            })
            if (this.data.second <= 0) {
              this.setData({
                second: 60,
                btnValue: '获取验证码',
                btnDisabled: false
              })
              resolve(setTimer)
            }
            if(second == 0){
              this.setData({
                status: false
              })
            }
          }
          , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //保存
  save(e) {
    console.log('姓名: ' + this.data.name);
    console.log('手机号: ' + this.data.phone);
    console.log('验证码: ' + this.data.code);

    //省略提交过程
  },

  /**
   * 日历控件绑定函数
   * 点击日期返回
   */
  srartPickerChange: function (e) {
    console.log(e.detail.dateString);
    this.setData({
      startTime: e.detail.dateString
    })
  },

  endPickerChange: function (e) {
    console.log(e.detail.dateString);
    this.setData({
      endTime: e.detail.dateString
    })
  },

  bindTitleInput: function(e){
    this.setData({
      title: e.detail.value
    })
  },

  bindNameInput: function(e){
    this.setData({
      name: e.detail.value
    })
  },

  bindPhoneInput: function(e){
    this.setData({
      phone: e.detail.value
    })
  },

  bindContentInput: function(e){
    this.setData({
      content: e.detail.value
    })
  },

  bindRequireInput: function(e){
    this.setData({
      helperRequire: e.detail.value
    })
  },

  firstDetailInput: function(e){
    this.setData({
      firstDetailAddress: e.detail.value
    })
  },

  secondDetailInput: function(e){
    this.setData({
      secondDetailAddress: e.detail.value
    })
  },

  thirdDetailInput: function(e){
    this.setData({
      thirdDetailAddress: e.detail.value
    })
  },

  addHelperOrder: function(){
    if(this.data.helperMust){
      this.setData({
        helperMust: 1
      })
    }else{
      this.setData({
        helperMust: 0
      })
    }
    console.log("1 = ", this.data.secondStatus)

    let startLatitudes = '';
    let startLongitudes = '';
    let startDetailAddress = '';
    let endDetailAddress = '';
    let startAddress = '';
    let endAddress = '';
    let endLatitude = '';
    let endLongitude = '';

    // 第一搜索框数据判断
    if(this.data.firstStatus === true){
      let index = this.data.firstSearchIndexs;
      startLatitudes += this.data.firstLatitude[index] + "#";
      startLongitudes += this.data.firstLongitude[index] + "#";
      startAddress += this.data.firstSearchValue + "#";
      startDetailAddress += this.data.firstDetailAddress + "#";

    }else if(this.data.firstStatus === false){
      let index = this.data.firstSearchIndexs;
      endAddress = this.data.firstSearchDatas[index];
      endDetailAddress = this.data.firstDetailAddress;
      endLatitude = this.data.firstLatitude[index];
      endLongitude = this.data.firstLongitude[index];
    }

    let a = "1";
    a += "2";
    console.log("a = ", a)

    // 第二搜索框数据判断
    if(this.data.secondStatus === true){
      console.log("我进来了，第二个")
      console.log(this.data.secondSearchValue)
      let index = this.data.secondSearchIndexs;
      startLatitudes += this.data.secondLatitude[index] + "#";
      startLongitudes += this.data.secondLongitude[index] + "#";
      startAddress += this.data.secondSearchValue + "#";
      startDetailAddress += this.data.secondDetailAddress + "#";
      console.log(startAddress)

    }else if(this.data.secondStatus === false){
      let index = this.data.secondSearchIndexs;
      endAddress = this.data.secondSearchDatas[index];
      endDetailAddress = this.data.secondDetailAddress;
      endLatitude = this.data.secondLatitude[index];
      endLongitude = this.data.secondLongitude[index];
    }

    // 第三搜索框数据判断
    if(this.data.thirdStatus === true){
      let index = this.data.thirdSearchIndexs;
      startLatitudes += this.data.thirdLatitude[index] + "#";
      startLongitudes += this.data.thirdLongitude[index] + "#";
      startAddress += this.data.thirdSearchValue + "#";
      startDetailAddress += this.data.thirdDetailAddress + "#";

    }else if(this.data.thirdStatus === false){
      let index = this.data.thirdSearchIndexs;
      endAddress = this.data.thirdSearchDatas[index];
      endDetailAddress = this.data.thirdDetailAddress;
      endLatitude = this.data.thirdLatitude[index];
      endLongitude = this.data.thirdLongitude[index];
    }
    let that = this;

    console.log("===")
    let data = this.data;

    wx.navigateTo({
      url: '../Runner/add_demand_order/confirm/confirm?startTime=' + data.startTime
          + '&endTime=' + data.endTime + '&totalMoney=' + data.totalMoney
          + '&helperMoney=' + data.moneyDatas[data.moneyIndexs] + '&platformMoney=' + data.platformMoney
          + '&content=' + data.content + '&title=' + data.title + '&helperNum=' + data.selectDatas[data.indexs]
          + '&helperMust=' + data.helperMust + '&helperRequire=' + data.helperRequire
          + '&phone=' + data.phone + '&name=' + data.name + '&startAddress=' + startAddress
          + '&startDetailAddress=' + startDetailAddress + '&startLatitudes=' + data.startLatitudes
          + '&startLongitudes=' + data.startLongitudes + '&endAddress=' + endAddress
          + '&endDetailAddress=' + endDetailAddress + '&endLatitude=' + data.endLatitude
          + '&endLongitude=' + data.endLongitude + '&startLatitudes=' + startLatitudes
          + '&startLongitudes=' + startLongitudes + '&endLatitude=' + endLatitude
          + '&endLongitude=' + endLongitude
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.userInfo.openid,
      helperRealName: app.globalData.userInfo.realName,
      schoolId: app.globalData.userInfo.schoolId
    })
    let childComChange = this.selectComponent('.tab');
    let x = "curimgurl[" + 0 + "]";
    let y = "flag[" + 0 + "]"
    childComChange.setData({
      [x]: childComChange.data.imgurl[0].hovor,
      [y]: 1
    })
  },


})