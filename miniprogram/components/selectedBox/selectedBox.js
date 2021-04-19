// components/selectedBox/selectedBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curprice:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    submitOrder(){
      this.triggerEvent("itemChange",1)
    }
  }
})
