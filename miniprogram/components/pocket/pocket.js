// components/pocket/pocket.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidelist:{
      type:Boolean,
      value:true,
    },
    num:{
      type:Number,
      value:0
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectFood:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 清空购物车
    clearfood(){
      this.setData({
        selectFood: []
      })
    },

    hidepopup(e){
      if(e.target.dataset.canclose){
        this.setData({
          hidelist:true
        })
        this.triggerEvent("Change",this.data.selectFood);
      }
    },
    numCut(e) {
      let num = this.data.selectFood[e.currentTarget.dataset.index].foodnum;
      if(num > 0){
        num--;
      }
      var x = "selectFood["+e.currentTarget.dataset.index+"].foodnum"
      this.setData({
        [x]: num
      })
    },
    numAdd(e) {
      let num = this.data.selectFood[e.currentTarget.dataset.index].foodnum;
      num++;
      var x = "selectFood["+e.currentTarget.dataset.index+"].foodnum"
      this.setData({
        [x]: num
      })
    },
  }
})
