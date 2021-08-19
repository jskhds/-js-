import {  chooseAddress, requestPayment, showModal,showToast} from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
/*
1 点击“+” 触发点击事件
  1 调用小程序内置的 选择图片 api
  2 获取到图片的路径数组
  3 把图片路径 存到 data变量中
  4 页面就可以根据 图片数组进行循环显示 自定义组件
2 点击x号删除元素
  1 获取被点击元素索引
  2 获取data中的图片数组

*/
Page({
data:{
  tabs:[
    {
      id:0,
      value:"体验问题",
      isActive:true
    },
    {
      id:1,
      value:"商品、商家投诉",
      isActive:false
    }
  

  
  ],
// 被选中的图片路径数组
chooseImg:[]
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
// 点击加号 获取图片
handleChooseImg(){
  
 wx.chooseImage({
  //  数量
   count: 9,
  //  格式 原图 压缩
   sizeType: ['original', 'compressed'],
  //  来源 相册 相机
   sourceType: ['album', 'camera'],
   success: (result) => {
    //  把图片数据进行拼接
     this.setData({
      chooseImg:[...this.data.chooseImg,...result.tempFilePaths]
     })
   },
  
 });
   
},
handleImgRemove(e){
 const {index} = e.currentTarget.dataset;
 let chooseImg = this.data.chooseImg;
 chooseImg.splice(index,1);
 this.setData({
  chooseImg
 })
}
  
})