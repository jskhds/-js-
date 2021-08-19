/*
1 输入框绑定  值改变事件 input事件
  1 获取到输入框的值
  2 合法性判断 比如空字符串就不合法
  3 检验通过以后就可以把获取到的数据发送到后台
  4 返回的数据打印到页面上
2 防抖
  1 定义全局定时器 id

*/
import {  chooseAddress, requestPayment, showModal,showToast} from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
Page({

 
  data: {
    goods:[],
    // 取消按钮是否显示
    isFocus:false,
    inputValue:""
  },
  // 随便给一个值都行
  Timid:1,
  // 输入框的值改变就触发
  handleInput(e){
    // 1. 获取输入框的值
    const {value} = e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false,
        inputValue:"",
      })
      // 值不合法
      return;
    }
    this.setData({
      isFocus:true
    })
    // 防抖功能 停止输入 1s 后 再发送请求
    /*
    过程如下：比如说我们搜索 huawei 在输入h时 我们触发输入函数 清除定时器 此时定时器没有值 然后给Timeid赋值
    输入u时 Timeid 有了上次的值 清除 又开始定时器 循环往复 直到输入i以后 停了1s 定时器执行完了间隔 才会执行
     this.qsearch(value);
    */
    clearTimeout(this.Timeid);
   
    this.Timeid=setTimeout(() => {
      this.qsearch(value);
    }, 1000);
    
  },
  handleCancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    })

  },
  // 发送请求获取搜索建议 数据
  async qsearch(query){
    let res = await request({url:"/goods/qsearch",data:{query}});
    res = res.data.message;
    this.setData({
      goods:res
    })
  }


 
})