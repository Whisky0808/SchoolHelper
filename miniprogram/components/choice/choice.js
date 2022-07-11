// components/choice/choice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hide:{
      type:Boolean,
      value:true
    },
    num:{
      type:Number,
      value:0
    },
    foodname:{
      type:String,
      value:null
    },
    curindex:{
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
    hidepopup(e){
      if(e.target.dataset.canclose){
        this.triggerEvent("itemChange",{curnum:this.data.num,curindex: this.data.curindex})
        this.setData({
          hide:true,
          num: 0
        })
      }
    },
    numCut() {
      let num = this.data.num;
      if(num > 0){
        num--;
      }
      this.setData({
        num
      })
    },
    numAdd() {
      let num = this.data.num;
      num++;
      this.setData({
        num
      })
    },
  }
})
