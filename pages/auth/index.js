import { request } from "../../request/index.js";
import { login} from "../../utils/asyncWx.js";


Page({

  async handleGetUserInfo(e){
 try{
 // 1 获取用户信息 这些参数不记得的话 看微信文档就行
 const {encryptedData,reaData,iv,signature} = e.detail;
 // 2 获取小程序登录成功后的值
 const {code} = await login();
 // 3 发送请求 获取用户的token值
 const loginParams = {
   encryptedData,reaData,iv,signature,code
 }
 const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
 // 4 把token 存入缓存中 同时跳转回上一个页面
     wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    const token=wx.getStorageSync("token")
   
 wx.navigateBack({
   delta: 1
 });
   
 }
 catch(error){
 console.log(error);
 }
}

    
    
  
})