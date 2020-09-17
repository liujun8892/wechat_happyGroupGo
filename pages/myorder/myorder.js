// pages/myorder/myorder.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      headIndex:1,
      payShow: false
  },
  headClick:function(e)
  {
    var headIndex = e.currentTarget.dataset.id;
    this.setData({
      headIndex:headIndex
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
    var uid = getApp().globalData.payInfo._id;
    wx.request({
      url: getApp().globalData.api + 'order/getOrderList?userId=' + uid,
      success:(res)=>{
        console.log(res);
        this.setData({
          groupOrder:res.data.group,
          movieOrder:res.data.movie
        })
      }
    })
  },

   // 微信支付
   pay(e) {
     console.log(this.data.movieOrder);
     console.log(e);
     this.setData({
      _id: e.currentTarget.dataset.goodsid,
      type: e.currentTarget.dataset.type,
      amount:  e.currentTarget.dataset.amount,
      countPrice: e.currentTarget.dataset.countprice,
      orderId: e.currentTarget.dataset.orderid
     })
    this.setData({
      payShow:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
   orderClick:function(e)
   {
      var id = e.currentTarget.dataset.id;
      var type = e.currentTarget.dataset.type;
      var goodsid = e.currentTarget.dataset.goods;
      wx.redirectTo({
        url:'../orderdetails/orderdetails?id=' + id + '&type=' + type + '&goodsid=' + goodsid
      })
   },

    // 关闭微信支付
  closeConponet(e){
    this.setData({
      payShow: e.detail
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})