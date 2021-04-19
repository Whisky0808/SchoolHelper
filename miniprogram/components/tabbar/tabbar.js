// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgurl: [
      {
        common: "../../static/icon/placeOrder.png",
        hovor: "../../static/icon/placeOrder_hovor.png"
      },
      {
        common: "../../static/icon/grabOrder.png",
        hovor: "../../static/icon/grabOrder_hovor.png"
      },
      {
        common: "../../static/icon/chatImg.png",
        hovor: "../../static/icon/chatImg_hovor.png"
      },
      {
        common: "../../static/icon/orderImg.png",
        hovor: "../../static/icon/orderImg_hovor.png"
      },
    ],
    curimgurl: [
      "../../static/icon/placeOrder.png",
      "../../static/icon/grabOrder.png",
      "../../static/icon/chatImg.png",
      "../../static/icon/orderImg.png"
    ],
    flag: [0,0,0,0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      let that = this;
      that.data.curimgurl.forEach(function (v,i) {
        v = that.data.imgurl[i].common
      })
      that.data.flag.forEach(function (v,i) {
        v = 0
      })
    },
    to1(){
      let that = this;
      that.init();
      let x = "curimgurl[" + 0 + "]";
      let y = "flag[" + 0 + "]"
      this.setData({
        [x]: that.data.imgurl[0].hovor,
        [y]: 1
      })
      wx.redirectTo({
        url: '/pages/Runner/add_demand_order/add_demand_order'
      })
    },
    to2(){
      let that = this;
      that.init();
      let x = "curimgurl[" + 1 + "]";
      let y = "flag[" + 1 + "]"
      this.setData({
        [x]: that.data.imgurl[1].hovor,
        [y]: 1
      })
      wx.redirectTo({
        url: '/pages/Runner/grab/grab'
      })
    },
    to3(){
      let that = this;
      that.init();
      let x = "curimgurl[" + 2 + "]";
      let y = "flag[" + 2 + "]"
      this.setData({
        [x]: that.data.imgurl[2].hovor,
        [y]: 1
      })
      wx.redirectTo({
        url: '/pages/Common/chatCover/chatCover'
      })
    },
    to4(){
      let that = this;
      that.init();
      let x = "curimgurl[" + 3 + "]";
      let y = "flag[" + 3 + "]"
      this.setData({
        [x]: that.data.imgurl[3].hovor,
        [y]: 1
      })
      wx.redirectTo({
        url: '/pages/Runner/help_order/help_order'
      })
    },
  }
})
