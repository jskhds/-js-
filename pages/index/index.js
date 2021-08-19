// pages/user/index.js
// 0 引入用来发送请求的方法 注意路径一定要写全
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
        swiperList:[],
        cateList:[],
        floorList:[],
        // navigator_url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
this.getSwiperList(),
this. getCateList(),
this.getFloorList()
    },

    getSwiperList(){
      request({ url:"/home/swiperdata"})
      .then(result => {
        this.setData({
          swiperList:result.data.message
        })
      })
    },
    getCateList(){
      request({ url:"/home/catitems"})
      .then(result => {
        this.setData({
          cateList:result.data.message
        })
      })
    },
   getFloorList(){
    request({ url: '/home/floordata'})
    .then(result => {
      console.log(result);
      var data =JSON.stringify(result.data.message);
      var data1=data.replace(/goods_list/g, 'goods_list/index')
      var data2=JSON.parse(data1)
      this.setData({
        floorList:data2,
      })
    })
    
      
    }

    

  
  

})
