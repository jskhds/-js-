import {  chooseAddress, showModal,showToast} from "../../utils/asyncWx.js";



/*
1.获取用户的收货地址
  1.绑定点击事件
  2.调用小程序内置 api 获取用户的收货地址
2.页面加载完毕
  0 onLoad onShow（这个比较好 每次打开都重新初始化好）
  1 获取本地存储中的数据
  2 把数据 设置给data中的一个变量
 */
Page({

  
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0,
    checked:true
  },
 
/*
1 获取收货地址
2 添加购物车数据
3 全选功能 数据的展示
4 总价格和总数量
  1.都需要商品被选中
  2.获取购物车数组
  3.遍历
  4.判断商品是否被选中
  5.总价格 += 商品的单价 * 商品的数量
  6 把计算后的价格和数量 设置回data
5 商品的选中功能
  1.绑定change 事件
  2. 获取到被修改的商品对象
  3.商品对象的选中取反
  4.重新填充回data和缓存中
  5，重新计算全选和总价格
6 全选和反选功能
  1. 全选复选框绑定事件 change
  2. 获取 data中的全选变量 allChecked
  3. 直接取反 allChecked =! allChecked
  4. 遍历购物车数组 让里面的购物车商品 选中状态都跟随着 allChecked 改变
  5. 把购物车数组 和 allChecked 重新设置回data中 把购物车重新设置回缓存中
7 商品数量的编辑功能 
  1.给 + 和 - 绑定同一个点击事件 区分的关键 在于自定义属性 
      1. + 对应 +1
      2. - 对应 -1 
  2.传递被点击的商品id
  3 获取data中的购物车数组 获取被修改的商品对象
  4 直接修改num
  5 把cart重新设置回缓存和data中
8 点击结算
  1 判断有没有收获信息
  2 判断用户有没有选购商品
  3 经过以上验证 跳转到支付页面

  */
  onShow(){
    const address = wx.getStorageSync("address");
    this.setData({ 
      address
    })
    // console.log(address);
    const cart = wx.getStorageSync("cart")||[];
    this.setCart(cart);
   
  },

  // async 和 await 是一套的
 async handleChooseAddress(){  
    let address = await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
    // console.log(address);
    wx.setStorageSync("address",address);
   
     
  },
  // 商品选中反选
  handleItemChange(e){
    // 1 获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let {cart}=this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id.id);
    console.log(index);
    cart[index].checked=!cart[index].checked;
    // 5 6 把购物车数组重新设置回data和缓存中
    this.setCart(cart);
    
  },  
  setCart(cart){
    let allChecked = true;
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.data.message.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    // 判断 数组是否为空
    allChecked = cart.length!=0?allChecked:0; 
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart);
  },

 /*全选和反选功能
  1. 全选复选框绑定事件 change
  2. 获取 data中的全选变量 allChecked
  3. 直接取反 allChecked =! allChecked
  4. 遍历购物车数组 让里面的购物车商品 选中状态都跟随着 allChecked 改变
  5. 把购物车数组 和 allChecked 重新设置回data中 把购物车重新设置回缓存中
   */

  handleItemAllCheck(){
    let {cart,allChecked}=this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);

  },

  // 设置购物车状态 重新计算底部工具栏的数据 全选 总价格 数量等
  /*
  1.给 + 和 - 绑定同一个点击事件 区分的关键 在于自定义属性 
      1. + 对应 +1
      2. - 对应 -1 
  2.传递被点击的商品id
  3 获取data中的购物车数组 获取被修改的商品对象
  3.2当购物车数量等于 1 之后 需要弹窗提示(wx-showModal)是否要删除 点击确定直接执行删除 点击取消 什么都不做
  4 直接修改num
  5 把cart重新设置回缓存和data中 */
  async handleItemNumEdit(e){

    const {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    let index = cart.findIndex(v=>v.data.message.goods_id===id);   
    // 这里判断num
    if(cart[index].num===1&&operation===-1){
      // 弹窗提示粘贴
      // 先引入这个函数
      const res = await showModal({content:'您是否要删除该商品？'})
      // 在这里判断 之后执行数组删除
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }       
    }
    else{
      cart[index].num += operation;    
      this.setCart(cart);
    }
   
   
   
  },
  // 1 判断收获地址
  async handlePay(){
    const {address,totalNum} = this.data;
    if(!address.userName){
     await showToast({title:"您还未选择收获地址"});
     return;
    }
     
     if(totalNum===0){
      await showToast({title:"您还未选择商品"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
  
})