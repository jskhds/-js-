handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(item => {
      return item.goods_id === this.goodsInfo.goods_id
    })
    if (index === -1) {
      // 不存在
      this.goodsInfo.num = 1
      cart.push(this.goodsInfo)
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        mask: true
      })
    } else {
      // 存在
      cart[index].num++;
      wx.showToast({
        title: '商品数量+1',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync("cart", cart);
  }