// pages/user/index.js
// 0 引入用来发送请求的方法 注意路径一定要写全
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
        swiperList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({ url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    .then(result => {
      this.setData({
        swiperList:result.data.message
      })
    })

    })
  }
      

  
  

})
