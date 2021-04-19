// components/moreadress/moreadress.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hide:{
      type:Boolean,
      value:true
    },
    userAdress:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    curindex:0,
    modifyindex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 新增地址
    addAdress(){
      this.triggerEvent("itemChange",'add')
    },
    // 修改地址
    modifyAddress(e){
      this.setData({
        modifyindex:e.target.dataset.modifyindex
      })
      this.triggerEvent("itemChange",'modify')
    },
    hidepopup(e){
      if(e.target.dataset.canclose){
        this.setData({
          hide:true
        })
      }
    },
    Jump(e){
      this.setData({
        curindex:e.currentTarget.dataset.index,
        hide:true
      })
      this.triggerEvent("itemChange",this.data.curindex);
    }
  }
})
