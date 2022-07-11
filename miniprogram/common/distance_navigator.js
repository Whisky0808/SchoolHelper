"use strict";
import QQMapWX from './qqmap-wx-jssdk';
let qqmapsdk;
Page({

    data: {
      name: "",
      latitude: "", //纬度
      longitude: "",
    },

    //加载函数，加载函数中代码的作用如下：
    //获取两个地点的距离，需要用到QQmAPWX对象，上面已经加载了他的js文件，这里实例化他，其他函数就都能使用
    onLoad: function (options) {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        key: 'S32BZ-UDJCI-SLUGR-5KGRX-PMQJT-45B4X'
      });
  0
    },

     //获取两点直接的导航图
    getRoad: function(positionName, latitude, longitude){
        //这个是我申请的腾讯地图秘钥
        const key = "S32BZ-UDJCI-SLUGR-5KGRX-PMQJT-45B4X"; 
        //调用插件的app的名称（必填），这里随便写个名字就好
        const referer = "腾讯地图"; 
    
        //这个是我们要到达的目的地，name是地点名字，只是展示而已，真正的查询参数的下面那两个经纬度
        let endPoint = JSON.stringify({  
          'name': positionName,
          'latitude': latitude,
          'longitude': longitude,
        });
    
        //这里调用腾讯地图的map组件，进去后就是访问腾讯地图的导航页面，把密钥key，应用名称，目的地作为参数携带过去
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        });
      },
      
    
    //获取两地的距离，有驾车，步行，和直线三种
    //校园大家都熟悉，我们一般就是用步行的路线
    getDistance: function(lat, lng){
        qqmapsdk.calculateDistance({
          mode:'walking',//可选值：'driving'（驾车）、'walking'（步行 默认），'straight'（直线）
          
          //这里的from是我们出发点的经纬度信息，但是不写的话默认就是我们当前的经纬度，所以直接不写哈
          // from: {
          //   latitude: la,
          //   longitude: lo
          // },
           to:[{   //to[]   这里可以写多个目的地，所以是一个集合，对应的距离有多个，也是个集合
            latitude: lat,
            longitude: lng
          }],
          success: function (res) {
            //距离
            var distance = res.result.elements[0].distance;
            console.log("两点不换算的距离为 = ", distance);
            //保留一位小数，换算成km
            var a = parseFloat(distance / 1000).toFixed(1);
            var finalDistance = a + "km";
    
            console.log("距离为 = ", finalDistance);
          },
          fail: function(res){
            console.log(res);
          }
        })
      },

})

module.exports.getDistance = getDistance;