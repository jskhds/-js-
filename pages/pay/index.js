/*
1 页面加载的时候 
  1 从缓存中获取购物车数据 渲染到页面中 这些数据 checked = true
2 微信支付
  1 哪些人 哪些账号 可以实现微信支付
    1 企业账号
    2 必须给开发者绑定添加上白名单
      1 一个appid可以 同时绑定多个开卡者
      2 这些开发者可以共用这个 appid 和 它的开发权限
3 支付
    1.点击支付按钮后 先判断缓存中有没有token 
    2.没有 跳转到授权 获取token
    3.有token 正常执行逻辑
      1 创建订单  
    */


import {  chooseAddress, requestPayment, showModal,showToast} from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";

Page({

  
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0,
    checked:true
  },
 
  onShow(){
    const address = wx.getStorageSync("address");
    
    // console.log(address);
    let cart = wx.getStorageSync("cart")||[];
    // 过滤数组 只保留 购物车中选中的商品到支付页面
    cart = cart.filter(v=>v.checked)
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{      
      totalPrice += v.num * v.data.message.goods_price;
      totalNum += v.num;})
    this.setData({ 
      address,
      cart,
      totalPrice,totalNum
    })
   
  },
//  点击支付
 async   handleOrderPay(){
     try {
        // 1.先判断 缓存中是否有token 
      const token = wx.getStorageSync("token");
      // 2.判断
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
          
        });
        return;
      }
    //  3创建订单
    // 3.1 准备请求头参数
    
    header["content-type"]= "application/x-www-form-urlencoded";
    // 3.2 
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods=[]; //订单数组
    // 遍历cart数组 把goods需要的属性 push 进去
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_num:v.num,
      goods_price:v.goods_price
    }))
    // 4 准备发送请求 创建订单 获取订单编号
    const orderParams = {order_price,consignee_addr,goods};
    let res= await request({url:"/my/orders/create",method:"post",data:orderParams})
    console.log(res);
    const order_number = res.data.message.order_number; 
   /* 5 发起预支付
    const {pay} =  await request({url:"/my/orders/req_unifiedorder",method:"POST",data:order_number})
    console.log(res1);
    6 发起微信支付
    const res = await  requestPayment(pay);
    7 查询后台 订单状态
    const res = await request({url:"/my/orders/chkOrder",method:"POST",data:order_number})
    await showToast({title:"支付成功"})
    8 手动删除缓存中已经支付了的商品
    let newCart = wx.getStorageSync("cart");
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync("cart",newCart);
    9 跳转到订单页面 
    wx-navigateTo({
    url:'/pages/order/index'
    })*/
    
     } catch (error) {
       console.log(err);
     }
    },


 

 




  
})