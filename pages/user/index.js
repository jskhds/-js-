// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // data 里面的值 key_name：key_type 不能只写一个key_name
    userInfo:{},
    // 被收藏的商品数量
    collectNum:0

  },
  onShow(){
  const userInfo=  wx.getStorageSync("userInfo");
  const collect = wx.getStorageSync("collect")||[];
    
    this.setData({
      userInfo,
      collectNum:collect.length
    })
      
  }
})