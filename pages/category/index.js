import {request} from "../../request/index.js";
Page({

data: {
// 左边菜单栏
leftMenuList:[],
// 菜单栏激活选项
currentIndex:0,
// 右边内容
rightContentList:[],
// 返回的数据(写在data 同层级下？)
scrollTop:0

},
Cates:[],
  
  onLoad: function (options) {
    /* 
    0 web中的本地存储和 小程序中的本地存储的区别
      1 写代码的方式不一样了 
        web: localStorage.setItem("key","value") localStorage.getItem("key")
    小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
      2:存的时候 有没有做类型转换
        web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
      小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
    1 先判断一下本地存储中有没有旧的数据
      {time:Date.now(),data:[...]}
    2 没有旧数据 直接发送新请求 
    3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
     */
    //  1 获取本地存储中的数据  (小程序中也是存在本地存储 技术)
    const Cates = wx.getStorageSync("cates");
    // 2 判断
    if (!Cates) {
      // 不存在  发送请求获取数据
      this.getCates();
    } else {
      // 有旧的数据 定义过期时间  10s 改成 5分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name); // leftMenuList 是一个数组 要是直接赋值成 this.Cates.cat_name 肯定是错的
        let rightContentList = this.Cates[0].children; //层级结构 家用电器里的电视、空调等 级
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
   
  },

  async getCates(){
    // request({url:"/categories"})
    // .then(res=>{
    // //  先给参数赋值
    // this.Cates = res.data.message;
    //   // 把接口的数据存入本地
    // wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    // let leftMenuList = this.Cates.map(v=>v.cat_name); // leftMenuList 是一个数组 要是直接赋值成 this.Cates.cat_name 肯定是错的
    // let rightContentList = this.Cates[0].children; //层级结构 家用电器里的电视、空调等 级
    // // 赋值以后 用this.setData 把数据丢到data中 （this.setData  适用于异步请求也就是向网络请求数据）
    // this.setData({
    //   leftMenuList,
    //   rightContentList
    // })
    // })
    // 1.使用async 和 await （es7） 其实是异步的但看起来像是同步的 72行不返回数据不会往下执行
    
    const res = await request({url:"/categories"});
    this.Cates = res.data.message;
      // 把接口的数据存入本地
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(v=>v.cat_name); // leftMenuList 是一个数组 要是直接赋值成 this.Cates.cat_name 肯定是错的
    let rightContentList = this.Cates[0].children; //层级结构 家用电器里的电视、空调等 级
    // 赋值以后 用this.setData 把数据丢到data中 （this.setData  适用于异步请求也就是向网络请求数据）
    this.setData({
      leftMenuList,
      rightContentList
    })
  },
  // 左侧菜单点击事件
  // e代表事件源 也就是我们点击的那个item
  handleItemChange(e){
    /*
    1.获取被点击标题的索引
    2.把这个索引赋值给我们函数里面的索引 记得这是单独的函数 所以要加const 
    3.传入不同的索引给*/
    
    // es6 解构赋值 找到dataset里面index（同名属性）赋值给它
    const {index} = e.currentTarget.dataset;
    let rightContentList = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContentList,
      scrollTop:0
    })
  }
  

})