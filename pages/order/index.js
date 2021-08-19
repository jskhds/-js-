/* 
  1 页面被打开 onShow（经常查询）
     1 获取url上的参数type onShow 不能接收 type 只有onLoad可以
       判断缓存中有没有token 有的话往下走 没有的话要跳转到授权
     2 根据type去发送请求获取订单数据
     3 渲染页面
  2 点击不同的标题 重新发送请求
  
*/
import {  chooseAddress, requestPayment, showModal,showToast} from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:0,
        value:"待付款",
        isActive:false
      },
      {
        id:0,
        value:"代发货",
        isActive:false
      },

     {
        id:0,
        value:"退款退货",
        isActive:false
      }
    ],

  },
//   onLoad(options){
// console.log(options);
//   },
  onShow(options){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
        
      });
      return;
    }
      
    // 1 获取当前小程序的页面栈-数组 长度最大是10页面 第20个页面只能返回到第10个 前面的页面已经被释放了
    // 2 数组中索引最大的页面就是当前页面 里面有我们要的type参数
    let pages =  getCurrentPages();
    let currentPages =  pages[pages.length-1];
    // console.log(currentPages.options );
    // 3 获取url上的type参数
    const {type}=currentPages.options
    // console.log(type);
    this.getOrders(type);
  },
  // 获取订单列表
 async getOrders(type){
      const res = await({url:"/my/orders/all",data:{type}});
      console.log(res);
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
  
  },
  

  
})