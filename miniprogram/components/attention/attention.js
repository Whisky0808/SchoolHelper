// components/attention/attention.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hide:{
      type:Boolean,
      value:true
    },
    attentionMeg:{
      type:String,
      value:null
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
    hidepopup(e){
      if(e.target.dataset.canclose){
        this.setData({
          hide:true
        })
      }
    },
  }
})
