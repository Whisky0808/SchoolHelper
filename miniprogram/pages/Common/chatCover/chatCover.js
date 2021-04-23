const utils = require("../../../common/util.js");
const app = getApp();
let chatArray = [];
// 获取当下时间
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.userInfo.openid,
    // chatId: '',
    time: '',
    chatDetail: '',
    // chatId:才是每个对话的基本标识点，数组顺序不能作为标识点因为会根据时间来排顺序 
    //chatId：0开头！！！切记
    dlgContent: [{
      signal: 'new',
      dlgTitle: 'i am the first session',
      dlgTime: '2021.04.10',
      cusHeadIco: "",
      chatId: 0,
      NumId: '',
      isShow: '',
      toName: '',
      groupChat: '',
    },
    {
      signal: 'old',
      dlgTitle: 'i am the second session',
      dlgTime: '2021.03.09',
      cusHeadIco: "",
      chatId: 1,
      NumId: '',
      isShow: '',
      toName: '',
      groupChat: '',
    },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      openid: app.globalData.userInfo.openid,
    })

    let childComChange = this.selectComponent('.tab');
    let x = "curimgurl[" + 2 + "]";
    let y = "flag[" + 2 + "]"
    childComChange.setData({
      [x]: childComChange.data.imgurl[2].hovor,
      [y]: 1
    })
    this.LoadData();
    this.Conection();//先连接再打开连接,一定在initData上面
    console.log("拿出来了", chatArray);
    this.initData();
  },

  initData() {
    //多个对话列加载传过来的头像（一般对话不同，人不同，头像也不同)
    for (let i = 0; i < chatArray.length; i++) {
      (this.data.dlgContent).push({
        cusHeadIco: chatArray[i].leftIcon,
        chatId: chatArray[i].chatId,
        dlgTitle: chatArray[i].chatName,
        isShow: chatArray[i].isShow,
        toName: chatArray[i].toName,
        groupChat: chatArray[i].groupChat,
      })
      // let dlgIcon = "dlgContent[" + i + "].cusHeadIco";
      // let chatId = "dlgContent[" + i + "].chatId";
      // let dlgTitle = "dlgContent[" + i + "].dlgTitle";
      // let isShow = "dlgContent[" + i + "].isShow";
      // let toName = "dlgContent[" + i + "].toName";
      // let groupChat = "dlgContent[" + i + "].groupChat";
      //   this.setData({
      //     [dlgIcon]: chatArray[i].leftIcon,
      //     [chatId] : chatArray[i].chatId,
      //     [dlgTitle] : chatArray[i].chatName,
      //     [isShow] : chatArray[i].isShow,
      //     [toName] : chatArray[i].toName, 
      //     [groupChat] : chatArray[i].groupChat, 

      //   })
    }
    console.log(this.data.dlgContent[0].cusHeadIco);
  },

  Conection: function () {
    let that = this;
    //建立连接
    // wx.connectSocket({
    //   url: "ws://zzxdream.cn1.utools.club/chat/" + this.data.username,//username是该用户的openid
    //   success: function () {
    //     console.log('连接成功');
    //     that.initEvenHandle();
    //   }
    // })

  },
  //Connect Websocket之后的操作
  // initEvenHandle() {
  //   let that = this;

  //   //打开websocket连接
  //   wx.onSocketOpen((result) => {
  //     console.log("webstock连接打开！");
  //   })

  //   //接收信息
  //   wx.onSocketMessage(function (data) {
  //     let objData = JSON.parse(data.data);
  //     console.log("展示：", data); //这里是拿到那个要展示要用的每个openid对应的data，这里的data其实是些列表信息，不是信息具体
  //     for (let i = 0; i < objData.length; i++) {
  //       chatArray.push({
  //         chatId: objData[i].chatId,
  //         chatName: objData[i].chatName,
  //         groupChat: objData[i].groupChat,
  //         isShow: objData[i].isShow,
  //         noReadMessage: objData[i].noReadMessage,
  //         openidList: objData[i].openidList,//发给什么对象
  //         leftIcon: "",//左边的头像
  //       })
  //       // 创建remove函数，利用数组内置的indexof函数，将指定元素remove掉
  //       let Mopenid = that.data.username;
  //       Array.prototype.remove = function (val) {
  //         let index = this.indexOf(val);
  //         if (index > -1) {
  //           this.splice(index, 1);
  //         }
  //       }
  //       console.log((chatArray[i].openidList));
  //       (chatArray[i].openidList).remove(Mopenid);
  //       console.log("删掉自己openid后的openidList数组：", (chatArray[i].openidList));
  //       chatArray[i].openidList = "omfL-4vHXzZLzDu3iEKYkT5HFZhg";//测试！！！！
  //     }
  //     that.setData({
  //       chatArray: chatArray
  //     })

  //   })

  //   //连接失败
  //   wx.onSocketError((res) => {
  //     console.log('WebSocket fail失败!!' + res)
  //     // this.reconnect();
  //   })
  //   //连接关闭
  //   wx.onSocketClose((res) => {
  //     console.log('WebSocket close关闭!!' + res)
  //     // this.reconnect();
  //   })

  // },
  // 加载过来的数据LoadData

  LoadData: function () {

    let that = this;
    let date = new Date();
    let time = utils.formatTime(date);
    that.setData({
      time: time
    })

    console.log("real-time:", time);

    //需要改善！！！！有新的才push进去。
    wx.getStorage({
      key: 'chatDetails',
      success: function (res) {
        if (res.data.length != 0) {
          for (let i = 0; i < res.data.length; i++) {
            // 拿到缓存加载进去
            that.data.dlgContent.push({
              signal: 'new',
              dlgTitle: 'i am the first session',
              dlgTime: '2021.04.10',
              cusHeadIco: "",
              chatId: res.data[i].chatId,
              NumId: '',
            })
          }
          console.log("get 缓存！！", that.data.dlgContent);
        }
      },
      // 第一次会报错，因为第一次没有缓存
      fail: function () {
        console.log("Error，获取缓存数据失败");
      }
    })
    /**
     * 对 “对话列表” 进行时间排序的展示
     */
    let arr = [];
    arr = this.data.dlgContent;
    console.log("对话列表");
    arr.sort(function (a, b) {
      return a['dlgTime'] > b['dlgTime'] ? 1 : -1;
    })
    console.log("arr:", arr);
    this.setData({
      dlgContent: arr
    })
  },


  toSec: function (e) {
    console.log(e);
    let i = e.currentTarget.dataset.chatid
    console.log(i);
    console.log(this.data.dlgContent[i].cusHeadIco)
    wx.navigateTo({
      url: '../chat/chat?avartarUrl=' + this.data.dlgContent[i].cusHeadIco + "&chatId=" + this.data.dlgContent[i].chatId + "&openidList=" + "omfL-4vXwLBasPNGQlGvRGGIFd8Q"
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