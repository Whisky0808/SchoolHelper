// components/coupon/coupon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hide:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    test:0,
    coupons:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidepopup(e){
      if(e.target.dataset.canclose){
        this.setData({
          hide:true
        })
      }
    },
    btnClick(e){
      this.setData({
        hide:true
      })
    }
  }
})
