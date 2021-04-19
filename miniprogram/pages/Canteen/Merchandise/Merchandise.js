let heightArr = [0];
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    food:[],
    // 所有食物被选数量信息
    allFood:[],
    carteenId:null,
    carteenName:null,
    // 右侧对应id
    rightId:"right0",
    // 左侧当前项
    leftNum:0,
    // 弹窗显示
    hidepopup:true,
    hidelistpopup:true,
    // 传给弹窗当前食物数量
    num:0,
    // 传给弹窗组件的食物名称
    foodname:null,
    // 传给弹窗当前索引
    curindex:0,
    // 当前已选事物总价
    curprice:0,
    // 筛选出已选的事物传给结算页面
    selectedFood:[],
    schoolId: 0,

    // 轮播图
    scrollImg: []
  },

  handleChange(e){
    let sel = this.data.selectedFood;
    let allf = this.data.allFood;
    let priceadd = this.data.curprice;
    if(e.detail.length === 0){
      allf.forEach(function (value, index) {
        value.foodnum = 0;
      })
      this.setData({
        allFood: allf,
        selectedFood: [],
        curprice: 0
      })
    } else{
      for(let i = 0,j = 0;j < sel.length;i++){
        if(allf[i] != null){
          if(allf[i].foodid === sel[j].foodid){
            priceadd = priceadd + (sel[j].foodnum - allf[i].foodnum)*sel[j].foodprice;
            allf[i].foodnum = sel[j].foodnum;
            j++;
          }
        }
      }
      this.setData({
        allFood: allf,
        selectedFood: [],
        curprice: priceadd
      })
    }
  },

  // 筛选出已选的事物传给结算页面
  filterSelected() {
    let that = this;
    let food = this.data.food;
    food.forEach(function (value, index) {
      value.foodList.forEach(function (v,i) {
        if(that.data.allFood[v.foodId].foodnum > 0){
          that.data.selectedFood.push({
            foodid: v.foodId,
            foodname: v.foodName,
            foodnum: that.data.allFood[v.foodId].foodnum,
            foodprice: v.price,
            foodimg: v.imgPath
          })
        }
      })
    })
    console.log(this.data.selectedFood);
  },

  // 跳转到结算页面
  goToCount:function() {
    var that = this;
    // var allFoodData = JSON.stringify(that.data.selectedFood);
    console.log("跳转");
    this.filterSelected();
    wx.navigateTo({
      url: '../orderDetails/orderDetails?allFood='
          + JSON.stringify(that.data.selectedFood)
          + '&curprice=' + that.data.curprice
          + '&carteenName=' + that.data.carteenName
          + '&carteenId=' + that.data.carteenId
          + '&func=null'
    })
    this.setData({
      selectedFood: []
    })
  },

  // 更新所有食物的信息到allFood中
  getAllFood() {
    let that = this;
    let food = that.data.food;
    food.forEach(function (value, index) {
      value.foodList.forEach(function (v,i) {
        var ts = "allFood["+v.foodId+"]"
        that.setData({
          [ts]:{
              foodid:v.foodId,
              foodname:v.foodName,
              foodnum:0,
              foodprice:v.price,
              foodimg:v.imgPath
            }
        })
      })
    })

    console.log("所有食物");
    console.log(this.data.allFood);
  },

  // 找到食物对应的索引
  findFoodIndex(e){
    let that = this;
    let allfood = that.data.allFood;
    let ind;
    allfood.forEach(function (value,index) {
      if(value.foodid === e){
        console.log("index是：");
        console.log(index);
        ind = index;
      }
    })
  },

  // 点菜数量显示
  handleItemChange(e){
    console.log("lalal")
    console.log(e);
    var alf = "allFood["+e.detail.curindex+"].foodnum";
    var allprice = this.data.curprice + this.data.allFood[e.detail.curindex].foodprice * (e.detail.curnum - this.data.allFood[e.detail.curindex].foodnum);
    this.setData({
      // num:e.detail.curnum
      [alf]:e.detail.curnum,
      num:0,
      curprice:allprice
    })
  },

  // 弹窗是否显示的函数
  onShowPopup(e){
    console.log("onshow=");
    console.log(e);
    this.findFoodIndex(e.currentTarget.dataset.foodid);
    this.setData({
      hidepopup:false,
      foodname:e.currentTarget.dataset.foodname,
      num:e.currentTarget.dataset.foodnum,
      curindex:e.currentTarget.dataset.foodid
    })
  },
  bindfoodlist(e){
    let that = this;
    this.filterSelected();
    console.log("点了之后的select:");
    console.log(this.data.selectedFood);
    let seleced = this.selectComponent('.pocket');
    seleced.setData({
      selectFood:that.data.selectedFood
    })
    that.setData({
      hidelistpopup:false
    })
  },

  // 右侧滚动事件
  rightScroll(e){
    let st = e.detail.scrollTop;
    for(let i = 0;i < heightArr.length;i++)
    {
      if(st>=heightArr[i] && st < heightArr[i+1]-5)
      {
        this.setData({
          leftNum:i
        })
        break;
      }
    }
  },
  // 左侧点击事件
  leftClickFn(e){
    // console.log("点击事件")
    // console.log(e.currentTarget.dataset.myindex);
    this.setData({
      leftNum:e.currentTarget.dataset.myindex,
      rightId:"right"+e.currentTarget.dataset.myindex

    })
    // console.log(this.data.leftNum);
    // console.log(this.data.rightId);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("11饭堂id为："+options.carteenid);
    var that = this;
    that.setData({
      carteenId:options.carteenid,
      carteenName:options.carteenname,
      schoolId: app.globalData.userInfo.schoolId
    })
    // console.log("饭堂id为："+this.data.carteenId);
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://zzxdream.cn1.utools.club/sort/findSortAndFood/' + that.data.carteenId,
      // url: 'https://carteen.cn1.utools.club/sort/findSortAndFood/' + tha,
      success (res) {
        wx.hideLoading();
        console.log(res.data);
        that.setData({
          food:res.data.data.sortList,
          scrollImg: res.data.data.carteenCarouselPhotoList
        })
        console.log("以下是food");
        console.log(that.data.food);

        // setTimeout(()=>{
          that.getAllFood();
          console.log("allFood=");
          console.log(that.data.allFood);
          that.setData({
            allFood:that.data.allFood
          })
        // },2000)

        const query = wx.createSelectorQuery()
        query.selectAll('.box').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function(res){
          console.log("以下是box的数据");
          console.log(res[0]);
          res[0].map(val=>{
            let result = val.height + heightArr[heightArr.length-1];
            heightArr.push(result);
          })
          console.log("以下是高度数组");
          console.log(heightArr);
        })
      }
    })

    // setTimeout(()=>{
    //   that.getAllFood();
    //   console.log("allFood=");
    //   console.log(that.data.allFood);
    //   that.setData({
    //     allFood:that.data.allFood
    //   })
    // },2000)
    // that.setData({
    //   aaa:that.data.allFood[2].foodid
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // setTimeout(()=>{
    //   const query = wx.createSelectorQuery()
    //   query.selectAll('.box').boundingClientRect()
    //   query.selectViewport().scrollOffset()
    //   query.exec(function(res){
    //     console.log("以下是box的数据");
    //     console.log(res[0]);
    //     res[0].map(val=>{
    //       let result = val.height + heightArr[heightArr.length-1];
    //       heightArr.push(result);
    //     })
    //     console.log("以下是高度数组");
    //     console.log(heightArr);
    //   })
    // },2000)
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