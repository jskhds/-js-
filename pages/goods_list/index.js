import {request} from "../../request/index.js";

Page({

  data: {
          tabs:[
            {
              id:0,
              value:"综合",
              isActive:true
            },
            {
              id:0,
              value:"销量",
              isActive:false
            },
            {
              id:0,
              value:"评价",
              isActive:false
            }
          
          ],
          goodsList:[]
  },
  // 接口要的参数 
  QueryParams:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
  },

  totalPage:1,


  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid=options.cid;
    this.QueryParams.query=options.query||"";
    this.getGoodList();
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
  // 获取商品列表的参数
  async getGoodList(){
      const res = await request({url:"/goods/search",data:this.QueryParams});
      // console.log(res);
      const total = res.data.message.total;
      // console.log(total);
      this.totalPage = Math.ceil(total/this.QueryParams.pagesize)
      // console.log(this.totalPage);
      // console.log(res);
      this.setData({
        //路径一定要一层一层精确
        // 数组拼接 （加载下一页请求） data中的goodsList 和 接口中新请求到的goods拼接
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
      // 关闭下拉刷新效果 没有调用下拉刷新窗口 直接关闭也不会报错
      wx.stopPullDownRefresh();
        
}, 
// 页面上滑 滚动条触底事件 onReachBottom() 默认函数
/*
  用户上滑页面 滚动条触底开始加载下一页数据
    1.找到滚动条触底事件 onReachBottom()
    2.判断还有没有下一页数据
      1.获取到总页数
        总条数/页容量 Math.ceil(总条数/页容量)
      2.获取到当前页码
      3.判断当前页码>=总页数？
    3.假如没有下一页 跳出提示
    4.假如还有下一页 加载数据
      1 当前的页码++
      2 重新发送请求
      3 数据请求 */
  onReachBottom(){
    // console.log("页面触底");
      if(this.QueryParams.pagenum>=this.tatolPage){   
    // console.log("没有下一页数据");
  wx.showToast({
    title: '没有下一页数据',
   
  });}

      else{
        // console.log("还有下一页数据");
        // 页码++
        this.QueryParams++;
        // 调用接口函数
        this.getGoodList();
      }

  },
  /*2.下拉刷新页面
        1.触发下拉刷新事件 在json中开启一个配置
            找到触发事件
        2.重置 数据 数组 
        3.重置页码 设置为 1 
        4.重新发送请求
        5.关闭下拉刷新效果
        */

  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.QueryParams.pagenum=1;
    // 发送请求
    this.getGoodList();
  },
  /*
  发送请求之前显示加载中图标 发送完成后关闭加载图标
  
  */ 

})
