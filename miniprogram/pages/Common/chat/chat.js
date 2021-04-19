// pages/contact/contact.js
const app = getApp();
//心跳对象
let heartCheck = {
  timeout: 1000,
  timeoutObj: null,
  serverTimeoutObj: null,
  // 心跳对象内timeout为每1秒发一次心跳,timeoutObj、serverTimeoutObj是清除定时器用的对象，reset方法重置定时器，start发送心跳。
  reset: function () {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function () {
    this.timeoutObj = setTimeout(() => {
      console.log('发送hhh');
      wx.sendSocketMessage({
        data: 'hhh',
        success: function () {
          console.log("send successfully");
        }
      });
      this.serverTimeoutObj = setTimeout(() => {
        wx.closeSocket({
          code: 0,
        })
      }, this.timeout);
    }, this.timeout);
  },
}

let lockReconnect = false;//重连标志
let timer = "";
let msgList = [];
// let chatArray = [{
//   chatId: '',
//   chatName: '',
//   groupChat: '',
//   isShow: '',
//   noReadMessage: [],
//   openidList: [],
//   leftIcon: '',
// }];
// let toName = "";
let windowWidth = wx.getSystemInfoSync().windowWidth;
let windowHeight = wx.getSystemInfoSync().windowHeight;
let keyHeight = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cusHeadIco: '',//头像
    scrollHeight: '100vh',
    inputBottom: 0,
    dialogShow: true,
    chatId: "",
    realTimeMessage: "实时信息",
    username: "",
    toName: "omfL-4vXwLBasPNGQlGvRGGIFd8Q",
    data: "",
    limit: 0,//WebSocket的连接限制个数
    // openid: '',
    buttons: [{
      type: 'default',
      className: 'btn1',
      text: 'Nope',
      value: 0
    },
    {
      type: 'primary',
      className: 'btn2',
      text: 'Yep',
      value: 1
    }
    ]
  },
  initData() {

    let that = this;
    //加载页面的时候从缓存读数据
    wx.getStorage({
      key: 'chatDetail',
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) {
          that.setData({
            msgList: res.data[0].msgList
          })
        }

      }
    })
    let inputVal = ''; //输入框
    msgList = [{
      speaker: 'server',
      // contentType:'',
      contentType: 'text',
      content: 'Halo,welcome to the campusAssistant',
      leftIcon: ''

    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: 'ok'
    }
    ]
    this.setData({
      msgList,
      inputVal,
    })
  },

  sendMessage: function () {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: this.data.inputVal//输入框内容
    },
    )
    // 先展示出来，再异步发到后端服务器那里去
    this.data.realTimeMessage = this.data.inputVal;
    console.log("实时发送的信息是：", this.data.inputVal);
    this.setData({
      msgList,
      inputVal: '',
    });
    console.log(this.data.msgList);
    console.log(this.data.chatId);
    console.log(this.data.toName);
    let json = {
      "fromOpenid": this.data.username,//发消息本人绿人
      "toOpenid": this.data.toName,//接消息方白人
      "chatId": this.data.chatId,
      "message": {
        speaker: 'server', contentType: 'text', content: this.data.realTimeMessage,
        leftIcon: this.data.cusHeadIco
      }
    };
    //本人发送过去（右）保存在数据库应该是“左”，直接post在别人的界面，单双引号嵌套拼接

    console.log("json = ", json);
    let jsonStr = JSON.stringify(json);
    console.log("jsonStr = ", jsonStr);

    //区分：存在自己缓存的就是自己的界面，绿白不变
    wx.setStorage({
      key: "chatDetails",
      data: [{
        chatId: this.data.chatId,
        msgList: msgList
      }]

    })
    //发送聊天信息聊天框的信息（分两步走，一步走自己页面的数据渲染，一步走后端服务器将数据po上服务器）
    wx.sendSocketMessage({
      data: jsonStr,
      success: function (res) {
        console.log("把聊天消息发给后台了");
        console.log(jsonStr)//后台更新并返回了jsonStr
        jsonStr = JSON.parse(jsonStr);//是个字符串需要转
        console.log("new:", jsonStr)//后台更新并返回了jsonStr
        //这里为什么会显示两边都是我的头像呢，因为拿到信息直接push到了自己页面的msgList那里了应该发出去才对这一堆东西（当时为了测试）
        // msgList.push({
        //   speaker: jsonStr.message.speaker,
        //   contentType: jsonStr.message.contentType,
        //   content: jsonStr.message.content,
        //   leftIcon: jsonStr.message.leftIcon
        // })
        console.log(typeof (jsonStr));
        console.log(msgList);
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: app.globalData.userInfo.openid,
      chatId: options.chatId,
      toName: options.openidList,
    })
    console.log(options);//有openid有头像路径
    console.log(this.data.username);
    this.Conection(); //建立websocket连接
    // console.log("拿出来了", chatArray);
    /**
     * 加载头像cusHeadIcon
     */
    this.setData({
      cusHeadIco: app.globalData.userInfo.avatarUrl,
    });
    console.log("头像url：", this.data.cusHeadIco);
    this.initData();
  },

  //Connect Websocket之后的操作
  initEvenHandle() {
    let that = this;

    // //接收信息
    wx.onSocketMessage(function (res) {
      // let objData = JSON.parse(data.data);
      // 收到消息
      if (res.data == 'Hi') {
        heartCheck.reset().start()//下一次心跳
      } else {
        //处理数据
        console.log("展示：", res);
        msgList.push({
          speaker: '',
          contentType: '',
          content: '',
          leftIcon: '',
        })
      }

      //这里是拿到那个要展示要用的每个openid对应的data，这里的data其实是些列表信息，不是信息具体
      //   for (let i = 0; i < objData.length; i++) {
      //     chatArray[i] = {
      //       chatId: objData[i].chatId,
      //       chatName: objData[i].chatName,
      //       groupChat: objData[i].groupChat,
      //       isShow: objData[i].isShow,
      //       noReadMessage: objData[i].noReadMessage,
      //       openidList: objData[i].openidList,//发给什么对象
      //       leftIcon: "",//左边的头像
      //     }
      //   }

      //   // 创建remove函数，利用数组内置的indexof函数，将指定元素remove掉
      //   let Mopenid = that.data.username;
      //   Array.prototype.remove = function (val) {
      //     let index = this.indexOf(val);
      //     if (index > -1) {
      //       this.splice(index, 1);
      //     }
      //   }
      //   console.log((chatArray[1].openidList));
      //   (chatArray[1].openidList).remove(Mopenid);
      //   console.log("删掉自己openid后的openidList数组：", (chatArray[1].openidList));
      //   for (let i = 1; i < chatArray.length; i++) {
      //     that.setData({
      //       // toName: (chatArray[i].openidList).join('&'),   //设置发给什么人
      //       toName: "omfL-4vHXzZLzDu3iEKYkT5HFZhg",//测试！！！！
      //       chatId: chatArray[i].chatId//设置发给的人
      //       // 后改，如今先行测试！！
      //       // 这里应该是toName是个数组，装多个转换了的字符串，然后再赋值给一个中间量toOpenid,一个个发出去
      //     })
      //   }
    })

    //打开websocket连接
    wx.onSocketOpen((result) => {
      console.log("webstock连接打开！");
      heartCheck.reset().start();//打开心跳连接
    })

    //连接失败
    wx.onSocketError((res) => {
      console.log('WebSocket fail失败!!' + res)
      this.reconnect();
    })
    //连接关闭
    wx.onSocketClose((res) => {
      console.log('WebSocket close关闭!!' + res)
      this.reconnect();
    })

  },

  Conection: function () {
    let that = this;
    if (this.data.username != "undefine") {
      //建立连接
      wx.connectSocket({
        url: "ws://zzxdream.cn1.utools.club/chat/" + this.data.username,//username是该用户的openid
        success: function () {
          console.log('连接成功');
          that.initEvenHandle();
        }
      })
    }
  },

  //断线重连
  reconnect: function () {
    let that = this;
    if (this.lockReconnect) return;//“关闭重连” 是真的就不用重连啦，return
    this.lockReconnect = true; //true->(out); false->(in)->true->Connect->false(in)->TWO round 第二轮 ->true -> 循环，让其用活在监测中（15次之内）
    //上面两步为了防止无线重连
    clearTimeout(this.timer);
    if (this.data.limit < 15) {
      this.timer = setTimeout(() => {
        this.Conection();//连接
        this.lockReconnect = false;//“关闭重连” = false，
      }, 5000);
      //每5秒试一次，最多请求15次  
      this.setData({
        limit: this.data.limit + 1
      })


    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },


  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  },
  //弹窗的按钮函数
  buttontap(e) {
    let that = this;
    console.log(e);
    let btnIndex = e.detail.index; //传过的按钮的index，判断是否有选择微信授权
    console.log(btnIndex);
    if (btnIndex == 0) {
      wx.navigateTo({
        url: '../welcome/welcome',
        success: function success(res) {
          console.log("不同意无法使用聊天");
        },
        fail: function fail(e) {
          console.log("初始页面加载失败" + e);
        },
        complete: function complete() {
          console.log("successful!");
        }
      });
    } else if (btnIndex == 1) {
      that.setData({
        dialogShow: false
      })
    }

  },
  dialogClose(e) {
    console.log(e);
    wx.navigateTo({
      url: '../welcome/welcome',
      success: function success(res) {
        console.log("不同意无法使用聊天");
      },
      fail: function fail(e) {
        console.log("初始页面加载失败" + e);
      },
      complete: function complete() {
        console.log("successful!");
      }
    });
  }

})