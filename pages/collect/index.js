// pages/collect/index.js
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"商品收藏",
        isActive:true
      },
      {
        id:1,
        value:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        value:"店铺收藏",
        isActive:false
      },
      {
        id:2,
        value:"我的足迹",
        isActive:false
      },

    
    ],
    collect:[]

  },

  onShow() {
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      collect
    })
      
  },
  tabsItemChange(e){
    // console.log(e);
    // 1.获取index

   const {index} = e.detail;
  //  2.修改tabs的属性
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3.赋值到data中
    this.setData({
      tabs
    })
  
  }
})